import React, { useEffect, useState } from "react";
import SmartInput from "../../components/core/forms/SmartInput";
import {
  ALLOW_FLOAT,
  ALLOW_FLOAT_DYNAMIC,
  ALLOW_NUMERIC,
} from "../../services/PatternSerivce";
import SmartButton from "../../components/core/forms/SmartButton";
import { isEmptyObject } from "../../services/core/CommonService";
import { SmartSoftInput } from "soft_digi";
import SmartForm from "../../components/core/forms/SmartForm";
import {
  SmartValid,
  validateForm,
} from "../../services/smartValidationService";
import SmartMobileNumber from "../../components/core/forms/SmartMobileNumber";

const SmartFormExample = () => {
  const [formData, setFormData] = useState({text_one:"ffsdfsdf"});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [type, setType] = useState("password");

  const handleInputChange = (name, value) => {
    //console.log(" name " ,name , "   value " , value)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleErrorChange = (name, value) => {
    setFormErrors((prev) => {
      // Create a copy of the previous state
      const updatedFormData = { ...prev };
      // Check if the value is null or empty
      if (value === null || value === "") {
        // If true, remove the property from the updated state
        delete updatedFormData[name];
      } else {
        // Otherwise, update or add the property in the updated state
        updatedFormData[name] = value;
      }

      return updatedFormData;
    });
  };

  const numericValidations = [
    {
      type: "required",
      msg: "Numeric Value is Required",
    },
    {
      type: "pattern",
      msg: "Please Enter Correct Numeric Value",
      pattern: "[0-9]+",
    },
  ];

  const formValidations = {
    input_two: {
      validations: [SmartValid.required("form field -1 is required")],
      condition: (data) => {
        return formData?.input_one == "2" ? true : false;
      },
    },
    input_one: [SmartValid.required("form field -2 is required")],
  };

  const handleFormSubmit = () => {
  //  console.log("formdata", formData);
   // let validation_output = validateForm(formData, formValidations);
    //console.log("validation output ", validation_output);
    console.log("form errors ", formErrors);
    setFormSubmit(true);
   
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const formElements = [
    /*
    {
      type: "TEXT_BOX",
      width: "3",
      name: "input_one",
      element: {
        label: "Enter Name",
        validations: formValidations.input_one,
      },
    },
    {
      type: "TEXTAREA",
      width: "12",
      name: "text_one",
      element: {
        label: "Enter Name",
        validations: formValidations.input_one,
      },
    },
    {
      type: "TEXT_BOX",
      width: "3",
      name: "input_two",
      element: {
        label: "Enter ID",
        validations: formValidations.input_two.validations,
      },
      hideFunction: (value) => {
        return formData?.input_one == "2" ? true : false;
      },
    },
    {
      type: "SELECT_BOX",
      width: "3",
      name: "select_one",
      element: {
        label: "Select Role",
        options: options,
      },
    },*/
    {
      type: "MOBILE",
      width: "3",
      name: "mobile_one",
      codeName: "country_code",
      element: {
        label: "Select Role",
        //ptions: options,
         codeSelected: formData?.country_code,
        countries: ["AU", "IN"],
        placeHolder: "Mobile Number",
        rightIcon: "fa-mobile",

      },
    },
  ];

  const inputWithIconValidation = () => {
    return (
      <div className="card">
        <SmartForm
          formData={formData}
          setFormData={handleInputChange}
          elements={formElements}
          formSubmit={formSubmit}
          handleErrorChange={handleErrorChange}
          
        />

<SmartMobileNumber
          key="text-2-mobile"
          label="email validation"
          value={formData?.input_two || ""}
          onChange={(value) => handleInputChange("input_two", value)}
        //  inputType="BORDER_LESS"
         // validations={[ SmartValid.required("required")]}
          errorEnable={true}
          countries={["IN","AU"]}
          onCodeChange={(value) => handleInputChange("country_code", value)}
          codeSelected={formData?.country_code || ""}
          disablePaste={true}
         // inputProps={{ disabled: true }}
        />

        <SmartButton
          label="submit"
          classList={["is-primary", "is-small", "is-inverted"]}
          onClick={() => handleFormSubmit()}
         // disabled={!isEmptyObject(formErrors)}
        />
      </div>
    );
  };

  return <>{inputWithIconValidation()}</>;
};

export default SmartFormExample;
