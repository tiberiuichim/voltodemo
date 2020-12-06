import React from 'react';

import { Progress as UiProgress } from 'semantic-ui-react';

const Progress = ({ value }) => {
  const v = Math.round(parseFloat(value));
  return <UiProgress percent={v} />;
};

export default Progress;