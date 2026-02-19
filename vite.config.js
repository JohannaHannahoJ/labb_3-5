import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "sass.html"),
                animering: resolve(__dirname, "animering.html")
            }
        }
    },
    css: {
        devSourcemap: true
    },
    plugins: [
        ViteImageOptimizer({
            jpeg: {
                quality: 75
            },
            jpg: {
                quality: 75
            },
            webp: {
                quality: 70
            }
        }),
    ]
});
