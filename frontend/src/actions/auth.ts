import Cookies from 'universal-cookie';

import {errorOnFetch, sessionResource} from './fetch';

export const AUTHENTICATION_SUCCEDED = "AUTHENTICATION_SUCCEDED";
export const AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export const AUTHENTICATION_SIGNOUT = "AUTHENTICATION_SIGNOUT";

export const signIn = (email: string, password: string) => ((dispatch: any) => {
    return sessionResource(`sign_in`, {email, password}).then(
        (response: any) => {
            if (!response.ok) {
                return response.status === 401
                    ? dispatch(signInFailed())
                    : dispatch(errorOnFetch(response.statusText));
            }
            return response.json().then((resp: any) => dispatch(signInSuccessfull(resp.data)));
        },
        (error: any) => {
            return dispatch(errorOnFetch(error))
        }
    );
});

const signInSuccessfull = (data: any) => {
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

const setAuthToken = (token: any) => {
    const cookies: Cookies = new Cookies();
    cookies.set('salvadanaio_auth_token', token, {
        path: '/',
        // domain: 'salvadanaio.tommyblue.it',
        // secure: true,
        // maxAge: 86400,
        // expires: <date>,
    });
};

export const getAuthToken = () => {
    const cookies: Cookies = new Cookies();
    return cookies.get('salvadanaio_auth_token');
};

const removeAuthToken = () => {
    const cookies: Cookies = new Cookies();
    cookies.remove('salvadanaio_auth_token', {
        path: '/',
        // domain: 'salvadanaio.tommyblue.it',
        // secure: true,
        // maxAge: 86400,
        // expires: <date>,
    });
};
