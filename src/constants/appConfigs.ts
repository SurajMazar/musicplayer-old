export const API_URL = "https://api.songsnepal.com:4444/";
export const JWT_TOKEN = 'access-token';
export const USER_FULL_NAME = 'sn-web-fullName';
export const GOOGLE_CLIENT_ID = '1002546961948-4e0pph59169ngr3cr9pia2idadb6a81g.apps.googleusercontent.com'
export const FB_APP_ID = '582635539092510'

export const contentTypeHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

export const token = {
    "access-token": '',
    "client": '',
    "uid": '',
}


export const signUpEndpoint = {
  url: `${API_URL}/auth/sign_up`,
  method: "POST",
  headers: contentTypeHeader,
};

export const logoutEndpoint = {
  url: `${API_URL}/auth/sign_out`,
  method: "DELETE",
  headers: contentTypeHeader,
};