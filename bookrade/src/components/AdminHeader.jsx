import React from 'react';

const AdminHeader = () => {
  return (
    <div className="bg-white flex justify-between items-center p-4 ring-2 ring-gray-900/5" style={{ width: '100%', height: '60px' }}>
      <p className='float-right text-3xl font-semibold'>
        Hello, Admin
    </p>
    </div>
  );
}

export default AdminHeader;
