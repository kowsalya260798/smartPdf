
const  VALID_EMAIL_ADDRESS = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/";
const VALID_EMAIL_DOMAIN = (allowedDomain)=>{
    return `^[a-zA-Z0-9._-]+@${allowedDomain}$`;
}
const VALID_USER_NAME = "/^[a-zA-Z0-9_-]{3,16}$/";
const VALID_PASSWORD_GENERAL = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/";
const VALID_PASSWORD=(minLength)=>{
    return `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{${minLength},}$`;
}

const ALLOW_ALPHABET ="[A-Za-z]+";
const ALLOW_NUMERIC = "[0-9]+";
const ALLOW_FLOAT = "[0-9.]+";
const ALLOW_FLOAT_DYNAMIC=(lastDigit)=>{
    return "-?\d*\.?\d{0,2}";
} 

export{    
     VALID_EMAIL_ADDRESS,
     VALID_EMAIL_DOMAIN,
     VALID_USER_NAME,
     VALID_PASSWORD_GENERAL,
     VALID_PASSWORD,
     // allow patters 
     ALLOW_ALPHABET,
     ALLOW_NUMERIC,
     ALLOW_FLOAT,
     ALLOW_FLOAT_DYNAMIC

}