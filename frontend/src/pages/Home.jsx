import React, { useEffect, useState } from 'react'
import axios from 'axios'
import spinner from '../components/spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/games')
      .then((response => {
        setGames(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })); 
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Games List</h1>
      
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
     { loading ? (
      <spinner />
     ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-800 rounded-md'>No</th>
              <th className='border border-slate-800 rounded-md'>Title</th>
              <th className='border border-slate-800 rounded-md max-md:hidden'>Publisher</th>
              <th className='border border-slate-800 rounded-md'>Genre</th>
              <th className='border border-slate-800 rounded-md'>More</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game.id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {game.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {game.publisher}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {game.genre}
                </td>
                <td className='flex justify-center gap-x-4'>
                  <Link to={`/games/details/${game.id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/games/edit/${game.id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-800' />                    
                  </Link>
                  <Link to={`/games/delete/${game.id}`}>
                    <MdOutlineDelete className='text-2xl text-red-800' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     )}

    </div>
  )
}

export default Home;