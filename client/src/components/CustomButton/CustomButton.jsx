import React from "react";
import { Button, Spinner } from "react-bootstrap";
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
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="ms-2">Loading...</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
