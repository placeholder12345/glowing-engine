import React, { useState, useEffect } from 'react';
import {
  EuiTitle,
  EuiPageBody,
  EuiFlexGroup,
  EuiFormRow,
  EuiFieldText,
  EuiFlexItem,
  EuiSelect,
  EuiButton,
  EuiButtonIcon,
} from '@elastic/eui';
import axios from 'axios';

type Grade = {
  id: number;
  course: string;
  name: string;
  type: string;
  score: number;
};

function Grades(): React.ReactElement {
  const [value, setValue] = useState(0);
  const [name, setName] = useState('____');
  const [type, setType] = useState('____');
  const [course, setCourse] = useState('____');

  const [allGrades, setAllGrades] = useState<Array<Grade>>([]);

  useEffect(() => {
    axios.get('/api/grades/list').then((data) => {
      setAllGrades(data.data.results);
    });
  }, []);

  const onChangeGrade = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(parseFloat(e.target.value));
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setType(e.target.value);
  };

  const onChangeCourse = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCourse(e.target.value);
  };

  const addGrades = (): void => {
    axios
      .post('/api/grades/add', {
        score: value.toString(),
        name,
        type,
        course,
      })
      .then((response) =>
        setAllGrades((prev) => [
          ...prev,
          { id: response.data.id, name, type, course, score: value },
        ]),
      );
  };

  const removeGrade = (id: number): void => {
    axios.post('/api/grades/remove', {
      id,
    });
    setAllGrades((prev) => prev.filter((grade) => grade.id !== id));
  };

  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>Grades</h1>
      </EuiTitle>
      <EuiFormRow hasEmptyLabelSpace>
        <EuiSelect
          onChange={onChangeCourse}
          hasNoInitialSelection
          options={[
            { value: 'CS490', text: 'CS490' },
            { value: 'Math450', text: 'Math450' },
            { value: 'Math480', text: 'Math480' },
          ]}
        />
      </EuiFormRow>
      <EuiFormRow hasEmptyLabelSpace>
        <EuiSelect
          onChange={onChangeType}
          hasNoInitialSelection
          options={[
            { value: 'homework', text: 'Homework' },
            { value: 'quiz', text: 'Quiz' },
            { value: 'test', text: 'Test' },
          ]}
        />
      </EuiFormRow>

      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText onChange={onChangeName} placeholder="Assignment Name" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText onChange={onChangeGrade} placeholder="Grade" />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={(): void => addGrades()}>Add Grade</EuiButton>
      </EuiFlexItem>
      {allGrades.map(
        (grade: Grade): React.ReactElement => (
          <li key={grade.id}>
            <strong>
              {grade.course} {grade.name} {grade.type} {grade.score}{' '}
              <EuiButtonIcon
                onClick={(): void => removeGrade(grade.id)}
                iconType="trash"
                aria-label="Next"
              />
            </strong>
          </li>
        ),
      )}
    </EuiPageBody>
  );
}

export default Grades;
