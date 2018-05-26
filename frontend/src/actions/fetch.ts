import * as _ from 'lodash';

import store from '../store';
import { getAuthToken, signOut } from './auth';
import { setNotification } from './notification';

export const fetchResource = (url: string) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`)
        .then((response: any) => response.json(), (error: any) => error);
}

export const saveResource = (url: string, body: any) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
      }).then((response: any) => response.json(), (error: any) => error);
}

export const saveForm = (url: string, body: any) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        body,
        headers: {
            'Accept': 'application/json',
        },
        method: "POST",
      }).then((response: any) => response.json());
}

export const sessionResource = (action: string, body: any) => {
    return fetch(`${process.env.REACT_APP_API_HOST}/api/sessions/${action}`, {
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
      });
}

export const errorOnFetch = (error: any) => {
    return setNotification(error.message, 'danger')
};

export const deleteResource = (url: string) => {
    return authFetch(`${process.env.REACT_APP_API_HOST}/api/v1/${url}`, {
        method: "DELETE",
      });
};

const mergeAuthHeaders = (baseOptions: any) => {
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

const authFetch = (url: string, options={}) => (
    fetch(url, mergeAuthHeaders(options)).then(
        (response: any) => {
            if (response.status === 401) {
                store.dispatch(signOut());
                throw new Error("Unauthorized");
            }
            if (response.status >= 400) {
                return response.json().then((resp: any) => {
                    throw new Error(resp.error);
                });
            } else {
                return response;
            }
        },
        (error: any) => error
    )
);
