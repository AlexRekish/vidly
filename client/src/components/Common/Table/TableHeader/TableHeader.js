import React from 'react';

const TableHeader = ({ sortColumn, onSort, columns }) => {
  const switchSortOrder = (path) => {
    const newSortColumn = { ...sortColumn
    };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      newSortColumn.path = path;
      newSortColumn.order = 'asc';
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"/>
    return <i className="fa fa-sort-desc"/>
  }
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className='clickable'
            tabIndex='0'
            onClick={() => switchSortOrder(column.path)}
            key={column.path || column.key}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
        </tr>
      </thead>
    );
}

export default TableHeader;
