import React from 'react';
import { EuiTitle, EuiPageBody } from '@elastic/eui';

function Home(): React.ReactElement {
  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>Home</h1>
      </EuiTitle>
    </EuiPageBody>
  );
}

export default Home;
