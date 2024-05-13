import React, { useEffect, useState } from "react";
import {
  SmartValid,
  validateInput,
} from "../../../services/smartValidationService";
import { SmartInputProps } from "./SmartFormInterface";
import SmartInput from "./SmartInput";
import ReactFlagsSelect from "react-flags-select";

const SmartMobileNumber: React.FC<SmartInputProps> = (props) => {
  const {
    label,
    countries,
    onChange,
    onCodeChange,
    codeSelected,
    validations,
    inputProps,
    value,
    ...rest
  } = props;
  //const [selected, setSelected] = useState("AU");
  console.log("props " , props);
  const codeSelection = (code: string) => {
    //setSelected(code);
    if (onCodeChange) {
      onCodeChange(code);
      onChange("")
    }
  };
  const required_country = {
    AU: "+61",
    IN: "+91",
  };
  const display_countries = () => {
    if (!countries) return Object.keys(required_country);
    if (countries) return countries;
  };

  const maximumLengthAllowed = () => {
    switch (codeSelected) {
      case "AU":
        return 9;
      default:
        return 10;
    }
  };

  const mobileValidations = () => {
    let valid = validations || [];
    switch (codeSelected) {
      case "AU":
        valid.push(SmartValid.maxLength("Mobile Number Should Be 9 Digit", 9));
        valid.push(SmartValid.minLength("Mobile Number Should Be 9 Digit", 9));
        break;
      default:
        valid.push(SmartValid.maxLength("Mobile Number Should Be 10 Digit", 10));
        valid.push(SmartValid.minLength("Mobile Number Should Be 10 Digit", 10));
        break;       
    }
  //  console.log("final validatins ", valid);
    return valid;
  };

  return (
    <div className="columns is-gap-less">
      <div className="column is-3">
        <ReactFlagsSelect
          countries={display_countries()}
          customLabels={required_country}
          selected={codeSelected || ""}
          onSelect={(code) => codeSelection(code)}
          placeholder="Code"
          disabled={inputProps?.disabled}
        />
      </div>
      <div className="column is-9">
        <SmartInput
          {...rest}         
          onChange={onChange}
          inputProps={inputProps}
          max={maximumLengthAllowed()}
          pattern={"[0-9]+"}
          validations={mobileValidations()}
          value={value||""}
        />
      </div>
    </div>
  );
};
export default SmartMobileNumber;
