import React, { useEffect, useState } from "react";
import SmartButton from "../../components/core/forms/SmartButton";
import { isEmptyObject } from "../../services/core/CommonService";
import { subDays,addDays } from 'date-fns';
import SmartDate from "../../components/core/forms/SmartDate";

const DateBoxExample = () => {
  const [formData, setFormData] = useState({});
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
    {
      type: "pattern",
      msg: "Please Enter Correct Numeric Value",
      pattern: "[0-9]+",
    },
  ];

  const handleFormSubmit = () => {
    console.log(formData);
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

  const inputWithIconValidation = () => {
    return (
      <div className="card">
        <div className="columns is-multiline">
          <div className="column is-3" key={"one"}>
            <SmartDate
              key="text-4"
              label="Normal Date"
              value={formData?.input_four || ""}
              onChange={(value) => handleInputChange("input_four", value)}
              //  inputType="BORDER_LABEL_FOCUS"
            //  leftIcon="fa-user"
              inputProps={{ isFocussed: true }}
            />
          </div>
          <div className="column is-3" key={"5"}>
            <SmartDate
              key="text-4"
              label="date picker week days only"
              value={formData?.input_2 || ""}
              onChange={(value) => handleInputChange("input_2", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}
              weekDaysOnly={true}
            />
          </div>
          <div className="column is-3" key={"two"}>
            <SmartDate
              key="text-4"
              label="date picker include these dys only"
              value={formData?.input_5 || ""}
              onChange={(value) => handleInputChange("input_5", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}
              weekDaysOnly={true}
            />
          </div>
          <div className="column is-3" key={"three"}>
            <SmartDate
              key="text-4"
              label="Month Picker"
              value={formData?.input_three || ""}
              onChange={(value) => handleInputChange("input_three", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}
              showMonthYearPicker={true}
              dateFormat="MM/yyyy"
            />
          </div>

          <div className="column is-3" key={"4"}>
            <SmartDate
              key="text-4"
              label="Date with excusing some days"
              value={formData?.input_4 || ""}
              onChange={(value) => handleInputChange("input_4", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="dd/MM/yyyy"
              excludeDates={[new Date(), subDays(new Date(), 1)]}
            />
          </div>

          <div className="column is-3" key={"8"}>
            <SmartDate
              key="text-4"
              label="Date with min days"
              value={formData?.input_8 || ""}
              onChange={(value) => handleInputChange("input_8", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="dd/MM/yyyy"
              minDate={subDays(new Date(), 5)}
            />
          </div>
          <div className="column is-3" key={"9"}>
            <SmartDate
              key="text-4"
              label="Date with max days"
              value={formData?.input_9 || ""}
              onChange={(value) => handleInputChange("input_9", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="dd/MM/yyyy"
              maxDate={addDays(new Date(), 5)}
              
            />
          </div>
          <div className="column is-3" key={"10"}>
            <SmartDate
              key="text-4"
              label="Date with year drop down"
              value={formData?.input_10 || ""}
              onChange={(value) => handleInputChange("input_10", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="dd/MM/yyyy"
              showYearDropdown={true}
              
            />
          </div>
          <div className="column is-3" key={"11"}>
            <SmartDate
              key="text-4"
              label="Date with year drop down"
              value={formData?.input_11 || "2023/01/01"}
              onChange={(value) => handleInputChange("input_11", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="dd/MM/yyyy"
             // showYearDropdown={true}
             readOnly={true}              
            />
          </div>

          <div className="column is-3" key={"12"}>
            <SmartDate
              key="text-4"
              label="Date with time zone"
              value={formData?.input_12 || null}
              onChange={(value) => handleInputChange("input_12", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="dd/MM/yyyy H:mm"
             // showYearDropdown={true}
             showTimeSelect={true}             
            />
          </div>
          <div className="column is-3" key={"13"}>
            <SmartDate
              key="text-4"
              label="Time Select Only"
              value={formData?.input_13 || null}
              onChange={(value) => handleInputChange("input_13", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="H:mm aa"
             // showYearDropdown={true}
             showTimeSelect={true} 
             showTimeSelectOnly={true}            
            />
          </div>

          <div className="column is-3" key={"14"}>
            <SmartDate
              key="text-4"
              label="Year and month drop down"
              value={formData?.input_14 || null}
              onChange={(value) => handleInputChange("input_14", value)}
              //  inputType="BORDER_LABEL_FOCUS"
              leftIcon="fa-user"
              inputProps={{ isFocussed: true }}             
              dateFormat="H:mm aa"
              showYearDropdown={true}
              showMonthDropdown={true}                     
            />
          </div>

        </div>

        <SmartButton
          label="submit"
          classList={["is-primary", "is-small", "is-inverted"]}
          onClick={() => handleFormSubmit()}
          disabled={!isEmptyObject(formErrors)}
        />
      </div>
    );
  };

  return <>{inputWithIconValidation()}</>;
};

export default DateBoxExample;
