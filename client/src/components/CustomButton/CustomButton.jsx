import React from "react";
import { Button } from "react-bootstrap";
import "./CustomButton.css";

const CustomButton = ({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={`custom-btn ${variant === "primary" ? "btn-blue" : "btn-red"} ${className}`}
      disabled={isLoading}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
