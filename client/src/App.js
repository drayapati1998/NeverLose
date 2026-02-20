import React from "react";
import { useState,useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import RegisterComponent from "./Components/registercomponent/RegisterComponent.jsx";
import LoginComponent from "./Components/logincomponent/LoginComponent.jsx";

// const App=()=>
// { 
//   const getRequest = () =>
//   {
//     fetch("/api").then(response => {
//     if (!response.ok) {
//       // If response is not OK (e.g., 404 or 500), read as text to see the error message
//       return response.text().then(text => {
//         throw new Error(`Server Error: ${response.status} - ${text}`);
//       });
//     }
//     // Check if the response is actually JSON
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.includes('application/json')) {
//       return response.json();
//     } else {
//       throw new TypeError('Expected JSON, but received non-JSON response');
//     }
//   })
//   .then(data => {
//     // Handle your JSON data here
//     setBackEndData(data)
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error.message);
//     // Log the error for debugging
//   })
//   }
//    const [backEndData,setBackEndData]=useState([{}]);
//   useEffect(()=>{
//     getRequest();
//   },[])
function App(){
  return(
    <Routes>
      <Route path="/register" element={<RegisterComponent/>}/>
      <Route path="/login" element={<LoginComponent/>}/>
    </Routes>
  );
}
export default App;