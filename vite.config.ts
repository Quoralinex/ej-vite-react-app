import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
        plugins: [react(), cloudflare()],
        resolve: {
                alias: [
                        { find: "@", replacement: path.resolve(__dirname, "src") },
                        {
                                find: "@tanstack/react-query",
                                replacement: path.resolve(__dirname, "src/lib/react-query.tsx"),
                        },
                        { find: "react-router-dom", replacement: path.resolve(__dirname, "src/lib/react-router-dom.tsx") },
                        { find: "lucide-react", replacement: path.resolve(__dirname, "src/lib/lucide-react.tsx") },
                        {
                                find: "class-variance-authority",
                                replacement: path.resolve(__dirname, "src/lib/class-variance-authority.ts"),
                        },
                        {
                                find: /^@radix-ui\/react-.+$/,
                                replacement: path.resolve(__dirname, "src/lib/radix-stub.tsx"),
                        },
                        { find: "react-hook-form", replacement: path.resolve(__dirname, "src/lib/react-hook-form.ts") },
                        { find: "input-otp", replacement: path.resolve(__dirname, "src/lib/input-otp.tsx") },
                        { find: "next-themes", replacement: path.resolve(__dirname, "src/lib/next-themes.tsx") },
                        { find: "sonner", replacement: path.resolve(__dirname, "src/lib/sonner.tsx") },
                        { find: "clsx", replacement: path.resolve(__dirname, "src/lib/clsx.ts") },
                        { find: "tailwind-merge", replacement: path.resolve(__dirname, "src/lib/tailwind-merge.ts") },
                ],
        },
});
