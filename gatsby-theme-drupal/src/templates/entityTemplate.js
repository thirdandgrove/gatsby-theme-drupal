import React from 'react';

import Layout from '../components/Layout';

export default element => (
  <Layout>
    <div>{JSON.stringify(element)}</div>
  </Layout>
);
