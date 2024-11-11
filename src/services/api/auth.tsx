class Auth {
    private static readonly accessTokenKey = 'access_token';
    private static readonly refreshTokenKey = 'refress_token';

  
    static get accessToken(): string | null {
      return localStorage.getItem(this.accessTokenKey);
    }
  
    static set accessToken(value: string | null) {
      if (value) {
        localStorage.setItem(this.accessTokenKey, value);
      } else {
        localStorage.removeItem(this.accessTokenKey);
      }
    }
  
    static clearAccessToken(): void {
      localStorage.removeItem(this.accessTokenKey);
    }

    static get refreshToken(): string | null {
      return localStorage.getItem(this.refreshTokenKey);
    }

    static set refreshToken(value: string | null) {
      if (value) {
        localStorage.setItem(this.refreshTokenKey, value);
      } else {
        localStorage.removeItem(this.refreshTokenKey);
      }
    }

    static clearRefreshToken(): void {
      localStorage.removeItem(this.refreshTokenKey);
    } 
  }
export default Auth