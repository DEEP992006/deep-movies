import React, { useEffect,useState,} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const Profile = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('email');
       alert("profile logouted")
        navigate('/login'); 
    }
    const email = localStorage.getItem('email');
    const [profile, setProfile] = useState({})
    useEffect(() => {
        if(email){
            const userdata = async() => {
                const data = await axios.get(`http://localhost:3000/profile/${email}`)
                setProfile(data.data)
            }
          
          userdata()
        }
        else{
            setProfile(null); // If no data is returned, set profile as null
            navigate('/login'); 
        }
      
      
    }, [])
 
  return (
    <>
    <div>{email}</div>
    
    {profile.name}
    <br></br>
    {profile.password}
    <br />
<button>edt</button>
<br />
<button onClick={logout}>logout</button>

    </>
  )
}

export default Profile