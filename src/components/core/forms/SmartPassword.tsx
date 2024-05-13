import React, { useEffect, useState } from "react";
import { validateInput } from "../../../services/smartValidationService";
import { SmartInputProps } from "./SmartFormInterface";
import SmartInput from "./SmartInput";

const SmartPassword: React.FC<SmartInputProps> = (props) => {
  const {   
    label,
    value,
    passwordValidator,
    onChange,
    // type,
    rightIcon,
    rightIconFunction,
    ...rest
  } = props;

  const [type, setType] = useState(true);
  const [strength, setStrength] = useState(0);

  const calculateStrength = (password: string) => {
    let score = 0;
    if (!password) {
      setStrength(0);
      return;
    }
    if (password.length > 3) {
      score += 1;
    }
    if (password.length > 6) {
      score += 1;
    }
    // Add points for uppercase letters
    if (/[A-Z]/.test(password)) {
      score += 1;
    }
    // Add points for lowercase letters
    if (/[a-z]/.test(password)) {
      score += 1;
    }
    // Add points for numbers
    if (/\d/.test(password)) {
      score += 1;
    }
    // Add points for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }
    //console.log("score = " , score);
    setStrength(score);
  };

  const handleChange = (value: string) => {
    if (passwordValidator) {
      calculateStrength(value);
    }
    if(onChange)
        onChange(value);
  };

  const password_show = () => {
    setType(!type);
  };

  const rightIconFunctionPassword = () => {
    return (
      <span
        className="icon is-small is-right smart-password-icon smart-soft-cursor"
        onClick={password_show}
      >
        <i className={"fa " + (type ? "fa-eye-slash" : "fa-eye")}></i>
      </span>
    );
  };

  const display_text = () => {
    return (
      value &&
      value.length > 0 && (
        <span
          className={`progress-text ${
            strength < 4
              ? "has-text-danger"
              : strength < 6
              ? "has-text-warning"
              : "has-text-success"
          }`}
        >
          {strength < 4 ? "Week" : strength < 6 ? "Average" : "Strong"}
        </span>
      )
    );
  };

  return (
    <div className="mb-3 smart-password-field">
      <SmartInput
        {...rest}
        key="text-4"
        value={value || ""}
        onChange={(value) => handleChange(value)}
        rightIcon=""
        type={type ? "password" : "text"}
        rightIconFunction={rightIconFunctionPassword}
        
      />
      {passwordValidator && display_text()}
      {passwordValidator && value && value.length > 0 && (
        <progress
          className={`progress ${
            strength < 4
              ? "is-danger"
              : strength < 6
              ? "is-warning"
              : "is-success"
          }`}
          value={strength}
          max="6"
        >
          {strength}0%
        </progress>
      )}
    </div>
  );
};
export default SmartPassword;
