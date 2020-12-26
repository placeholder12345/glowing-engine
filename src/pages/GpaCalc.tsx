import React, { useState } from 'react';
import {
  EuiTitle,
  EuiPageBody,
  EuiFlexGroup,
  EuiFormRow,
  EuiFieldText,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';

function GpaCalc(): React.ReactElement {
  const [value, setValue] = useState<Array<number>>([0, 0, 0]);

  const calcGPA = (): number => {
    let count = 0;
    let sum = 0;
    for (let i = 0; i < value.length; i += 1) {
      if (!Number.isNaN(value[i])) {
        sum += value[i];
        count += 1;
      }
    }
    if (sum === 0) {
      return 0;
    }
    return sum / count;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.dataset.index) {
      const index = parseInt(e.target.dataset.index, 10);
      const newNum = parseFloat(e.target.value);
      setValue(value.map((num, i) => (i === index ? newNum : num)));
    }
  };

  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>GPA Calculator</h1>
      </EuiTitle>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText placeholder="Class" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText data-index={0} onChange={onChange} placeholder="Grade" />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText placeholder="Class" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText data-index={1} onChange={onChange} placeholder="Grade" />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText placeholder="Class" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText data-index={2} onChange={onChange} placeholder="Grade" />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiButton onClick={(): void => {}}>Calculate</EuiButton>
      GPA = {calcGPA()}
    </EuiPageBody>
  );
}

export default GpaCalc;
