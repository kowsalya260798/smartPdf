import SmartInput from "../../components/core/forms/SmartInput";
import { useState } from "react";
import { VALID_EMAIL_DOMAIN,ALLOW_NUMERIC, VALID_PASSWORD_GENERAL } from "../../services/PatternSerivce";
const SmartLogin = () => {
const [formData, setFormData] = useState({}); 


const handleInputChange = (name,value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
 };
  
 const handleSubmit = () => {
 
  console.log("Form Data submitted:", formData);
};
  const EmailValidations = [
    
    // { type: 'max', max: "[0-9]+", msg: 'Value must be at most 10' },
     {
      type:"email",
      msg:"Please enter the valid email",
      emailPattern:"/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
    }
  ];
 const minValidations= [  
  {
    type: "required",
    msg: "Numeric Value is Required"   
  },{ type: 'min', min: "2", msg: 'Value must be at least 5' }];

  const passValidations= [  
    {
      type: "required",
      msg: "Numeric Value is Required"   
    },{ type: 'password', minLength: "6", msg: 'minmum 6 character are required' }];

  return (
    <div className="signup-container mt-6">
       <h1 className="is-align-content-center">login form</h1>
      <SmartInput  label="username" key="username" 
      value={formData?.input_one}  
      onChange={(value)=>handleInputChange("input_one",value)} 
      type="text"  min={1} max={6} 
      pattern={VALID_EMAIL_DOMAIN}
      inputProps={{isFocussed:true}}  
      leftIcon="fa-user" validations={EmailValidations}   />
      <SmartInput  label="email"  
       value={formData?.input_two}  
       onChange={(value)=>handleInputChange("input_two",value)}  
       leftIcon="fa-envelope-o" key="email"
       pattern={ALLOW_NUMERIC}  
       inputProps={{isFocussed:true}} validations={minValidations} />
      <SmartInput  label="password" leftIcon="fa-lock" 
       value={formData?.input_three}  
       onChange={(value)=>handleInputChange("input_three",value)} 
       key="password" inputProps={{isFocussed:true}} 
       pattern={VALID_PASSWORD_GENERAL}   validations={passValidations} />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
};

export default SmartLogin
