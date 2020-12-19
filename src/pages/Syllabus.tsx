import React, { useState } from 'react';
import { EuiTitle, EuiFilePicker } from '@elastic/eui';

function Syllabus(): React.ReactElement {
  const [files, setFiles] = useState<null | FileList>();

  const onChange = (newFiles: null | FileList): void => {
    setFiles(newFiles);
  };

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
      {files
        ? Array.from(files).map(
            (file: File): React.ReactElement => (
              <li key={file.name}>
                <strong>{file.name}</strong> ({file.size} bytes)
              </li>
            ),
          )
        : null}
    </div>
  );
}

export default Syllabus;
