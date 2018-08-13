import React from 'react';

const Like = ({ liked, onLike }) => {
  const heartCode = liked ? 'fa fa-heart clickable' : 'fa fa-heart-o clickable';
  return (
      <i
        className={heartCode}
        onClick={onLike}
      ></i>
   );
}

export default Like;
