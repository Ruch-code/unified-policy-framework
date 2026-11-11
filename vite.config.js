import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Icons go through the site's own icon layer (src/ui/icons.jsx) instead of the icon library.
    alias: [{ find: /^lucide-react$/, replacement: fileURLToPath(new URL('./src/ui/icons.jsx', import.meta.url)) }],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', 'topojson-client'],
          'iso-data': [
            'src/data/iso27001.js',
            'src/data/iso27001AnnexA.js',
            'src/data/iso27001Classification.js',
            'src/data/iso27001Soa.js'
          ],
          'interview-data': [
            'src/data/interview-roles.json',
            'src/data/interviewAnswers.js',
            'src/data/interviewQuestions.js',
            'src/data/interviewRolesData.js'
          ],
          'vendor-risk': [
            'src/components/VendorRiskManagement.jsx',
            'src/components/VendorIncidentBrief.jsx',
            'src/data/vendorIncidentStories.js',
            'src/utils/posterRenderer.js'
          ],
          'hipaa-data': ['src/data/hipaaDomain.js'],
          'search': ['src/components/SearchBar.jsx', 'src/data/searchIndex.js'],
        }
      }
    }
  },
  esbuild: {
    logLevel: 'silent'
  }
})
