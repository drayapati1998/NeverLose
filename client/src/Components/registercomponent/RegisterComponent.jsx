import React, { useState } from "react";
import { signup } from "../../services/authService";

import {Link} from "react-router-dom";//importing link to use in register button
import './RegisterComponent.css';

function RegisterComponent({ onSuccess }){
    //const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [status, setStatus] = useState("");

    const[fullname,setFullname]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmpassword,setConfirmpassword]=useState('');
    const strongPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log("Button clicked")
        if(!fullname||!email||!password||!confirmpassword){
            alert("All fields are required");
            return;
        }
        if(!strongPassword.test(password)){
            alert("password must be minimum 8 characters and include uppercase,lowercase,number and special character");
            return;
        }
        if(password!==confirmpassword){
            alert("passwords dont match");
            return;
        }
            try {
                

            console.log(`email = ${email} fullname = ${fullname} password= ${password}`)
      await signup({
      name: fullname,
      email: email,
      password: password,
    });


      setStatus("Signup successful. You can now log in.");
      onSuccess && onSuccess();
    } catch (err) {
      setStatus(err.message);
    }


    };
    return (
    <div className="container">
        <div className="card">
            <div className="left">
              <h2>Neverlose</h2>
              <p>Bridging the gap between Lost and Found</p>
              </div>
              <div className="right">
            <h3>Join the community of finders and owners</h3>
            <h5>Secure your essentials and gain peace of mind in just a few seconds.</h5>
            
    <form onSubmit={handleSubmit}>
        <label htmlFor='fullname'>Fullname:</label>
        <input type='text' id='fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
        <label htmlFor= 'email'>Email:</label>
        <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor ='password'>Password</label>
        <input type='password' id='password' placeholder='Minimum of 8 characters' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <label htmlFor='confirm password'>Confirm Password</label>
        <input type='password' id='confirmpassword' placeholder='Repeat the same password' value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}/>
       <button type="submit">Sign Up</button>
      {status && <p>{status}</p>}

        {/*<h6>Already have an account?<Link to='/login'>Login here</Link></h6>*/}
           
    </form>
    </div>
    </div>
    </div>
    
    );
}

export default RegisterComponent;