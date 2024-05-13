import React, { useEffect, useState } from "react";
import SmartSelect from "../../components/core/forms/SmartSelect";
import {
  ALLOW_FLOAT,
  ALLOW_FLOAT_DYNAMIC,
  ALLOW_NUMERIC,
} from "../../services/PatternSerivce";
import SmartButton from "../../components/core/forms/SmartButton";
import { isEmptyObject } from "../../services/core/CommonService";
import SmartCheckRadio from "../../components/core/forms/SmartCheckRadio";

const TextBoxExample = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [type, setType] = useState("password");

  const handleInputChange = (name, value) => {
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

  const onBlur = (value) => {
    const timeoutId = setTimeout(() => {
      // Update the value using the previous state
      handleInputChange("input_three", 30);
    }, 2000);
    // Clean up the timeout when the component unmounts or when the value is updated
    return () => clearTimeout(timeoutId);
  };

  const numericValidations = [
    {
      type: "required",
      msg: "Numeric Value is Required",
    },
  ];

  const handleFormSubmit = () => {
    console.log(" form data ", formData);
    setFormSubmit(true);
    console.log("form errors ", formErrors);
  };

  const passwordRightIcon = (value) => {
    const updateText = () => {
      console.log("type updatioen clicked");
      setType("text");
    };
    return (
      <span onClick={() => updateText()} className="icon is-small is-right">
        {" "}
        <i className="fa fa-lock"></i>{" "}
      </span>
    );
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const inputWithIconValidation = () => {
    return (
      <div className="card">
        <SmartSelect
          key="text-1"
          label="test"
          options={options}
          value={formData?.input_one || ""}
          onChange={(value) => handleInputChange("input_one", value)}
          leftIcon="fa-user"
          rightIconFunction={() => passwordRightIcon()}
          validations={numericValidations}
          errorEnable={true}
          errorUpdate={(error) => handleErrorChange("input_one", error)}
        />

      <SmartSelect
          key="text-1"
          label="test"
          options={options}
          value={formData?.input_one || ""}
          onChange={(value) => handleInputChange("input_one", value)}
          leftIcon="fa-user"
          rightIconFunction={() => passwordRightIcon()}
          validations={numericValidations}
          errorEnable={true}
          errorUpdate={(error) => handleErrorChange("input_one", error)}
          inputType="BORDER_LABEL"
        />

        <SmartSelect
          key="text-2"
          label="test"
          options={options}
          value={formData?.input_two || null}
          onChange={(value) => handleInputChange("input_two", value)}
          leftIcon="fa-user"
          isMulti={true}
          rightIconFunction={() => passwordRightIcon()}
          validations={numericValidations}
          errorEnable={true}
          errorUpdate={(error) => handleErrorChange("input_one", error)}
          isClearable={true}
        />

        <SmartButton
          label="submit"
          classList={["is-primary", "is-small", "is-inverted"]}
          onClick={() => handleFormSubmit()}
          disabled={!isEmptyObject(formErrors)}
        />

        <SmartCheckRadio
          options={options}
          name="checkboxone"
          value={formData?.input_eight || null}
          onChange={(value) => handleInputChange("input_eight", value)}
        />

        <SmartCheckRadio
          options={options}
          name="checkboxtwo"
          value={formData?.checkboxtwo || null}
          onChange={(value) => handleInputChange("checkboxtwo", value)}
          isRight={true}
        />

        <SmartCheckRadio
          isMulti={true}
          options={options}
          name="checkboxtwo"
          value={formData?.checkboxtwo || []}
          onChange={(value) => handleInputChange("checkboxtwo", value)}
          isRight={true}
        />


      <SmartCheckRadio
          isMulti={true}
          options={options}
          name="checkboxthree"
          value={formData?.checkboxthree || []}
          onChange={(value) => handleInputChange("checkboxthree", value)}
          isRight={true}
          optionsVertical={true}
        />


      <SmartCheckRadio
          isMulti={true}
          options={options}
          type={"radio"}
          name="radioone"
          value={formData?.radioone || ""}
          onChange={(value) => handleInputChange("radioone", value)}
                 
        />



       <SmartCheckRadio        
          options={options}
          switchMode={true}
          name="switchone"
          value={formData?.switchone || ""}
          onChange={(value) => handleInputChange("switchone", value)}
          isMulti={true}
          type={"radio"}
                 
        />



      </div>
    );
  };

  return <>{inputWithIconValidation()}</>;
};

export default TextBoxExample;
