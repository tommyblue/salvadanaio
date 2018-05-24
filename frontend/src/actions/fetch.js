import _ from 'lodash';

import { getAuthToken, signOut } from './auth';
import { setNotification } from './notification';
import store from '../store';

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

export const saveForm = (url, body) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
        },
        body: body,
      }).then(response => response.json());
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

export const errorOnFetch = (error) => {
    return setNotification(error.message, 'danger')
};

export const deleteResource = (url, authToken) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "DELETE",
      });
};

const mergeAuthHeaders = (baseOptions) => {
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

const authFetch = (url, options) => (
    fetch(url, mergeAuthHeaders(options)).then(
        response => {
            if (response.status === 401) {
                store.dispatch(signOut());
                throw new Error("Unauthorized");
            }
            if (response.status >= 400) {
                return response.json().then(resp => {
                    throw new Error(resp.error);
                });
            } else {
                return response;
            }
        },
        error => error
    )
);
