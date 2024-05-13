import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SmartOtpPin } from "./SmartFormInterface";
import { validateInput } from "../../../services/smartValidationService";

const SmartOtp: React.FC<SmartOtpPin> = (props) => {
  const {    
    digits,
    onChange,
    label,
    isRequired = false,
    className = "",
    resendOtpFunction,
    otpTimerValue=120,
    errorEnable=false,
    errorUpdate,
    validations
  } = props;
  const [error, setError] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(digits).fill(""));
  const [timer, setTimer] = useState<number>(otpTimerValue);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>(Array(digits).fill(null));

  useEffect(() => {   
    const newOtp = [...otp]; 
    //console.log(" reloaded the component " , validations);
    handleChangeLoad(newOtp.join(""))
}, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value !== "" && index < 5 && refs.current[index + 1]) {
      refs.current[index + 1]?.focus();
    }
    handleChangeLoad(newOtp.join(""))
  };

  const handleChangeLoad=(inputValue:any)=>{
    // perform the validations and update the error
    if(validations && validations.length>0){
       // console.log("entered in this " , validations);
        let error_message = validateInput(inputValue,validations);
       // console.log(" error ",error_message);
        setError(error_message);
        if(errorUpdate){
            errorUpdate(error_message);
        }
    }
    if(onChange && onChange instanceof Function){
        onChange(inputValue);
      }
          
}

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      refs.current[index - 1]?.focus();
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(120);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerRef.current!);
          setIsTimerRunning(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    // Simulate sending OTP, here you can perform actual OTP sending logic
    //console.log("OTP sent");
    if (resendOtpFunction && resendOtpFunction instanceof Function) {
      resendOtpFunction(() => {
        startTimer();
      });
    }
  };

  useEffect(() => {
    startTimer();
  }, []);

  const otpDisplay = () => {
    return (
      <div className="smart-otp-box">
        {otp.map((digit, index) => (
          <input
            className="input"
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            ref={(el) => (refs.current[index] = el)}
          />
        ))}
      </div>
    );
  };
  const labelDisplay = () => {
    if (label) {
      return (
        <label className="label">
          {label}
          {isRequired && <span className="smart-required-field">*</span>}
        </label>
      );
    }
  };

  const resendOtp = () => {
    return (
      <div className="smart-otp-button">
        <button
          className="button is-small"
          onClick={handleSendOtp}
          disabled={isTimerRunning}
        >
          {isTimerRunning ? `Resend OTP in ${timer} seconds` : "Send OTP"}
        </button>
      </div>
    );
  };

  const classList: any[string] = ["smart-otp-field"];
  if (className.length > 1) {
    classList.push(className);
  }

  const errorMessageDisplay = () => {
    return errorEnable && error && error.length > 0 && <p className="help is-danger">{error}</p>
}


  return (
    <div className={classList.join(" ")}>
      {labelDisplay()}
      {otpDisplay()}
      {errorMessageDisplay()}
      {resendOtp()}
    </div>
  );
};
export default SmartOtp;
