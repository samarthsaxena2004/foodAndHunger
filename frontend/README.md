# Food and hunger (frontend)

## How to run the code

1. Do git clone

```
git@github.com:Bugsfounder/foodAndHunger.git
```

2. change directory

```
cd foodAndHunger/frontend
```

3. Install dependencies

```
npm install
```

4. Run

```
npm run dev
```

## Debugger

if got error like this, follow steps bellow:

```
failed to load config from /home/bugsfounder/workspace/foodandhunger/frontend/vite.config.js
error when starting dev server:
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@tailwindcss/vite' imported from /home/bugsfounder/workspace/foodandhunger/frontend/node_modules/.vite-temp/vite.config.js.timestamp-1761401879564-05bdd65d5b958.mjs
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)
    at packageResolve (node:internal/modules/esm/resolve:767:81)
    at moduleResolve (node:internal/modules/esm/resolve:853:18)
    at defaultResolve (node:internal/modules/esm/resolve:983:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:731:20)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:708:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:310:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:182:49)
```

This error means Vite can’t find the **`@tailwindcss/vite`** package that your `vite.config.js` is trying to import.

### Fix Steps:

1. **Install missing package**

   ```bash
   npm install @tailwindcss/vite -D
   ```

   or with yarn:

   ```bash
   yarn add -D @tailwindcss/vite
   ```

2. **If still fails**, remove temp + rebuild:

   ```bash
   rm -rf node_modules .vite-temp package-lock.json
   npm install
   npm run dev
   ```

3. **Check your `vite.config.js`**
   It should look like:

   ```js
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   });
   ```

### Why it happened:

You likely upgraded Tailwind or Vite recently — Tailwind v4 uses a new `@tailwindcss/vite` plugin, which must be installed manually.

After installing it, restart your dev server.
