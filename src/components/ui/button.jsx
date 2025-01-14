import React from 'react';

const Button = ({ children, className = '', onClick, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center transition-all duration-200 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
