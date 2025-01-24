import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Movie() {
  const { id } = useParams();

 useEffect(() => {
   const movie = async () => {

    await axios.get(`http://localhost:3000/api/movie/${id}`)
   }
   movie()
 }, [])
 



  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
}

export default Movie;
