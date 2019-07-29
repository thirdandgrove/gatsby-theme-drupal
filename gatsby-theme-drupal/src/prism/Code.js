import React, { useEffect } from 'react';

import Prism from './prism';
import './prism.css';

export default ({ code }) => {
  useEffect(() => Prism.highlightAll(), [code]);
  return (
    <pre style={{ overflow: 'scroll', height: '500px', width: '750px' }}>
      <code className="language-javascript">{code}</code>
    </pre>
  );
};
