import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { validateInput } from "../../../services/smartValidationService";
import "./SmartFormCss.css";
import { SmartCheckRadioProps } from "./SmartFormInterface";

const SmartCheckRadio: React.FC<SmartCheckRadioProps> = (props) => {
  const {
    name,
    label,
    value,
    valueFunction,
    onChange,
    type,
    classList,
    isHorizontal,
    inputProps,
    successMessage,
    validations,
    errorEnable = false,
    errorUpdate,
    isMulti = false,
    options, 
    optionsVertical=false,   
    isRight = false  ,
    switchMode=false,
    isRequired=false
  } = props;

  const [error, setError] = useState("");


  // useEffect will be triggered whenever prop changes
  useEffect(() => {
   
  }, [props]);

  const getValue = () => {
    if (valueFunction) {
      return valueFunction();
    } else {
      return value;
    }
  };

  const removeElementFromArray = (array:any, elementToRemove:string) => {
    const index = array.indexOf(elementToRemove);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
};


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let actualValue = getValue();
    if(!Array.isArray(actualValue)){
        actualValue = [];
    }
    if(isMulti){
        if(type && type=="radio"){
           // console.log("event ", event , " checked " , event.target.checked)
            let in_value = event.target.checked ? event.target.value : "";
            handleChange(in_value);
        }else{
            if(event.target.checked){
                actualValue.push(event.target.value)
             }else{
                actualValue = removeElementFromArray(actualValue,event.target.value)
             }
             handleChange(actualValue);
        }         
    }else{
    const inputValue = event.target.checked ? event.target.value : "";
     // console.log("check event" , inputValue , " event " , event);
      handleChange(inputValue);
    }
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
    let classList = ["control smart-check-radio"];  
    if(optionsVertical){
        classList.push("smart-check-vertical")
    } 
    return classList;
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
    return classes;
  };

  const inputClasses = () => {
    let classes = ["is-checkradio"];  
    if(switchMode){
        classes = ["switch"]
    }
    if(isRight){
        classes.push("is-rtl")
    }
    if(inputProps?.className){
        classes.push(inputProps?.className)
    }
    if(inputProps?.size){
        classes.push("is-"+inputProps.size)
    }
    if(inputProps?.borderLess){
        classes.push("has-no-border")
    }
    if(inputProps?.background){
        classes.push("has-background-color")
    }

    if(inputProps?.isRounded){
        classes.push("is-rounded")
    }

    if(inputProps?.isThin){
        classes.push("is-thin")
    }
    if(inputProps?.isOutlined){
        classes.push("is-outlined")
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

 


  const singleCheckBoxDisplay=(filedName:string,option:any,index:number,currentValue:any)=>{
   // console.log("option  " , option ,"  currentValue " , currentValue);
    return (
        <>
        <input
          className={inputClasses().join(" ")}
          id={filedName+"_id"}
          type={type ? type :"checkbox"}
          name={filedName}
          value={option.value}
          checked={currentValue === option.value}
          onChange={handleInputChange}
          key={"input_"+index}
          disabled={disabled_input()}
        />
        <label key={"label_"+index} htmlFor={filedName+"_id"}>{option.label}</label>
        </>
    )
  }

  const singleCheckBox = () => {
    const option = options[0]!==undefined ?  options[0] : {value:1,label:"test"};
    return <div className="field">{ singleCheckBoxDisplay(name,option,1,getValue()) }</div>
  };

 

  const multiCheckBox = () => {
    let currentValue = getValue();
    return options.map((item:any,index:number)=>{
        let name_check = name + "_" + index;
        let value = "";
        if(type && type=="radio"){
          value = currentValue==item.value ? item.value : "";
        }else{
            value = Array.isArray(currentValue) && currentValue.includes(item.value) ? item.value : "";
        }
       
        return <div className="field" key={index}>{singleCheckBoxDisplay(name_check,item,index,value)} </div>
    })
  };

  return (
    <div className={fieldClasses().join(" ")}>
      {labelDisplay()}
      <div className={controlClasses().join(" ")}>      
          {isMulti ? multiCheckBox() : singleCheckBox()}       
      </div>
      {successMessageDisplay()}
      {errorMessageDisplay()}
    </div>
  );
};

export default SmartCheckRadio;

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
