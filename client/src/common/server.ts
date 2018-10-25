import * as jwtDecode from 'jwt-decode';
import { IJwtToken } from './interfaces';
export const requestEndpointBase = `//${window.location.hostname}:9000`;

export function getApiURI(endpoint: string) {
    return requestEndpointBase + endpoint;
}

export async function fetchServer(endpoint: string, method: string = 'GET', body: any = undefined) {
    const response = await fetch(getApiURI(endpoint), {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + getToken(),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    return response;
}

export function getToken(): string | null {
    return sessionStorage.getItem('jwt');
}

export function getUserEmail(): string | null {
    const rawToken = getToken();
    if (rawToken === null) {
        return null;
    }
    const token = jwtDecode(rawToken) as IJwtToken;
    return token.sub;
}
