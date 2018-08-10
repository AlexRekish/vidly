import React from 'react';
import PropTypes from 'prop-types';

const pagination = (props) => {
  const { itemCount, pageSize, onPageChanged, currentPage } = props;
  const itemCounts = Math.ceil(itemCount / pageSize);
  if (itemCounts === 1) return null;
  const pages = new Array(itemCounts).fill().map((page, index) => index + 1);
  return (
      <ul className="pagination">
        { pages.map(page => (
          <li
            className={ page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
            onClick={() => onPageChanged(page)}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
    </ul>
  );
}

pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  currentPage:PropTypes.number.isRequired,
}

export default pagination;
