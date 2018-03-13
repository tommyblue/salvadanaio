export const ERROR_HAPPENED = "ERROR_HAPPENED";

export const fetchResource = (url) => {
    return fetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`).then(response => response.json());
}

export const saveResource = (url, body) => {
    return fetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then(response => response.json());
}

export const errorOnFetch = (error) => ({
    type: ERROR_HAPPENED,
    errors: error,
});

export const deleteResource = (url) => {
    return fetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "DELETE",
      });
};
