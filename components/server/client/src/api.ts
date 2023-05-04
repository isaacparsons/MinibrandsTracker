import axios from 'axios';

export default class Api {
  baseUrl: string;
  constructor() {
    if (!process.env.REACT_APP_BACKEND_URL) {
      throw new Error('No .env variable set for REACT_APP_BACKEND_URL');
    }
    this.baseUrl = process.env.REACT_APP_BACKEND_URL;
  }
  authLocal(email: string, password: string) {
    return axios.post(
      `${this.baseUrl}/auth/login`,
      {
        email,
        password
      },
      { withCredentials: true }
    );
  }

  authLocalSignup(email: string, password: string) {
    return axios.post(
      `${this.baseUrl}/auth/signup`,
      {
        email,
        password
      },
      { withCredentials: true }
    );
  }

  authGoogle() {
    return window.open(`${this.baseUrl}/auth/google`, '_self');
  }

  logout() {
    return axios.get(`${this.baseUrl}/auth/logout`, {
      withCredentials: true
    });
  }

  isSessionAuthentic() {
    return axios.get(`${this.baseUrl}/session/authenticated`, {
      withCredentials: true
    });
  }
}
