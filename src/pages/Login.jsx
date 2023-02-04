import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import "./Login.css";

function Login() {

    const navigate=useNavigate();
    const [data,setData]=useState({
        email:"",
        password:""
    })

    function handleChange(e){
        const val=e.target.value
        setData({...data,[e.target.name]:val})

    }
    async function handleSubmit(){
        await axios.post("http://localhost:5000/api/users/login",data).then(res=>{
            localStorage.setItem("userToken",res.data.tokendata)
            localStorage.setItem("id",res.data.user._id)
            localStorage.setItem("name",res.data.user.name)
            localStorage.setItem("email",res.data.user.email)
            localStorage.setItem("phone",res.data.user.phone)
            

        }).then(()=>{
            swal("Hello", "Login Successful", "success");
        }).then(()=>{
             navigate("/hotels")

        }).catch(()=>{
            swal("Sorry", "Invalid User", "error");

        })
        
    }

  return (
    <div className='login-main-container'>
        <div >
            <div className='manager-div-2'>

                <div className="signup-header">
                    <h2>
                        User Login
                    </h2>
                </div>	
                <div className='names'>


                    <input
                        style={{"width":"240px"}}
                        type = "text"
                        placeholder = "Enter Your Email"
                        name = "email"
                        onChange={handleChange}
                        value={data.email}
                        className = ""
                    />
        </div>
        <div className='names'>
        <input
            style={{"width":"240px"}}
			type = "text"
			placeholder = "Enter Your Password"
			name = "password"
			onChange={handleChange}
			value={data.password}
			className = ""
		/>

        </div>
        <div className='button-container-div'>
		<button 
        style={{"marginTop":"60px"}}
        onClick={handleSubmit} className="signup-button">
			Login
		</button>
        <div className="switch">
            <span>Don't have any account</span>
            <a href="/signup">Register now</a>
        </div>
		</div>

            </div>
        </div>
    </div>
  )
}

export default Login