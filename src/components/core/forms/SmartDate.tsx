import React, { useEffect, useState } from "react";
import { validateInput } from "../../../services/smartValidationService";
import { SmartDateProps } from "./SmartFormInterface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getDay} from 'date-fns'
import moment from 'moment-timezone';

const SmartDate: React.FC<SmartDateProps> = (props) => {
  const {
    label,
    value,
    valueFunction,
    onChange,
    classList,
    isHorizontal,
    inputProps,
    leftIcon,
    leftIconFunction,
    rightIcon="fa-calendar",
    rightIconFunction,
    successMessage,
    validations,
    errorEnable = false,
    errorUpdate,
    placeHolder,
    inputType = "NORMAL",
    dateFormat="dd-MM-yyy",
    showMonthYearPicker=false,
    excludeDates,
    includeDates,
    holidays,
    weekDaysOnly=false,
    minDate,
    maxDate,
    showYearDropdown=false,
    dateProps,
    readOnly=false,
    showTimeSelect=false,
    showTimeSelectOnly=false,
    timeIntervals,
    timeCaption,
    dropdownMode,
    showMonthDropdown=false,
    isRequired=false,
    timeZone="Asia/Kolkata"

  } = props;

  const [error, setError] = useState("");
  // const [hasValue, setHasValue] = useState(false);

  // useEffect will be triggered whenever prop changes
  useEffect(() => {
    //
  }, [props]);

  useEffect(() => {    
    //console.log(" reloaded the component " , validations);
    handleChange(getValue());
}, []);

  const getValue = () => {
    if (valueFunction) {
      return valueFunction();
    } else {
      return value;
    }
  };

  const changeTimeZone=(inputValue:any)=>{
    if(inputValue instanceof String){
      const selectedDateInUTC = moment.utc(inputValue + ""); // Assume the date is already in UTC
      //const timeZone = timeZone; // Kolkata timezone
      const selectedDateInTimeZone = selectedDateInUTC.tz(timeZone);
      const dateAlone = selectedDateInTimeZone.format(dateFormat);
      return dateAlone;
    }
    return inputValue;  
  }

  const handleInputChange = (inputValue: any) => {
    //const inputValue = e.target.value;
    handleChange(changeTimeZone(inputValue));
  };

  const handleChange = (inputValue: any) => {
    // perform the validations and update the error
    if (validations && validations.length > 0) {
      // console.log("entered in this " , validations);
      let error_message = validateInput(inputValue, validations);
      setError(error_message);
      if (errorUpdate) {
        errorUpdate(error_message);
      }
    }
    if(onChange && onChange instanceof Function){
      onChange(inputValue);
    }
        
  };

  /**
   *  label display function
   *
   * @returns
   */
  const labelDisplay = () => {
    if (label) {
        return (
        <label className="label">
            {label}
            {isRequired && <span className='smart-required-field'>*</span>}
        </label>
        )
    }
}

  const controlClasses = () => {
    let classList = ["control"];
    if (leftIcon || leftIconFunction) {
      classList.push("has-icons-left");
    }
    if (rightIcon || rightIconFunction) {
      classList.push("has-icons-right");
    }
    if (inputProps && inputProps.isLoading) {
      classList.push("is-loading");
    }
    if (value) {
      classList.push("smart-input-has-value");
    }
    return classList;
  };

  const leftIconDisplay = () => {
    if (leftIcon) {
      return (
        <span className="icon is-small is-left">         
          <i className={"fa " + leftIcon} />
        </span>
      );
    } else if (leftIconFunction) {
      return leftIconFunction(value);
    }
  };

  const rightIconDisplay = () => {
    if (rightIcon) {
      return (
        <span className="icon is-small is-right">         
          <i className={"fa " + rightIcon} />
        </span>
      );
    } else if (rightIconFunction) {
      return rightIconFunction(value);
    }
  };

  const successMessageDisplay = () => {
    return (
      successMessage && <p className="help is-success">{successMessage}</p>
    );
  };

  const fieldClasses = () => {
    let classes = ["field"];
    if (isHorizontal) {
      classes.push("is-horizontal");
    }
    if (classList) {
      classes = [...classes, ...classList];
    }
    if (inputType) {
      if (inputType == "BORDER_LESS") {
        classes.push("smart-border-less-input");
      } else if (inputType == "BORDER_LABEL") {
        classes.push("smart-border-label-input");
      } else if (inputType == "BORDER_LABEL_FOCUS") {
        classes.push("smart-border-label-focus-input");
      }
    }
    return classes;
  };

  const inputClasses = () => {
    let classes = ["input"];
    if (inputProps && inputProps.isStatic) {
      classes.push("is-static");
    }
    if (inputProps && inputProps.isFocussed) {
      classes.push("is-focused");
    }
    if (errorEnable && error && error.length > 0) {
      classes.push("is-danger");
    }
    const value_input = getValue();
    // check if validations are there and
    if (
      value_input &&
      value_input.length > 0 &&
      validations &&
      validations.length > 0
    ) {
      if (!error) {
        classes.push("is-success");
      }
    }
    return classes;
  };

  const disabled_input = () => {
    //  console.log("disabled input " );
    if (inputProps && inputProps.disabled) {
      return inputProps.disabled;
    }
    if (inputProps && inputProps.disabledFunction) {
      // console.log("disabled or not ", inputProps.disabledFunction("test"))
      return inputProps.disabledFunction("test");
    }

    return false;
  };

  const errorMessageDisplay = () => {
    return (
      errorEnable &&
      error &&
      error.length > 0 && <p className="help is-danger">{error}</p>
    );
  };

  const isWeekday = (date:any) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const otherProps=()=>{
    let other_props:any = {};
    if(excludeDates){
      other_props["excludeDates"] = excludeDates;
    }
    if(includeDates){
      other_props["excludeDates"] = includeDates;
    }
    if(includeDates){
      other_props["holidays"] = holidays;
    }
    if(minDate){
      other_props["minDate"] = minDate;
    }
    if(maxDate){
      other_props["maxDate"] = maxDate;
    }
    if(weekDaysOnly){
      other_props["filterDate"] =isWeekday
    }
    // time select
    if(showTimeSelect){
      other_props["showTimeSelect"] =true;
    }
    if(showTimeSelectOnly){
      other_props["showTimeSelectOnly"] =true;
    }
    if(timeIntervals){
      other_props["timeIntervals"] = timeIntervals;
    }
    if(timeCaption){
      other_props["timeCaption"] = timeCaption;
    }
    if(dropdownMode){
      other_props["dropdownMode"] = "select"
    }
    
    if(dateProps){
      other_props = {...other_props,...dateProps}
    }
    return other_props;
  }

  return (
    <div className={fieldClasses().join(" ")}>
      {inputType === "NORMAL" && labelDisplay()}
      <div className={controlClasses().join(" ")}>
        <DatePicker
          selected={getValue()}
          onChange={(date) => handleInputChange(date)}
          className={inputClasses().join(" ")} // Use Bulma input style        
          placeholderText={placeHolder} // Placeholder text for the input field
          dateFormat={dateFormat}
          disabled={disabled_input()}
          showMonthYearPicker={showMonthYearPicker}
          showYearDropdown={showYearDropdown}
          showMonthDropdown={showMonthDropdown}
          {...otherProps()}
          readOnly={readOnly}
          //filterDate={isWeekday}
        />        
        {inputType !== "NORMAL" && labelDisplay()}
        {leftIconDisplay()}
        {rightIconDisplay()}
      </div>
      {successMessageDisplay()}
      {errorMessageDisplay()}
    </div>
  );
};

export default SmartDate;
