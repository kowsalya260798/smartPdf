
const valid_empty_number = (value, msg) => {
    if (!value || parseInt(value) === 0) {
        return msg;
    }
    return "";
}
const valid_empty_string = (value, msg) => {
    if (!value || value.trim().length < 1) {
        return msg;
    }
    return "";
}

const valid_pattern = (value, msg, pattern) => {
    if (value !== null && value !== undefined) {
        const normalizedValue = typeof value === 'string' ? value.trim() : value;
        const patterntest = new RegExp(pattern);
        if (!patterntest.test(normalizedValue)) {
            return msg;
        }
    }
    return "";
}
const validateEmail = (value, msg, emailPattern) => {
    if (value !== null && value !== undefined) {
        const normalizedEmail = typeof value === 'string' ? value.trim() : value;
        console.log(" normalized email ", normalizedEmail, " email pattern " , emailPattern)
        
        const patternTest = new RegExp(emailPattern);
        if (!patternTest.test(normalizedEmail)) {
            return msg;
        }
    }
    return "";
};
const validatePassword = (value, msg, minLength) => {
    if (value !== null && value !== undefined) {
        const password = typeof value === 'string' ? value.trim() : value;
        // Check if the password meets the minimum length requirement
        if (password.length < minLength) {
            return msg;
        }


    }
    return "";
};

const validateMin = (value, min, msg) => {
   // min = 3;
    if(!value) return "";
    if (parseFloat(value) < min) {
        return msg;
    }
    return "";
}

const validateMax = (value, max, msg) => {
    if(!value) return "";
    if (parseFloat(value) > max) {
        return msg;
    }
    return "";
}

const validateMinLength = (value, min, msg) => {
    // min = 3;
   // console.log("value === " + value , " minimum ", min);
   if(!value) return "";
     if (""+value.length < min) {
         return msg;
     }
     return "";
 }
 
 const validateMaxLength = (value, max, msg) => {
    if(!value) return "";
    if (""+value.length > max) {
        return msg;
    }
    return "";     
 }

const validateFileSize=(value,min,max,msg)=>{
    let size = value && value.size!==undefined ? value.size : 0;
    if (size > max) {
       return msg;
    } else if (size < min) {
       return msg;
    } else {
       return "";
    }
}

const validateExtension=(value,extensions,msg)=>{
    const fileExtension = value && value.name !==undefined ? value.name.split('.').pop()?.toLowerCase() : "";
    if (!fileExtension || !extensions.includes(fileExtension)) {
      return msg;
    } 
    return "";
}

const validateCustom=(value,customFunction)=>{
    if(customFunction instanceof Function){
        return customFunction(value);
    }
    return "";
}

const validateInput = (value, validations) => {
    let msg = "";
    for (const validation of validations) {
       //  console.log("validation type " , validation.type, " v = ", validation.msg)
        switch (validation.type) {
            case 'required':
               // console.log("Entered in empty string", value)
                msg = valid_empty_string(value, validation.msg);
                break;
            case 'requiredNumber':
                msg = valid_empty_number(value, validation.msg);
                break;
            case 'pattern':
                msg = valid_pattern(value, validation.msg, validation.pattern);
                break;
            case 'email':
                msg = validateEmail(value, validation.msg, validation.pattern);
                break;
            case 'min':
                msg = validateMin(value, validation.min, validation.msg);
                break;
            case 'max':
                msg = validateMax(value, validation.max, validation.msg);
                break;
            case 'minLength':
                msg = validateMinLength(value, validation.min, validation.msg);
                break;
            case 'maxLength':
                msg = validateMaxLength(value, validation.max, validation.msg);
                break;
            case 'password':
                msg = validatePassword(value, validation.minLength, validation.msg);
                break;
            case 'fileSize':
                msg = validateFileSize(value, validation.min,validation.max, validation.msg);
                break;
            case 'fieExt':
                msg = validateExtension(value,validation.ext,validation.msg)
            case 'custom':
                msg = validateCustom(value,validation.custom)
            // Add more validation types as needed
            default:
                break;
        }
        if(msg.length > 0){
            break;
        }
    }
   // console.log("value ", value, " msg ", msg);
    return msg; // No validation errors
}


const validateForm=(formData,validations)=>{
    for (let formIndex in validations) {
        let actual_value = formData[formIndex]!==undefined ? formData[formIndex] : null;
        // check whether the index is object
        let validation_index = [];
    //    console.log(" index " , validations[formIndex])
        if(validations[formIndex] && Array.isArray(validations[formIndex])){
            validation_index = validations[formIndex];
        }else{
           // this is an object
           let conditionFunction = validations[formIndex].condition;
           if(conditionFunction instanceof Function && conditionFunction(formData)){
               validation_index = validations[formIndex].validations;
           }
        }
       // console.log("validation index " , validation_index);
         let msg = validateInput(actual_value,validation_index);
        //console.log("msg " , msg);
         if(msg.length > 0){
            return false;
            break;
         }         
    }
    return true;
}

const SmartValidRequired=(msg)=>{
    return {
        type: "required",
        msg: msg
      }
}

const SmartValidRequiredNumber=(msg)=>{
    return {
        type: "requiredNumber",
        msg: msg
      }
}

const SmartValidPattern=(msg,pattern)=>{
    return {
        type: "pattern",
        msg: msg,
        pattern:pattern,
      }
}

const SmartValidMin=(msg,min)=>{
    return {
        type: "min",
        msg: msg,
        min:min
      }
}

const SmartValidMax=(msg,max)=>{
    return {
        type: "min",
        msg: msg,
        max:max
      }
}

const SmartValidMinLength=(msg,min)=>{
    return {
        type: "minLength",
        msg: msg,
        min:min
      }
}

const SmartValidMaxLength=(msg,max)=>{
    return {
        type: "maxLength",
        msg: msg,
        max:max
      }
}

const SmartValidEmail=(msg,pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/)=>{
    return {
        type: "email",
        msg: msg,
        pattern:pattern
      }
}

const SmartCustom=(callBack)=>{
    return {
        type:"custom",
        custom:callBack,
    }
}


const SmartValid = {
    required:SmartValidRequired,
    requiredNumber:SmartValidRequiredNumber,
    pattern:SmartValidPattern,
    email:SmartValidEmail,
    min:SmartValidMin,
    max:SmartValidMax,
    minLength:SmartValidMinLength,
    maxLength:SmartValidMaxLength,
    custom:SmartCustom
}

export {
    validateInput,
    validateForm,
    SmartValid
}