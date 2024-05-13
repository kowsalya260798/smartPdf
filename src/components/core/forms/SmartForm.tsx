import React, { useEffect, useState } from 'react';
import { validateInput } from '../../../services/smartValidationService';
import { SmartFormElementProps, SmartFormProps } from './SmartFormInterface';
import SmartInput from './SmartInput';
import SmartSelect from './SmartSelect';
import SmartCheckRadio from './SmartCheckRadio';
import SmartDate from './SmartDate';
import SmartTextArea from './SmartTextArea';
import SmartButton from './SmartButton';
import SmartPassword from './SmartPassword';
import SmartOtp from './SmartOtp';
import SmartMobileNumber from './SmartMobileNumber';

const SmartForm: React.FC<SmartFormProps> = (props) => {
    const { 
        formData,
        setFormData,
        formSubmit,
        elements,
        handleErrorChange,
        
    } = props;   

    const [error, setError] = useState("");
   // const [hasValue, setHasValue] = useState(false);

    // useEffect will be triggered whenever prop changes
    useEffect(() => {         
        //
    }, [props]);

    /**
     * 
     * @param index 
     * @returns 
     */
    const getValue=(index:string)=>{  
      // console.log(formData);
       return formData[index] && formData[index]!==undefined ? formData[index] : null;   
    }

    const formClasses = () => {
        let classes = ["columns is-multiline"];       
        return classes;
    }

  

    const singleCaseDisplay=(element:SmartFormElementProps)=>{  
        const onChange = (value:any)=>{
           // console.log("on change called");
            setFormData(element.name,value);
        }      
        const onCodeChange = (value:any)=>{
            setFormData(element?.codeName||"code",value);
        }  
        const errorUpdate=(value:any)=>{
            if(handleErrorChange)
                handleErrorChange(element.name,value);
        }
        switch(element.type){
            case "TEXT_BOX" :                   
                  return <SmartInput {...element.element} value={getValue(element.name)||""} 
                  onChange={onChange} errorEnable={formSubmit} errorUpdate={errorUpdate} />
            case "PASSWORD" :                   
                  return <SmartPassword {...element.element} value={getValue(element.name)||""} 
                  onChange={onChange} errorEnable={formSubmit} errorUpdate={errorUpdate} />
            case "OTP" :                   
                  return <SmartOtp {...element.element} 
                  onChange={onChange} errorEnable={formSubmit} errorUpdate={errorUpdate} />
            case "MOBILE" :                   
                  return <SmartMobileNumber {...element.element} 
                  onChange={onChange} onCodeChange={onCodeChange} 
                  errorEnable={formSubmit} errorUpdate={errorUpdate} value={getValue(element.name)}  />
            case "SELECT_BOX" : 
                 return <SmartSelect {...element.element} value={getValue(element.name)} 
                 onChange={onChange} errorUpdate={errorUpdate} />
            case "CHECK_RADIO" : 
                 return <SmartCheckRadio {...element.element} name={element.name} 
                 value={getValue(element.name)} onChange={onChange} errorUpdate={errorUpdate} />
            case "TEXTAREA" : 
                 return <SmartTextArea {...element.element} 
                 value={getValue(element.name)} onChange={onChange} errorUpdate={errorUpdate} />
            case "DATE" : 
                 return <SmartDate {...element.element} 
                 value={getValue(element.name)} onChange={onChange} errorUpdate={errorUpdate} />
            case "BUTTON" : 
                 return <SmartButton {...element.element}  onClick={element.element.onClick}/>
            case "LABEL" :
                 return element.labelFunction !==undefined ? element.labelFunction() : "";
        }
    }

    const singleFieldDisplay=(element:SmartFormElementProps,index:number)=>{
        let widthClass = "is-" + element.width;
        let class_name = element.class_name ? element.class_name : "";
        // check hide function exists
        if( element.hideFunction && element.hideFunction(getValue(element.name))===true){
            return "";
        }
        return (
            <div key={index} className={"column " + widthClass +" " +class_name } >
                 {singleCaseDisplay(element)}
            </div>
        )
    }

    
    return (       
           <div className={formClasses().join(" ")}>
                {
                elements.map((item:any,index:number)=>{
                    return singleFieldDisplay(item,index)
                })
                }
           </div>        
    );
};

export default SmartForm;