import React from 'react';
import { EuiButton, EuiFlexItem, EuiTitle, EuiPageBody } from '@elastic/eui';

function Home(): React.ReactElement {
  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>Home</h1>
      </EuiTitle>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={(): void => {}}>Primary</EuiButton>
      </EuiFlexItem>
    </EuiPageBody>
  );
}

export default Home;
