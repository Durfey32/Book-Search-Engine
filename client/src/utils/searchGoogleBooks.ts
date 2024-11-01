// Google Books API search function

export const searchGoogleBooks = (query: string) => {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );
  };
  