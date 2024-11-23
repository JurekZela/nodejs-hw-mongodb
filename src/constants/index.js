import * as path from 'node:path';

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
    APP_DOMAIN: 'APP_DOMAIN',
    JW_SECRET: 'JW_SECRET',
  };

  export const TEMPLATES_DIR = path.resolve("src", "templates");