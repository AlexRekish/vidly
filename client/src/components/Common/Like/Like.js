import React from 'react';

const like = ({ liked, onLike }) => {
  const heartCode = liked ? 'fa fa-heart clickable' : 'fa fa-heart-o clickable';
  return (
      <i
        className={heartCode}
        onClick={onLike}
      ></i>
   );
}

export default like;
