import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';
import { enableGreenClickCursor } from './utils/green-cursor.js';

enableGreenClickCursor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);// cache bust Tue Sep 15 06:15:16 IST 2026
export const BUILD_TIME = 'Tue Sep 15 06:40:33 IST 2026';
// FORCE REBUILD 1789443787
window.__BUILD_ID__ = '1789443952842711000';
// cache bust 1789792121
// cache bust 1789880088
