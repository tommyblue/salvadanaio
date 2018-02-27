export const ERROR_HAPPENED = "ERROR_HAPPENED";

export const fetchResource = (url) => {
    return fetch(`http://localhost:4000/api/v1/${url}`).then(response => response.json());
}

export const errorOnFetch = (error) => ({
    type: ERROR_HAPPENED,
    errors: error,
});
