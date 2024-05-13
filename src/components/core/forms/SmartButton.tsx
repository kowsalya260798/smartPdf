import React, { useEffect } from 'react';
import { SmartButtonProps } from './SmartFormInterface';




const SmartButton: React.FC<SmartButtonProps> = (props) => {

    const { 
        label,
        type="button",        
        leftIcon, 
        leftIconFunction,
        rightIcon, 
        rightIconFunction,
        classList,
        disabled,
        disabledFunction,
        onClick
    } = props;



    // useEffect will be triggered whenever prop changes
    useEffect(() => {
        //
    }, [props]);


    const handleChange = () => {
        if(onClick) {
            onClick();
        }
    }

    /**
     *  label display function
     * 
     * @returns 
     */
    const labelDisplay = () => {
        if (label) {
            return <span>{label}</span>
        }
    }



    const leftIconDisplay = () => {
        if (leftIcon) {
            return <span className="icon"> <i className={"fa " + leftIcon} /> </span>
        } else if (leftIconFunction) {
            return leftIconFunction();
        }
    }

    const rightIconDisplay = () => {
        if (rightIcon) {
            return <span className="icon"> <i className={"fa " + rightIcon} /> </span>
        } else if (rightIconFunction) {
            return rightIconFunction();
        }
    }




    const buttonClasses = () => {
        let classes = ["button"];
        if(type=="icon"){
            classes = ["icon"]
        }
        if (classList) {
            classes = [...classes, ...classList];
        }
       
     
        return classes;
    }

    const disabled_input = () => {
        //  console.log("disabled input " );
        if (disabled) {
            return disabled;
        }
        if (disabledFunction) {
            // console.log("disabled or not ", inputProps.disabledFunction("test"))
            return disabledFunction("test");
        }

        return false;
    }

    const button_display=()=>{
        return (
            <button 
            className={buttonClasses().join(" ")}
            disabled={disabled_input()}
            onClick={()=>handleChange()}
            >
                {leftIconDisplay()}
                {labelDisplay()}
                {rightIconDisplay()}
            </button>
        );
    }

    const iconDisplay=()=>{
      return (  <span 
         className={buttonClasses().join(" ")}        
         onClick={()=>handleChange()}
        >
          {leftIconDisplay()}
        </span>
      );
    }

    return type=="icon" ? iconDisplay() : button_display();
};

export default SmartButton;