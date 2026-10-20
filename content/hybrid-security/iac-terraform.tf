# iac-terraform.tf
# Hybrid Workforce control-plane infra (Azure + Azure AD) — hosts the agent
# telemetry ingestion (SIEM), the SOC webhook (serverless), and the Conditional
# Access integration contract. Apply to the central security subscription.
#
# Usage: terraform init && terraform plan -out=hybrid.tfplan && terraform apply hybrid.tfplan

terraform {
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.0" }
    azuread = { source = "hashicorp/azuread", version = "~> 2.30" }
  }
}

provider "azurerm" {
  features {}
}

provider "azuread" {}

locals {
  prefix = "hybridsec"
  region = "canadacentral"
}

# ---- Ingestion storage (SIEM cold tier + validator queue) ----
resource "azurerm_resource_group" "rg" {
  name     = "rg-${local.prefix}"
  location = local.region
}

resource "azurerm_storage_account" "siem" {
  name                     = "${local.prefix}siem"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  allow_blob_public_access = false
}

# Immutable retention for the "regulated / legal-hold" SIEM tier
resource "azurerm_storage_container" "device_events" {
  name                  = "device-events"
  storage_account_name  = azurerm_storage_account.siem.name
  container_access_type = "private"
}

resource "azurerm_storage_account_immutability_policy" "legal_hold" {
  storage_account_id = azurerm_storage_account.siem.id
  immutability_period_in_days = 1825
  state                         = "Locked"
  protected_append_writes_all   = true
}

# ---- SOC webhook receiver (validates agent JSON, triggers quarantine) ----
resource "azurerm_function_app" "soc_webhook" {
  name                       = "fn-${local.prefix}-soc"
  resource_group_name        = azurerm_resource_group.rg.name
  location                   = azurerm_resource_group.rg.location
  app_service_plan_id        = azurerm_app_service_plan.plan.id
  storage_account_name       = azurerm_storage_account.siem.name
  storage_account_access_key = azurerm_storage_account.siem.primary_access_key
  version                    = "~4"
  https_only                 = true
  app_settings = {
    "FUNCTIONS_WORKER_RUNTIME"          = "node"
    "SOC_WEBHOOK_SECRET"                = var.soc_webhook_secret
    "AZURE_AD_TENANT_ID"                = var.aad_tenant_id
    "AZURE_AD_CLIENT_ID"                = var.aad_client_id
    "AZURE_AD_CLIENT_SECRET"            = var.aad_client_secret
    "QUARANTINE_ENDPOINT"               = var.quarantine_endpoint
  }
}

resource "azurerm_app_service_plan" "plan" {
  name                = "plan-${local.prefix}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "FunctionApp"
  sku { tier = "Dynamic", size = "Y1" }
}

# RBAC: the function may only revoke tokens for the Hybrid-Enforcement group's devices
resource "azuread_application" "soc_service_principal" {
  display_name     = "HybridSec-SOC"
  owners           = []
}

resource "azuread_service_principal" "soc_sp" {
  application_id = azuread_application.soc_service_principal.application_id
}

# Challenge: keep the webhook secret + the CA policy out of the repo; wire them
# via tfvars. Token revocation is idempotent, so retries are safe.
variable "soc_webhook_secret"  { type = string, sensitive = true }
variable "aad_tenant_id"       { type = string }
variable "aad_client_id"       { type = string }
variable "aad_client_secret"   { type = string, sensitive = true }
variable "quarantine_endpoint" { type = string }