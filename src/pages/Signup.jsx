import React from 'react';
import { useState } from 'react';
import "./Login.css";
import axios from "axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


function Signup() {

    const navigate=useNavigate()
    
	const [data,setData]=useState({
		name:"",
        email:"",
        phone:"",
        password:"",
        address:"",
	})
	function handleChange(e){
		const val=e.target.value
        setData({...data,[e.target.name]:val})
		
        
	}
	async function handleSubmit(e){
		e.preventDefault();

		try{
			await axios.post("http://localhost:5000/api/users/signup",data).then((res)=>
			swal("Registration Successful", "You can Login Now!", "success")
				
			).then(res=>{
                navigate("/login")
            })
		}catch(e){
			console.log(e);
		}
	}

  return (
    <div className='login-main-container'>
		<div >
		<div  className='manager-div'>

			<div className="signup-header">
				<h2>
					Signup Page
				</h2>
				</div>					
		<div style={{"display":"flex","flexDirection":"column","alignItems":"center"}} className='names'>


		<input
			style={{"width":"390px"}}
			type = "text"
			placeholder = "Full Name"
			name = "name"
			onChange = {handleChange}
			value = {data.name}
			
			className = ""
		/>
		
		<input
			style={{"width":"390px"}}
			type = "text"
			placeholder = "Create Password"
			name = "password"
			onChange = {handleChange}
			value = {data.password}
			
			className = ""
		/>
			
		</div>

        <div style={{"display":"flex","flexDirection":"column","alignItems":"center"}} className='user-contact'>                      
		<input
			style={{"width":"390px"}}
			type = "text"
			placeholder = " Enter Email"
			name = "email"
			onChange = {handleChange}
			value = {data.email}
			required
			className = ""
		/>

		<input
			style={{"width":"390px"}}
			type = "number"
			placeholder = "Phone Number"
			name = "phone"
			onChange = {handleChange}
			value = {data.phone}
			
			className = ""
		/>
		</div>

		<div className='address-container'>

		<input
			type = "text"
			placeholder = "Add Address"
			name = "address"
			onChange = {handleChange}
			value = {data.address}
			required
			className = ""
		/>
		</div>
		
		
		<div className='button-container-div'>
		<button onClick={handleSubmit} className="signup-button">
			Register
		</button>
		<div className="switch">
            <span>Already have account</span>
            <a href="/login">Login now</a>
        </div>
		</div>
		</div>
		</div>
			</div>
		)
}

export default Signup