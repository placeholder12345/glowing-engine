import React, { Dispatch } from 'react';

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
    history.push('/');
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
              <EuiFieldText name="first" />
            </EuiFormRow>
            <EuiFormRow label="Password" helpText="Enter your password.">
              <EuiFieldText name="first" />
            </EuiFormRow>
            <EuiButton onClick={(): void => login()}>Log In</EuiButton>
          </EuiForm>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  );
}

export default Login;
