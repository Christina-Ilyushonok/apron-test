import React from 'react';
import Layout from '../Layout';
import { UsersTable } from '../components/UserTable';

const UsersPage = () => {
  return (
    <Layout header={'Users'}>
      <UsersTable />
    </Layout>
  );
}

export default UsersPage;
