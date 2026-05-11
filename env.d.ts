/** Local env typings — values come from `.env` (see `.env.example`). */
declare namespace NodeJS {
  interface ProcessEnv {
    /** Hono API origin, e.g. https://xxx.vercel.app or http://192.168.1.5:3000 */
    EXPO_PUBLIC_API_URL?: string;
  }
}
