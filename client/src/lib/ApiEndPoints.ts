import Env from "./Env";

export const SERVER: string = Env.SERVER;
export const API_URL: string = SERVER + "/api";
export const LOGIN_URL: string = API_URL + "/login";
export const VERIFY_CREDENTIALS_URL: string = API_URL + "/verify-credentials";