import React, { useEffect, useState } from "react";
import { validateInput } from "../../../services/smartValidationService";
import { SmartInputProps } from "./SmartFormInterface";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

const SmartImageCropper: React.FC<SmartInputProps> = (props) => {
  const {
    label,
    value,
    valueFunction,
    onChange,
    type,
    min,
    max,
    pattern,
    patternFunction,
    classList,
    isHorizontal,
    inputProps,
    leftIcon,
    leftIconFunction,
    rightIcon,
    rightIconFunction,
    successMessage,
    onBlur,
    validations,
    errorEnable = false,
    errorUpdate,
    placeHolder,
    inputType = "NORMAL",
  } = props;

  const [error, setError] = useState("");
  // const [hasValue, setHasValue] = useState(false);

  // useEffect will be triggered whenever prop changes
  useEffect(() => {
    //
  }, [props]);
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<PixelCrop>()
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSrc(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }


 

  const getValue = () => {
    if (valueFunction) {
      return valueFunction();
    } else {
      return value;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // this is added to handle the expty input repalcement
    if (!inputValue) {
      handleChange(inputValue);
    }
    if (type === "number") {
      const numericValue = parseFloat(inputValue);
      // console.log("value " , numericValue, " min =" , min ," max =" , max);
      if (
        !isNaN(numericValue) &&
        (min === undefined || numericValue >= min) &&
        (max === undefined || numericValue <= max)
      ) {
        handleChange(inputValue);
      }
    } else if (pattern) {
      const lengthValue = inputValue.length;
      if (
        new RegExp(`^${pattern}$`).test(inputValue) &&
        (min === undefined || lengthValue >= min) &&
        (max === undefined || lengthValue <= max)
      ) {
        handleChange(inputValue);
      }
    } else if (patternFunction) {
      const lengthValue = inputValue.length;
      if (
        patternFunction(inputValue) &&
        (min === undefined || lengthValue >= min) &&
        (max === undefined || lengthValue <= max)
      ) {
        handleChange(inputValue);
      }
    } else {
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
    onChange(inputValue);
  };

  /**
   *  on blur handle
   */
  const handleBlur = () => {
    if (onBlur) {
      onBlur(getValue());
    }
  };
  /**
   *  label display function
   *
   * @returns
   */
  const labelDisplay = () => {
    if (label) {
      return <label className="label">{label}</label>;
    }
  };

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
          {" "}
          <i className={"fa " + leftIcon} />{" "}
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
          {" "}
          <i className={"fa " + rightIcon} />{" "}
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

  return (
    <div className={fieldClasses().join(" ")}>
      {inputType === "NORMAL" && labelDisplay()}
      <div className={controlClasses().join(" ")}>
        <div>
          <input type="file" onChange={handleFileChange} />
          {src && (
            <ReactCrop crop={crop} aspect={16 / 9}  
            onComplete={(c) => {console.log("cropped image ", croppedImage); setCroppedImage(c)}}
            onChange={(_, percentCrop) => setCrop(percentCrop)}>
              <img src={src} onLoad={onImageLoad} />
          </ReactCrop>
          )}
        
        </div>
      </div>
      {successMessageDisplay()}
      {errorMessageDisplay()}
    </div>
  );
};

export default SmartImageCropper;
