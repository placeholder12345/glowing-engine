import React, { Dispatch } from 'react';
import axios from 'axios';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  EuiTitle,
  EuiPageBody,
  EuiFormRow,
  EuiFieldText,
  EuiForm,
  EuiButton,
  EuiPageContentHeader,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeaderSection,
  EuiFlexItem,
} from '@elastic/eui';

import { UserActions, LOGIN } from '../actions/userActions';

function Login(): React.ReactElement {
  const userDispatch = useDispatch<Dispatch<UserActions>>();
  const history = useHistory();

  const login = (): void => {
    userDispatch({
      type: LOGIN,
      payload: {
        id: '123',
        username: 'username',
      },
    });
    axios.post('/api/login/test', { name: 'hi' });
    history.push('/');
  };

  const signup = (): void => {
    history.push('/signup');
  };

  const googleLogin = (googleUser: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    axios.post('/api/login/token', { user: googleUser }).then((response) => {
      if (response.status === 200) {
        userDispatch({
          type: LOGIN,
          payload: {
            id: response.data.user_id,
            username: response.data.name,
          },
        });
        history.push('/');
      }
    });
  };

  return (
    <EuiPageBody component="div">
      <EuiPageContent verticalPosition="center" horizontalPosition="center">
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Log In</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiForm component="form">
            <EuiFormRow label="Username" helpText="Enter your username.">
              <EuiFieldText name="username" />
            </EuiFormRow>
            <EuiFormRow label="Password" helpText="Enter your password.">
              <EuiFieldText name="password" type="password" />
            </EuiFormRow>
            <EuiFlexItem>
              <EuiButton onClick={(): void => login()}>Log In</EuiButton>
              <EuiButton size="s" onClick={(): void => signup()}>
                Sign Up
              </EuiButton>
            </EuiFlexItem>
            <GoogleLogin
              clientId="410354071967-qj3180vqq8j67l6moek3sov3sblbtd3l.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={(googleUser: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
                googleLogin(googleUser);
              }}
              cookiePolicy="single_host_origin"
            />
          </EuiForm>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  );
}

export default Login;
