import React from 'react';
import { EuiButton, EuiFlexItem, EuiPage } from '@elastic/eui';

function App(): React.ReactElement {
  return (
    <EuiPage>
      <div className="App">
        <div className="content">Hello World</div>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={(): void => {}}>Primary</EuiButton>
        </EuiFlexItem>
      </div>
    </EuiPage>
  );
}

export default App;
