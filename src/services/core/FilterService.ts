
const numberCheck=(currentValue:any, filterValue:any, condition:string)=>{
     let value = parseFloat(currentValue);
     let filter_value = parseFloat(filterValue)
     if(condition==="min"){
        return value >  filter_value;
     }else if(condition==="max"){
        return value <  filter_value;
     }else{
        return value===filter_value;
     }
}

const isValidAndGreaterThanMinDate = (dateString:string, minDateString:string)=> {
    const currentDate = new Date(dateString);
    const minDate = new Date(minDateString);  
    // Check if the given date is a valid date
    if (isNaN(currentDate.getTime())) {
      return false;
    }  
    // Check if the given date is greater than the minimum date
    return currentDate > minDate;
  }

const dateCheck=(currentValue:any, filterValue:any, condition:string)=>{  
    if(condition==="min"){
       return isValidAndGreaterThanMinDate(currentValue,filterValue);
    }else if(condition==="max"){
       return isValidAndGreaterThanMinDate(filterValue,currentValue)
    }else{
       return currentValue===filterValue;
    }
}

const stringCheck=(currentValue:any, filterValue:any, condition:string)=>{  
    if(condition==="equals"){
       return currentValue===filterValue;
    }else{
       return currentValue.includes(filterValue)
    }
}

const filterSingleObject=(obj:any,filterConfigs:any[])=>{
    let matchFound = true;
    for(let i=0;i<filterConfigs.length;i++){
        const { index, value, type,condition } = filterConfigs[i];
        const objValue = obj[index]!==undefined ? obj[index] : null;
        if(!value){
            matchFound = true;
            break;
        }
        // omiting null values from filter
        if(matchFound && !objValue) {
            matchFound = false;
        }
        switch(type){
            case "number" : 
                matchFound = matchFound && numberCheck(objValue,value,condition);
                break;
            case "date" : 
                matchFound = matchFound && dateCheck(objValue,value,condition);
                break;
            default :
                // string comparision
                matchFound = matchFound && stringCheck(objValue,value,condition)
                break;
        }
    }
    return matchFound;
}


const filterArrayOfObject=(data:any,filterConfigs:any[])=>{
    if (!Array.isArray(data) || !Array.isArray(filterConfigs)) {
        // Handle invalid input
        return [];
    }
    return data.filter(item => {
        return filterSingleObject(item,filterConfigs);
    })
}

export {
    filterArrayOfObject
}