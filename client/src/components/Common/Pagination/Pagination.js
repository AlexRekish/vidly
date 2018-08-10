import React from 'react';

const pagination = (props) => {
  const { itemCount, pageSize, onPageChanged } = props;
  const itemCounts = Math.ceil(itemCount / pageSize);
  if (itemCounts === 1) return null;
  const pages = new Array(itemCounts).fill().map((page, index) => index + 1);
  return (
      <ul className="pagination">
        { pages.map(page => (
          <li
            className="page-item"
            key={page}
            onClick={onPageChanged}
          >
            <a className="page-link" href="#">{page}</a>
          </li>
        ))}
    </ul>
  );
}

export default pagination;
