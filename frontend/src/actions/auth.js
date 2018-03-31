import Cookies from 'universal-cookie';

import {sessionResource, errorOnFetch} from './fetch';

export const AUTHENTICATION_SUCCEDED = "AUTHENTICATION_SUCCEDED";
export const AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export const AUTHENTICATION_SIGNOUT = "AUTHENTICATION_SIGNOUT";

export const signIn = (email, password) => ((dispatch) => {
    return sessionResource(`sign_in`, {email: email, password: password}).then(
        response => {
            if (!response.ok) {
                return response.status === 401
                    ? dispatch(signInFailed())
                    : dispatch(errorOnFetch(response.statusText));
            }
            return response.json().then(response => dispatch(signInSuccessfull(response.data)));
        },
        error => {
            return dispatch(errorOnFetch(error))
        }
    );
});

const signInSuccessfull = (data) => {
    setAuthToken(data.token);
    return {
        type: AUTHENTICATION_SUCCEDED,
    }
};

const signInFailed = () => {
    removeAuthToken();
    return {
        type: AUTHENTICATION_FAILED,
    };
};

export const signOut = () => {
    removeAuthToken();
    return {
        type: AUTHENTICATION_SIGNOUT,
    }
};

const setAuthToken = (token) => {
    const cookies = new Cookies();
    cookies.set('salvadanaio_auth_token', token, {
        path: '/',
        // domain: 'salvadanaio.tommyblue.it',
        // secure: true,
        // maxAge: 86400,
        // expires: <date>,
    });
};

export const getAuthToken = () => {
    const cookies = new Cookies();
    return cookies.get('salvadanaio_auth_token');
};

const removeAuthToken = () => {
    const cookies = new Cookies();
    cookies.remove('salvadanaio_auth_token', {
        path: '/',
        // domain: 'salvadanaio.tommyblue.it',
        // secure: true,
        // maxAge: 86400,
        // expires: <date>,
    });
};
