import React from 'react';

import Header from '../Header';
import './layout.css';

export default ({ children }) => (
  <>
    <Header />
    <div
      style={{ display: 'flex', flexDirection: 'column', margin: '2rem 5rem' }}>
      {children}
    </div>
  </>
);
