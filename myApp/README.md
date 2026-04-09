# myApp (CloudBase Full-Stack Monorepo)

This project is a Lerna + npm workspaces monorepo using TypeScript and React.

## Structure

- `apps/web`: React + Vite frontend, integrates CloudBase Web SDK.
- `packages/api-function`: CloudBase HTTP function (TypeScript) for todo APIs.

## Prerequisites

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure env:

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

3. Fill `VITE_CLOUDBASE_ENV_ID` with your CloudBase env id.
4. Multi-environment files in `apps/web`:
   - `.env.development` -> Local
   - `.env.lq` -> LQ
   - `.env.production` -> Production

## Local development

```bash
npm run dev --workspace web        # Local
npm run dev:lq --workspace web     # LQ
```

## Build

```bash
npm run build --workspace web       # Production
npm run build:lq --workspace web    # LQ
npm run build:local --workspace web # Local
```

## CloudBase deployment workflow (MCP-first)

Before any CloudBase operation, inspect MCP tool schemas:

```bash
npx mcporter describe cloudbase --all-parameters
```

### 1) Login and bind env

```bash
npx mcporter call cloudbase.auth action=start_auth authMode=device --output json
npx mcporter call cloudbase.auth action=set_env envId=your-env-id --output json
```

### 2) Deploy backend function

Build function package first:

```bash
npm run build --workspace api-function
```

Then use `cloudbase.manageFunctions` (`createFunction` or `updateFunctionCode`) to deploy files from `packages/api-function/dist`.

### 3) Deploy frontend static hosting

Build web:

```bash
npm run build --workspace web
```

Then upload `apps/web/dist` by using CloudBase hosting upload tools via MCP.

## Notes

- Frontend directly writes and reads from `todos` collection through CloudBase Web SDK.
- Backend function demonstrates HTTP API pattern with `exports.main`.
- For production, configure auth providers first if login is required.
