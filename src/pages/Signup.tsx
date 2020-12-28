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
  EuiFlexItem,
} from '@elastic/eui';
import { UserActions, LOGIN } from '../actions/userActions';

function Signup(): React.ReactElement {
  const userDispatch = useDispatch<Dispatch<UserActions>>();
  const history = useHistory();

  const login = (): void => {
    history.push('/login');
  };

  const signup = (): void => {
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
              <h2>Sign Up</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiForm component="form">
            <EuiFormRow label="Email" helpText="Enter your password.">
              <EuiFieldText name="email" />
            </EuiFormRow>
            <EuiFormRow label="Password" helpText="Enter your password.">
              <EuiFieldText name="password" type="password" />
            </EuiFormRow>
            <EuiFormRow label="Re-enter Password" helpText="Re-enter your password.">
              <EuiFieldText name="confirmpassword" type="password" />
            </EuiFormRow>
            <EuiFlexItem grow={false}>
              <EuiButton size="s" onClick={(): void => signup()}>
                Sign Up
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={(): void => login()}>Back to Login Page</EuiButton>
            </EuiFlexItem>
          </EuiForm>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  );
}

export default Signup;
