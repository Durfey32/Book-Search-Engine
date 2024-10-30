// Google Books API search function

interface ImportMetaEnv {
    readonly VITE_GOOGLE_BOOKS_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

export const searchGoogleBooks = (query: string) => {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );
  };
  