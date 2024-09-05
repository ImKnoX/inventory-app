declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: 'production' | 'development';
        DATABASE_URL?: string;
      }
    }
  }