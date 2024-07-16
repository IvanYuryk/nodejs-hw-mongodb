   export const ENV_VARS = {
    PORT: 'PORT',
    MONGODB_USER: 'MONGODB_USER',
    MONGODB_PASSWORD: 'MONGODB_PASSWORD',
    MONGODB_URL: 'MONGODB_URL',
    MONGODB_DB: 'MONGODB_DB',
  };
  
  export const typeList = ['work', 'home', 'personal'];
  export const sortList = ['asc', 'desc'];
  export const fieldList = ['name', 'phoneNumber', 'email', 'contactType'];

  export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


  export const ACCESS_LIFETIME = 15 * 60 * 1000;
  export const REFRESH_LIFETIME = 30 * 24 * 3600 * 1000;

  export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
  };
