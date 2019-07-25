import React from 'react';
import { Link } from 'gatsby';

export default ({ title }) => (
  <header
    style={{
      margin: '0',
      padding: '3rem',
      backgroundColor: '#0678BE',
      color: '#F6F6F2'
    }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>{title || 'Gatsby Theme Drupal'}</h1>
      {title && <Link to="/">🏠</Link>}
    </div>
  </header>
);
