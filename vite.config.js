import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    base: '/',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                scroll: resolve(__dirname, 'scroll.html')
            },
            output: {
                manualChunks: {
                    'vendor': ['marked'],
                    'modules': [
                        './src/js/analytics.js',
                        './src/js/scroll-data.js',
                        './src/js/lazy-loader.js',
                        './src/js/utils.js'
                    ]
                }
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});