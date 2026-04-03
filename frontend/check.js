try { var p = require('./node_modules/tailwindcss/package.json'); console.log('tailwindcss:', p.version); } catch(e) { console.log('tailwindcss: NOT FOUND'); }
try { var p2 = require('./node_modules/@tailwindcss/vite/package.json'); console.log('@tailwindcss/vite:', p2.version); } catch(e) { console.log('@tailwindcss/vite: NOT FOUND'); }
