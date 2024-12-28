import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav style={{ padding: '10px', background: '#f5f5f5' }}>
      <h1>AI BG Removal App</h1>
      {user && <UserButton />}
    </nav>
  );
};

export default Navbar;
