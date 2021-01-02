import React from 'react';
import { EuiTitle, EuiPageBody } from '@elastic/eui';
// import Timetable from 'react-timetable-events';

function Schedule(): React.ReactElement {
  return (
    <EuiPageBody component="div">
      <EuiTitle size="l">
        <h1>Schedule</h1>
      </EuiTitle>
      {/* <Timetable /> */}
    </EuiPageBody>
  );
}

export default Schedule;
