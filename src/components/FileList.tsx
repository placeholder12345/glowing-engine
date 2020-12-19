import React from 'react';

import { EuiButtonIcon } from '@elastic/eui';

type Props = {
  files: Array<File>;
  setFiles: React.Dispatch<React.SetStateAction<Array<File>>>;
};

function FileList(props: Props): React.ReactElement {
  const { files, setFiles } = props;

  function remove(file: File): void {
    setFiles(files.filter((old) => old !== file));
  }

  return (
    <>
      {files.map(
        (file: File): React.ReactElement => (
          <li key={file.name}>
            <strong>{file.name}</strong> ({file.size} bytes)
            <EuiButtonIcon onClick={(): void => remove(file)} iconType="cross" aria-label="Next" />
          </li>
        ),
      )}
    </>
  );
}

export default FileList;
