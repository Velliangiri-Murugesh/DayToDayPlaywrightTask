// config/env.ts
// The only place in the framework that reads process.env.
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseURL: process.env.BASE_URL ?? 'https://the-internet.herokuapp.com',
  stagingURL: process.env.STAGING_URL ?? 'https://the-internet.herokuapp.com',
  prodURL: process.env.PROD_URL ?? 'https://the-internet.herokuapp.com',
  get username(): string {
    return required('TEST_USERNAME');
  },
  get password(): string {
    return required('TEST_PASSWORD');
  },
};