// Google Books API search function
export const searchGoogleBooks = async (query: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        if (!response.ok) {
            throw new Error('Error fetching books');
        }
        const data = await response.json();
        return data.items.map((book: any) => ({
            bookId: book.id,
            authors: book.volumeInfo.authors || ['No author available'],
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks?.thumbnail || '',
            link: book.volumeInfo.infoLink,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
  };
  