/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 平台
  readonly VITE_APP_PLATFORM: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
