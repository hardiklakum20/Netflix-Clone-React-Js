import React, { useState } from 'react'
import { useEffect } from 'react';
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

function Player() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODAyNWY2YjhjM2VjNzA2ZmY0NmYzNjQ3ZWI2N2RmOCIsIm5iZiI6MTcyMDE2OTgwMy4xMTI3MTUsInN1YiI6IjY2ODdiNDE5N2M0MmZjMTA3MjllYjg2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dL2LM3m6N4n1jy9YQtEDXHFSvwck5rEXwLIOPK1jlts'
    }
  };
  

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  }, [])
  



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}} />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%' title='trailer' frameBorder='0' allowFullScreen>
        
      </iframe>
      <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
    </div>
  )
}

export default Player