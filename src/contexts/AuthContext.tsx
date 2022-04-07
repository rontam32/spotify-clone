import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../services/auth/auth';
import { GenericProps } from '../models/Application';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/auth/auth-slice';

interface AuthContext {
    signoutRedirectCallback: () => void;
}

export const AuthContext = React.createContext<AuthContext>({
    signoutRedirectCallback: () => {},
});

export const AuthProvider = (props: GenericProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigateFn = useCallback((route?: string) => {
        navigate(route || '/', {replace: false});
    }, [])

    const authService = useMemo(() => {
        return new AuthService(
            navigateFn,
        )
    }, []);

    useEffect(() => {
        const auth = new AuthService(
            navigateFn
        )
        dispatch(authActions.initAuth({
            auth
        }));
        auth.initLogin();
    }, [])

    const signoutRedirectCallbackHandler = () => {
        authService.signoutRedirectCallback();
    };

    return <AuthContext.Provider value={{
        signoutRedirectCallback: signoutRedirectCallbackHandler,
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider;