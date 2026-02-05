import React from "react";
import {useState} from "react";

function RegisterComponent(){
    const[fullname,setFullname]=useState[''];
    const[email,setEmail]=useState[''];
    const[password,setPassword]=useState[''];
    const[confirmpassword,setConfirmpassword]=useState[''];
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!fullname||!email||!password||!confirmpassword){
            alert("All fields are required");
            return;
        }
        if(password!==confirmpassword){
            alert("passwords dont match");
        }
            console.log('Form submitted',{fullname,email,password,confirmpassword});{
        }

    };
    return <div>
    <form onSubmit={handleSubmit}>
        <label htmlFor='fullname'>Fullname:</label>
        <input type='text' id='fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
        <label htmlFor= 'email'>Email:</label>
        <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor ='password'>password</label>
        <input type='password' id='password' placeholder='Minimum of 8 characters' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <label htmlFor='confirm password'>Confirm Password</label>
        <input type='password' id='confirmpassword' placeholder='Repeat the same password' value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}/>
        <button type='submit'>Register</button>
    </form>
</div>
}

export default RegisterComponent;