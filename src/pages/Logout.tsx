import React, { Dispatch } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EuiTitle, EuiPageBody, EuiButton, EuiToast } from '@elastic/eui';

import { UserActions, LOGOUT } from '../actions/userActions';

function Logout(): React.ReactElement {
  const userDispatch = useDispatch<Dispatch<UserActions>>();
  const history = useHistory();

  const logout = (): void => {
    userDispatch({
      type: LOGOUT,
    });
    history.push('/');
  };

  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>Logout</h1>
      </EuiTitle>
      <EuiToast title="Are you sure you want to log out?" onClose={(): void => logout()}>
        <EuiButton onClick={(): void => logout()}>Log Out</EuiButton>
      </EuiToast>
    </EuiPageBody>
  );
}

export default Logout;
