import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  outDir: "lib",
  target: "node22", // match engines.node
  clean: true,
});
