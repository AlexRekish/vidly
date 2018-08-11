import React from 'react';

const ListGroup = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className='list-group'>
    {
      items.map(item => {
        const classes = item === selectedItem ? 'list-group-item active clickable' : 'list-group-item clickable';
        return (
          <li
            className={classes}
            key={item._id}
            onClick={() => onItemSelect(item)}
            tabIndex='0'
          >
            {item.name}
          </li>);
      })
    }
    </ul>
   );
}

export default ListGroup;
