import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import MainLayout from "../themes/MainLayout";
import LoginLayout from "../themes/LoginLayout";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import Pdftable from "../pages/Table/Pdftable";
import Pdfform from "../pages/Table/Pdfform";
import PdfCalendar from "../pages/Table/PdfCalander";
import Signup from "../pages/Login/Signup";
import SmartLogin from "../pages/Login/SmartLogin";
import TextBoxExample from "../pages/examples/TextBoxExample";
import TableExample from "../pages/examples/TableExample";
import SelectBoxExample from "../pages/examples/SelectBoxExample";
import SmartFormExample from "../pages/examples/SmartFormExample";
import DateBoxExample from "../pages/examples/DateBoxExample";
import SmartImageCropper from "../components/core/forms/SmartImageCropper";
import ImageUploadExample from "../pages/examples/ImageUploadExample";

const SiteRoute = () => {
  const isAuthenticated = true;
  const exampleRoutes=()=>{
    return (
      <MainLayout>     
        <Routes>
          <Route path="textbox" element={<TextBoxExample />} />  
          <Route path="selectbox" element={<SelectBoxExample />} />  
          <Route path="table" element={<TableExample />} /> 
          <Route path="form" element={<SmartFormExample />} />  
          <Route path="date" element={<DateBoxExample />} /> 
          <Route path="image" element={<ImageUploadExample />} />        
        </Routes>
    </MainLayout>
    )
  }

  const mainRouteChildren = () => {
    return (
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />       
          <Route path="/contact" element={<Home />} />
          <Route path="/pdftable" element={<Pdftable/>} />
          <Route path="/newform" element={<Pdfform/>} />
          <Route path="/pdfcal" element={<PdfCalendar/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/SmartLogin" element={<SmartLogin/>} />
        </Routes>
      </MainLayout>
    );
  };

  const loginLayoutChildren = () => {
    return (
      <LoginLayout>
        <Login />
      </LoginLayout>
    );
  };

  return (
    <>
      <Router>
        <Routes>
        <Route
            path="/"
            element={ mainRouteChildren()}
          />
         <Route
            path="/home"
            element={ mainRouteChildren()}
          />
          <Route path="/login" element={loginLayoutChildren()} />         
          <Route
            path="/dashboard/*"
            element={<PrivateRoute> {mainRouteChildren()}</PrivateRoute>}
          />
            <Route
            path="/examples/*"
            element={ exampleRoutes()}
          />
         
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default SiteRoute;
