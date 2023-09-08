import {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowGame = () => {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/games/${id}`)
      .then((response) => {
        setGame(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      }); 
  }, [id]);


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-3'>Game Information</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{game.id}</span>
          </div>
          <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{game.title}</span>
          </div>        
          <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publisher</span>
              <span>{game.publisher}</span>
          </div>        
          <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Genre</span>
              <span>{game.genre}</span>
          </div>        
        
        </div>
      )}
    </div>
  )
}

export default ShowGame