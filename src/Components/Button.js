import React from "react";
import BsButton from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Button({ name, text, variant, className, link, onClick }) {
  return (
    <>
      <Link to={link}>
        <BsButton
          name={name}
          variant={variant}
          className={className}
          onClick={onClick}
        >
          {text}
        </BsButton>
      </Link>
    </>
  );
}
export default Button;
