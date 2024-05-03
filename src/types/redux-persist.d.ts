declare module "redux-persist/lib/storage/createWebStorage" {
  export interface WebStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, item: string) => void;
    removeItem: (key: string) => void;
  }

  export default function createWebStorage(type: string): WebStorage;
}
