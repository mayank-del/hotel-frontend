import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { ResponsiveContainer,LineChart,Line ,XAxis,YAxis, CartesianGrid, Legend, Tooltip, PieChart, Pie, BarChart, Bar, RadialBarChart, RadialBar} from 'recharts';
import "./ManagerTable.css"
function ManagerPage() {
  const [hdata,setHData]=useState([])
  const[hotelid,setHotelId]=useState("");
  const[rentPopup,setRentPopup]=useState(false);
  const[ratingPopup,setRatingPopup]=useState(false);
  const[users,setUsers]=useState([])
  const[reservation,setReservation]=useState([])

  const[data,setdata]=useState({
    id:"",
    rent:""
  })
  const[data2,setdata2]=useState({
    id:"",
    rating:""
  })

  function handleRating(){
    axios.post(`http://localhost:5000/api/hotels/updaterate/${data2.id}`,data2,{
      headers:{
          "authorization": `Bearer ${localStorage.getItem("mgrtoken")}`
        }
  }).then(res=>{

    })
  }
  function handleRent(){
    console.log(data)
    axios.post(`http://localhost:5000/api/hotels/update/${data.id}`,data,{
      headers:{
          "authorization": `Bearer ${localStorage.getItem("mgrtoken")}`
        }
  }).then(res=>{

    })
  }
  function handleChange(e){
    const val=e.target.value;
    setdata({...data,[e.target.name]:val})
  }
  function handleChange2(e){
    const val=e.target.value;
    setdata2({...data2,[e.target.name]:val})
  }

  useEffect(()=>{
    axios.get("http://localhost:5000/api/hotels/getall").then(res=>{
      setHData(res.data.result)
      console.log(res.data.result)
      }).then(res=>{
        axios.get("http://localhost:5000/api/users").then(res2=>{
            setUsers(res2.data)
            console.log(res2.data)
        })
      }).then(res=>{
        axios.get("http://localhost:5000/api/rooms").then(res=>{
          setReservation(res.data)
          console.log(res.data)
        })
      })
    },[])


  return (
    <div style={{"color":"yellow"}} >
        <h1 className='mgr-heading'>Welcome Manager Sir</h1>
    <div className='chart-container'>
        <ResponsiveContainer width="45%"  aspect={3}> 
        <LineChart data={hdata} height={200} width={400} margin={{top:10,
        right:200,left:20,bottom:10}}>
          <CartesianGrid/>
          <XAxis dataKey="name" interval={'preserveStartEnd'}/>
          <YAxis />
          <Tooltip contentStyle={{"background":"lightgreen"}}/>
          <Legend/>
          <Line type="monotone" dataKey="rent" stroke='orange' activeDot={{r:8}}/>
        </LineChart>
      </ResponsiveContainer>
      
      <ResponsiveContainer width="45%"  aspect={3}>
      <BarChart width={730} height={250} data={hdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Bar dataKey="rent" fill="orange" />
      </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="45%"  aspect={3}> 
        <LineChart data={hdata} height={200} width={400} margin={{top:10,
        right:200,left:20,bottom:10}}>
          <CartesianGrid/>
          <XAxis dataKey="name" interval={'preserveStartEnd'}/>
          <YAxis />
          <Tooltip contentStyle={{"background":"lightgreen"}}/>
          <Legend/>
          <Line  dataKey="rating"  activeDot={{r:8}}/>

        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="45%"  aspect={3}>
      <BarChart width={730} height={250} data={hdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rating" fill="#8884d8" />
        
      </BarChart>
      </ResponsiveContainer>
      </div>
      <h1>
        Update Data
      </h1>
      <div className="update-contents">
        {rentPopup?<div className="update-rent">
        <div className='x-button' onClick={()=>{setRentPopup(false)}}>X</div>
            <div className='input-container'>
              <input onChange={handleChange} placeholder='Enter ID' name="id" value={data.id} />
              <input onChange={handleChange}  placeholder='Enter Rent' name="rent" value={data.rent} />
              <button  onClick={handleRent}>update</button>
            </div>
        </div>:<div className="update-rent">
          <h3>After Pressing this button you can modify the rent of hotel by entering the Id. </h3>
          <button className='update-button' onClick={()=>{setRentPopup(true)}}>Update Rent</button>
        </div>}
        {ratingPopup?<div className="update-rating">
            <div className='x-button' onClick={()=>{setRatingPopup(false)}}>X</div>
            <div className='input-container'>
              <input onChange={handleChange2} placeholder='Enter ID' name="id" value={data2.id}/>
              <input onChange={handleChange2} placeholder='Enter Rating' name="rating" value={data2.rating}/>
              <button onClick={handleRating}>update</button>
            </div>
        </div>:<div className="update-rating">
        <h3>After Pressing this button you can modify the rating of hotel by entering the Id.  </h3>
        <button className='update-button' onClick={()=>{setRatingPopup(true)}}>Update Rating</button>
        </div>}
      </div>
      <div className="details">
        <div className="user-details">
          <h1>Users Details</h1>
          {users.map((user,index)=>(
            <div key={index} className='hotel-list'>
            <h1>{user.name}</h1>
            <div style={{"display":"flex","justifyContent":"space-evenly"}}>
            <div>
                <p>Name:{user.name}</p>
                <p>Email:{user.email}</p>
                <p>Phone:{user.phone}</p>
                <p>Address:{user.address}</p>
            </div>
            
            </div>
            
        </div>
          ))}
        </div>
        <div className="booking-details">
        <h1>Reservation Details</h1>
          {reservation.map((res,index)=>(
            <div style={{"borderRadius":"10px"}} key={index} className='hotel-list'>
            <h1>{res.hotelname}</h1>
            <div style={{"display":"flex","justifyContent":"space-evenly"}}>
            <div>
                <p>Name:{res.username}</p>
                <p>Hotel Id:{res.hotelid}</p>
                <p>Email:{res.email}</p>
                <p>Phone:{res.phone}</p>
            </div>
            
            </div>
            
        </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManagerPage