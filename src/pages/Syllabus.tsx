import React, { useState } from 'react';
import { EuiTitle, EuiFilePicker, EuiFlexItem, EuiButton } from '@elastic/eui';

import FileList from '../components/FileList';

function Syllabus(): React.ReactElement {
  const [files, setFiles] = useState<Array<File>>([]);

  const onChange = (newFiles: null | FileList): void => {
    if (newFiles) {
      const newF = Array<File>();
      Array.from(newFiles).forEach((file) => newF.push(file));
      setFiles((oldF) => [...(oldF ?? []), ...newF]);
    }
  };

  function upload(): void {
    // console.log(files);
    if (files) {
      const uploads = Array<File>();
      Array.from(files).forEach((file) => uploads.push(file));
      console.log(uploads);
    }
  }

  return (
    <div>
      <EuiTitle size="l">
        <h1>Syllabus</h1>
      </EuiTitle>
      <EuiFilePicker
        id="asdf2"
        multiple
        initialPromptText="Select or drag and drop multiple files"
        onChange={(newFiles): void => {
          onChange(newFiles);
        }}
        display="default"
        aria-label="Use aria labels when no actual label is in use"
      />
      <FileList files={files} setFiles={setFiles} />
      <EuiFlexItem grow={false}>
        <EuiButton onClick={(): void => upload()}>Upload</EuiButton>
      </EuiFlexItem>
    </div>
  );
}

export default Syllabus;
