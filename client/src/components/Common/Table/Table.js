import React from 'react';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';

const table = ({ columns, onSort, sortColumn, data }) => {
  return (
    <table className='table'>
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody
        data={data}
        columns={columns}
      />
    </table>
   );
}

export default table;
