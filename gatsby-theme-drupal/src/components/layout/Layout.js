import React from 'react';

import Header from '../Header';
import './layout.css';

export default ({ children, headerTitle }) => (
  <>
    <Header title={headerTitle} />
    <div
      style={{ display: 'flex', flexDirection: 'column', margin: '2rem 5rem' }}>
      {children}
    </div>
  </>
);
