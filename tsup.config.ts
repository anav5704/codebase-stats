import { defineConfig } from "tsup"

export default defineConfig({
    clean: true,
    entry: ["src/index.ts"],
    target: "esnext",
    outDir: "dist",
})