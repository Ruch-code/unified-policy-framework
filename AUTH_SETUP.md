# Compliance Framework — Auth Setup

This site uses Netlify serverless functions backed by MongoDB (Atlas) for
user registration, admin approval, login, and password resets.

## 1. Create a free MongoDB Atlas cluster (if you don't have one)

1. Go to https://www.mongodb.com/cloud/atlas/register and create an account.
2. In Atlas, click **Build a Database** and pick the **M0 Free** (Serverless/Shared)
   tier — no credit card required.
3. Leave the default cloud provider/region (or pick one near your users).
4. During setup, create a **database user** (username + password) and under
   **Network Access** click **Add Your Current IP**. (For a demo you may allow
   access from anywhere = `0.0.0.0/0`.)
5. Go to **Database → Connect → Drivers → Node.js**, and copy the connection
   string (`mongodb+srv://<user>:<pass>@cluster0.xxxx.mongodb.net/...`).
   Replace `<user>` and `<pass>` with your database user's credentials.

You now have a connection string — set it as `MONGODB_URI` below.

## 2. Required Netlify environment variables

## Required Netlify environment variables
Set these in the Netlify dashboard (Site settings → Environment variables):

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/compliance` |
| `JWT_SECRET` | Signing secret for auth tokens | long random string |
| `ADMIN_EMAIL` | Email of the default admin account | `<admin-email>` |
| `ADMIN_PASSWORD` | Password for the default admin account | `<admin-password>` |
| `DEFAULT_USER_PASSWORD` | Temporary password assigned to new/approved users | e.g. `<temp-password>` |

## Default accounts
- **Admin:** created automatically on first login from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- **Users:** register (pending), admin approves → they get the default password to sign in, then reset it.

## Functions (paths)
- `POST /api/auth/register` — create account (status: pending)
- `POST /api/auth/login` — sign in (blocked until approved)
- `GET  /api/auth/me` — current user
- `POST /api/auth/password` — change own password
- `POST /api/auth/reset-request` — request reset token
- `POST /api/auth/reset-confirm` — redeem token + set new password
- `GET  /api/admin/users` — list users (admin)
- `POST /api/admin/approve` — approve / reject pending (admin)
- `POST /api/admin/user-update` — activate/deactivate/delete/reset-pwd/make-admin/revoke-admin (admin)
- `POST /api/admin/init` — ensure default admin exists (admin)

Note: reset-request/register currently return the token/password in the response
because no email service is wired up. For production, connect an email provider
(Resend/SendGrid) and send the token instead of returning it.
