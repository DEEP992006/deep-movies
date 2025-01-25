import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';

function Movie() {
  const { id } = useParams();

 useEffect(() => {
   const movie = async () => {

    await axios.get(`http://localhost:3000/api/movie/${id}`)
   }
   movie()
 }, [])
 const email = localStorage.getItem('email');
  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
      <strong>Email:</strong> {email || 'No Email Set'}
    </div>
  );
}

export default Movie;
