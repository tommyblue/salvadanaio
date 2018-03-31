import _ from 'lodash';

import { getAuthToken, signOut } from './auth';
import store from '../store';

export const ERROR_HAPPENED = "ERROR_HAPPENED";

export const fetchResource = (url) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`)
        .then(response => response.json(), error => error);
}

export const saveResource = (url, body) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then(response => response.json(), error => error);
}

export const sessionResource = (action, body) => {
    return fetch(`${process.env.REACT_APP_API_HOST}/api/sessions/${action}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
}

export const errorOnFetch = (error) => ({
    type: ERROR_HAPPENED,
    errors: error,
});

export const deleteResource = (url, authToken) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "DELETE",
      });
};

const getAuthHeaders = (baseOptions) => {
    const options = _.isUndefined(baseOptions) ? {} : baseOptions;
    if (!_.has(options, 'headers')) {
        options.headers = {};
    }
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${getAuthToken()}`,
    };
    return options;
}

const authFetch = (url, baseOptions) => (
    fetch(url, getAuthHeaders(baseOptions)).then(
        response => {
            if (response.status === 401) {
                store.dispatch(signOut());
                throw new Error("Unauthorized");
            }
            return response;
        },
        error => error
    )
);
