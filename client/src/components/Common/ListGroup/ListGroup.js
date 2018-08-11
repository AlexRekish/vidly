import React from 'react';

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <ul className='list-group'>
    {
      items.map(item => {
        const classes = item === selectedItem ? 'list-group-item active' : 'list-group-item';
        return (
          <li
            className={classes}
            key={item._id}
            onClick={() => onItemSelect(item)}
            style={{ cursor: 'pointer'}}
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
