/// <reference types="vite/client" />

declare global {
  interface Window {
    Buffer: typeof Buffer;
    ethereum?: any;
  }
}
