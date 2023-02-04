import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Hotel.css"
function Hotels() {
    const[hotelList,setHotelList]=useState([])
    const[hotelid,setHotelId]=useState("")
    const[hotelname,setHotelName]=useState("")
    const[username,setUserName]=useState("")
    const[uid,setUid]=useState("")
    const[phone,setPhone]=useState("")
    const[email,setEmail]=useState("")
    const[roomno,setRooms]=useState("")

    const[popupState,setPopupState]=useState(false);

    let index;
    useEffect(()=>{
        axios.get("http://localhost:5000/api/hotels/getall").then(res=>{
            setHotelList(res.data.result);
            /* setHotelId(res.data.result._id);
            setHotelName(res.data.result.name); */
        })
    })
    function handleSubmit(e){
        index=e;
        setHotelId(hotelList[index]._id)
        setHotelName(hotelList[index].name)
        setRooms(hotelList[index].rooms[0])
        setUserName(localStorage.getItem("name"))
        setUid(localStorage.getItem("id"))
        setEmail(localStorage.getItem("email"))
        setPhone(localStorage.getItem("phone"))

        setPopupState(true)
    }
    async function finalSubmission(){
        await axios.post("http://localhost:5000/api/rooms/book",{hotelid,hotelname,username,uid,phone,email,roomno})
        .then(res=>{
            axios.post(`http://localhost:5000/api/hotels/updaterooms/${hotelid}`)
            } 
        )
    }
  return (
    <div className='hotel-container'>
        <h1>
            Hotels List
        </h1>
        {popupState?
        <div className='hotel-list'>
            <h3 style={{"padding":"10px","paddingLeft":"100px","paddingRight":"100px"}}>
                After Pressing Submit Button Your Data Will be Temporarily Be Stored At our Server For a fix Deadline and we Will send you a mail with payment gateway link.
            </h3>
            <button style={{"marginRight":"10px"}} className='book-button' onClick={finalSubmission}>Submit</button>
            <button style={{"marginLeft":"10px"}} className='book-button' onClick={()=>{setPopupState(false)}}>Cancel</button>
        </div>:
        <div className='hotel-list-container' >
        {hotelList.map((hotel,index)=>(
            <div key={index} className='hotel-list'>
                <h1>{hotel.name}</h1>
                <div style={{"display":"flex","justifyContent":"space-evenly"}}>
                <div>
                    <p>Address:{hotel.address}</p>
                    <p>Description:{hotel.desc}</p>
                </div>
                <div >
                    <p>Rating:{hotel.rating}</p>

                    <p>Price:{hotel.rent}</p>
                <button className='book-button' key={index} onClick={()=>{handleSubmit(index)}}>
                    Book Now
                </button>
                </div>
                </div>
                
            </div>
        ))}</div>
        }
    </div>
  )
}

export default Hotels