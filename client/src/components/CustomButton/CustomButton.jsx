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
  const getVariantClass = () => {
    if (variant === "primary") return "btn-blue";
    if (variant === "secondary") return "btn-red";
    if (variant === "outline") return "btn-outline-blue";
    return "btn-blue";
  };

  return (
    <Button
      type={type}
      className={`custom-btn ${getVariantClass()} ${className}`}
      disabled={isLoading}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
