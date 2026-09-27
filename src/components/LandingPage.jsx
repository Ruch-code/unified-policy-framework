import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import AIPrivacyRisks from './AIPrivacyRisks.jsx';
import VendorRiskManagement from './VendorRiskManagement.jsx';
import { Sun, Moon, Globe, Shield, Check, Eye, LogOut, ArrowRight, AlertCircle, ShieldCheck, Package, Folder, MapPin, Clock, Settings, ShieldX, Trash2, FileText, AlertTriangle, Heart, Phone, Mail, Layout, Users, ShieldCheck as ShieldCheckIcon } from 'lucide-react';
import UseCaseFlashCards from './UseCaseFlashCards.jsx';

import { useAuth } from '../context/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

import './LandingPage.css';

const FRAMEWORKS = [
  { name: 'ISO 22317', key: 'ISO22317', color: '#059669', short: 'ISO 22317' },
  { name: 'SOC 2', key: 'SOC2', color: '#059669', short: 'SOC 2' },
  { name: 'ISO 27001', key: 'ISO', color: '#1d4ed8', short: 'ISO 27001' },
  { name: 'PCI-DSS', key: 'PCI', color: '#dc2626', short: 'PCI-DSS' },
  { name: 'HIPAA', key: 'HIPAA', color: '#dc27c7', short: 'HIPAA' },
  { name: 'NIST CSF', key: 'NIST', color: '#7f6b3f', short: 'NIST CSF' },
  { name: 'GDPR', key: 'GDPR', color: '#0891b2', short: 'GDPR' },
  { name: 'CCPA/CPRA', key: 'CCPA', color: '#ea580c', short: 'CCPA' },
  { name: 'FedRAMP', key: 'FEDRAMP', color: '#0891b2', short: 'FedRAMP' },
  { name: 'CJIS', key: 'CJIS', color: '#dc2626', short: 'CJIS' },
  { name: 'DPDPA', key: 'DPDPA', color: '#059669', short: 'DPDPA' },
  { name: 'LGPD', key: 'LGPD', color: '#0891b2', short: 'LGPD' },
  { name: 'PDPA', key: 'PDPA', color: '#7f6b3f', short: 'PDPA' },
  { name: 'PIPL', key: 'PIPL', color: '#7f6b3f', short: 'PIPL' },
];

export default function LandingPage({ children, isDark = false }) {
  const canvasRef = useRef(null);
  const [animationId, setAnimationId] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl2');
    if (!gl) return;
    
    // Setup scene
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    
    let angles = { x: 0, y: 0 };
    let rotationSpeed = 0.5;
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);
    
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      angles.x += rotationSpeed;
      angles.y += rotationSpeed * 0.7;
      
      // Draw rotating neon cube
      gl.loadIdentity();
      gl.translatef(0, 0, -5);
      gl.rotatef(angles.x, 1, 0, 0);
      gl.rotatef(angles.y, 0, 1, 0);
      
      // Neon colors based on dark mode
      const colors = isDark 
        ? [[0.2, 0.6, 1], [0.9, 0.6, 0.2], [0.7, 0.8, 1], [0.3, 0.4, 1]]
        : [[0.8, 0.2, 0.2], [0.9, 0.6, 0.1], [0.6, 0.7, 1], [0.2, 0.4, 0.8]];
      
      gl.begin(gl.TRIANGLES);
      for (let i = 0; i < 24; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        gl.color3f(...color);
        // Simple triangle vertices
        gl.vertex3f(
          (i % 2) * 2 - 1,
          Math.floor(i / 2) * 2 - 1,
          0
        );
      }
      gl.end();
      
      setAnimationId(requestAnimationFrame(render));
    }
    
    render();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isDark]);
  
  return (
    <div className="fixed inset-0 bg-black z-0 pointer-events-none">
      <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-auto z-50">
        <Logo size={50} />
        <span className="text-2xl font-bold text-[#f59e0b] tracking-wider">GRC</span>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative inset-0 flex items-center justify-center pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
// cache bust Tue Sep 15 06:16:13 IST 2026
