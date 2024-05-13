// apiService.js
import axios from 'axios';
import { from,EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import config from '../config/config';


const API = axios.create({
    baseURL:config.REACT_APP_API_URL
});


const processError=(error)=>{
  let msg = "error";
 // console.log("code " , error.code);
  if(error.code=="ERR_BAD_REQUEST"){
   // console.log("entered insaide ");
    // this is bad request error code and to be handled 
    msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Invalid Request";
    return msg;
   }
   return msg;
}


// Default error handler
const defaultErrorHandler = (errorMessage) => { 
    //console.error('API Request Error:', error);
    alert(errorMessage);
    return EMPTY;
  };

const get = (url, handleError,requiresAuthorization = true, customHeaders = {}) => {
    // Check if authorization is required and if a token is available
  if (requiresAuthorization && config.AUTH_TOKEN) {
    customHeaders['Authorization'] = `Bearer ${config.AUTH_TOKEN}`;
  }
    return from(API.get(url, { headers: customHeaders })).pipe(
      catchError((error) => {
        // Use the provided handleError callback or a default handler
       const errorHandler = handleError || defaultErrorHandler;
       // Call the error handler with the error
        errorHandler(error); 
        // Rethrow the error to propagate it down the observable chain
        //return throwError(error);
      })
    );
};

const post = (url, data,requiresAuthorization = true, customHeaders = {}) => {
    // Check if authorization is required and if a token is available
  if (requiresAuthorization && config.AUTH_TOKEN) {
    customHeaders['Authorization'] = `Bearer ${config.AUTH_TOKEN}`;
  }
    return from(API.post(url,data,{ headers: customHeaders })).pipe(
      catchError((error) => {
       // console.log("error " , error);
       let errorMessage = processError(error);
        defaultErrorHandler(errorMessage);
        // Use the provided handleError callback or a default handler
     //  const errorHandler = defaultErrorHandler;
       // Call the error handler with the error
       // errorHandler(error); 
        // Rethrow the error to propagate it down the observable chain
       // return throwError(error);
       return EMPTY;
      })
    );
};

export{get,post};