import React from 'react';

function Avatar(props) {
  const { src, alt, size } = props;

  return (
    <img
      src={src}
      alt={alt}
      style={{
        borderRadius: '50%',
        width: size,
        height: size,
      }}
    />
  );
}

export default Avatar;
