export const requestEndpointBase = 'http://localhost:8080';

export function getApiURI(endpoint: string) {
    return requestEndpointBase + endpoint;
}