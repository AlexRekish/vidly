import React from 'react';

const like = (props) => {
  const heartCode = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
      <i
        className={heartCode}
        onClick={props.onLike}
        style={{cursor: "pointer"}}
      ></i>
   );
}

export default like;
