// use this to decode a token and get the user's information out of it
import { jwtDecode } from 'jwt-decode';

interface UserToken {
  name: string;
  exp: number;
}

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken();
    if (token) {
    return jwtDecode(token);
  }
  return null;
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } 
      
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }

  getSavedBookIds() {
    const savedBookIds = localStorage.getItem('saved_books');
    return savedBookIds ? JSON.parse(savedBookIds) : [];
  }

  saveBookIds(bookId: string[]) {
    if (bookId.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookId));
    } else {
      localStorage.removeItem('saved_books');
    }
  }

  removeBookID(bookId: string): void {
    const savedBookIds = this.getSavedBookIds();
    const updatedSavedBookIds = savedBookIds.filter((id: string) => id !== bookId);
  
    this.saveBookIds(updatedSavedBookIds);
  }
}

export default new AuthService();
