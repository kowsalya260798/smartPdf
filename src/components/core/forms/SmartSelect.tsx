import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { validateInput } from "../../../services/smartValidationService";
import "./SmartFormCss.css";
import { SmartSelectProps } from "./SmartFormInterface";

const SmartSelect: React.FC<SmartSelectProps> = (props) => {
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
    rightIcon,
    rightIconFunction,
    successMessage,
    validations,
    errorEnable = false,
    errorUpdate,
    isMulti = false,
    options,
    placeHolder,
    isClearable = false,
    loadMoreOptionsFunction,
    loadOptionsFunction,
    isAsync = false,
    inputType="NORMAL",
    isRequired=false
  } = props;

  const [error, setError] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect will be triggered whenever prop changes
  useEffect(() => {
    setSelectOptions(options);
  }, [props]);

  useEffect(() => {        
    handleChange(getValue());
}, []);

  const getValue = () => {
    if (valueFunction) {
      return valueFunction();
    } else {
      return value;
    }
  };

  const handleInputChange = (value: any) => {
    const inputValue = value;
    handleChange(inputValue);
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
    return classList;
  };

  const leftIconDisplay = () => {
    if (leftIcon) {
      return (
        <div className="icon is-small is-left">
          {" "}
          <i className={"fa " + leftIcon} />{" "}
        </div>
      );
    } else if (leftIconFunction) {
      return leftIconFunction(value);
    }
  };

  const rightIconDisplay = () => {
    if (rightIcon) {
      return (
        <div className="icon is-small is-left">
          {" "}
          <i className={"fa " + rightIcon} />{" "}
        </div>
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
    if(inputType){
      if(inputType=="BORDER_LESS"){
          classes.push("smart-border-less-input")
      }else if(inputType=="BORDER_LABEL"){
          classes.push("smart-border-label-select")
      }else if(inputType=="BORDER_LABEL_FOCUS"){
          classes.push("smart-border-label-focus-input")
      }
  }
    return classes;
  };

  const inputClasses = () => {
    let classes = ["smart-select-input"];
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

  const loadMoreOptions = async () => {
    // Fetch more options when user scrolls or clicks on a "Load More" button
    setIsLoading(true);
    try {
      if (loadMoreOptionsFunction) {
        loadMoreOptionsFunction(setSelectOptions);
      }
      // const response = await axios.get(`https://api.example.com/more-options`);
      // setOptions(prevOptions => [...prevOptions, ...response.data]);
    } catch (error) {
      console.error("Error fetching more options:", error);
    }
    setIsLoading(false);
  };

  const otherSelectOptions = () => {
    let otherOptions: any = {};
    if (loadMoreOptionsFunction) {
      otherOptions["onMenuScrollToBottom"] = loadMoreOptions;
    }
    return otherOptions;
  };

  const normalSelect = () => {
    return (
      <Select
        isMulti={isMulti}
        options={selectOptions}
        onChange={handleInputChange}
        className={inputClasses().join(" ")}
        value={getValue()}
        isDisabled={disabled_input()}
        placeholder={placeHolder}
        isLoading={isLoading}
        isClearable={isClearable}
        {...otherSelectOptions()}
      />
    );
  };

  const loadOptions = async (inputValue: any, callback: any) => {
    if(loadOptionsFunction)
        loadOptionsFunction(inputValue, callback);
    // Invoke callback with loaded options
    //  callback(options);
  };

  const asyncSelect = () => {
    return (
      <AsyncSelect
        isMulti={isMulti}
        loadOptions={loadOptions}
        onChange={handleInputChange}
        className={inputClasses().join(" ")}
        value={getValue()}
        isDisabled={disabled_input()}
        placeholder={placeHolder}
        isLoading={isLoading}
        isClearable={isClearable}
        {...otherSelectOptions()}
      />
    );
  };

  return (
    <div className={fieldClasses().join(" ")}>
      {labelDisplay()}
      <div className={controlClasses().join(" ")}>
        <div className="smart-select">
          {isAsync ? asyncSelect() : normalSelect()}
        </div>
        {leftIconDisplay()}
        {rightIconDisplay()}
      </div>
      {successMessageDisplay()}
      {errorMessageDisplay()}
    </div>
  );
};

export default SmartSelect;

/*
     <input
                        className={inputClasses().join(" ")}
                        type={type || 'text'}
                        placeholder="Text input"
                        value={getValue()}
                        onChange={handleInputChange}
                        min={min}
                        max={max}
                        pattern={pattern}
                        disabled={disabled_input()}
                        onBlur={handleBlur}
                    />
*/
