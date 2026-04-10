import cloudbase from '@cloudbase/js-sdk';

const envId = import.meta.env.VITE_CLOUDBASE_ENV_ID;

if (!envId) {
  // Keep startup explicit so deployment config errors are obvious.

  console.warn('Missing VITE_CLOUDBASE_ENV_ID in .env.local');
}

export const app = cloudbase.init({
  env: envId ?? '',
});

export const db = app.database();
