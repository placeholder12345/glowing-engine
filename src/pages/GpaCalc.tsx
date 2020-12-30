import React, { useState, useEffect } from 'react';
import {
  EuiTitle,
  EuiPageBody,
  EuiFlexGroup,
  EuiFormRow,
  EuiFieldText,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';
import axios from 'axios';

const AUTO_SAVE_DELAY = 3000;

type GPA = {
  id: number;
  class: string;
  grade: string;
};

function GpaCalc(): React.ReactElement {
  const [gpaList, setGpaList] = useState<Array<GPA>>([]);

  useEffect(() => {
    axios.get('/api/gpa/list').then((data) => {
      setGpaList(data.data.results);
    });
  }, []);

  const saveGpaList = (): void => {
    axios.post('/api/gpa/update', {
      items: gpaList.filter((gpa) => !Number.isNaN(Number.parseFloat(gpa.grade))),
    });
  };

  const autoSaveTimer = setTimeout(() => {
    saveGpaList();
  }, AUTO_SAVE_DELAY);

  const calcGPA = (): number => {
    let count = 0;
    let sum = 0;
    for (let i = 0; i < gpaList.length; i += 1) {
      if (!Number.isNaN(gpaList[i].grade)) {
        sum += Number.parseFloat(gpaList[i].grade);
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
      clearTimeout(autoSaveTimer);
      const index = parseInt(e.target.dataset.index, 10);
      const newNum = e.target.value;
      setGpaList(gpaList.map((gpa) => (gpa.id === index ? { ...gpa, grade: newNum } : gpa)));
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.dataset.index) {
      clearTimeout(autoSaveTimer);
      const index = parseInt(e.target.dataset.index, 10);
      setGpaList(
        gpaList.map((gpa) => (gpa.id === index ? { ...gpa, class: e.target.value } : gpa)),
      );
    }
  };

  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>GPA Calculator</h1>
      </EuiTitle>
      {gpaList.map((gpa) => (
        <EuiFlexGroup style={{ maxWidth: 600 }} key={gpa.id}>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiFieldText
                data-index={gpa.id}
                onChange={onNameChange}
                placeholder="Class"
                value={gpa.class}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiFieldText
                data-index={gpa.id}
                onChange={onChange}
                value={gpa.grade}
                placeholder="Grade"
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      ))}
      <EuiButton
        onClick={(): void => {
          setGpaList((prev) => [
            ...prev,
            { id: Math.floor(Math.random() * 100000), class: '', grade: '' },
          ]);
        }}
      >
        Add class
      </EuiButton>
      <EuiButton onClick={(): void => {}}>Calculate</EuiButton>
      GPA = {calcGPA()}
    </EuiPageBody>
  );
}

export default GpaCalc;
