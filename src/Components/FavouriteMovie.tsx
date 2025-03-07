import { Play, Heart, Trash2, User, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFavouriteMovie, removeFromFavourite } from '../Service/axiosCall';
import { IMovie } from './MovieHome';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { IMovie } from './MovieHome';


const FavoritesMovie = () => {

  const [favorite, setFavorite] = useState<IMovie[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const navigate = useNavigate()
  
  useEffect(()=>{
    getFavorite()
  },[])

  const getFavorite = async()=>{
    setIsLoading(true)
    try {
        const data = await getFavouriteMovie()
        setFavorite(data)
    } catch (error: any) {
        toast.error(error.message)
    }finally{
        setIsLoading(false)
    }
  }

  const removeMovie = async(movie:string)=>{
    setIsLoading(true)
    try {
        let data = await removeFromFavourite(movie)
        setFavorite(data.favouriteMovie)
        toast.success(data.message)
    } catch (error: any) {
        toast.error(error.message)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <nav className="bg-slate-900/90 backdrop-blur-sm fixed w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <h1 onClick={()=>navigate('/')} className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text mr-12">
            AMINFLIX
          </h1>

          <div className="ml-auto flex items-center space-x-6">
            <button className="text-orange-500 hover:text-orange-400 transition-colors duration-200">
              <Heart size={20} fill="currentColor" />
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
              <User size={20} />
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">
              Your Favorite Movies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto"></div>
          </div>

          {isLoading ? (
            <div className="text-center text-white text-lg">Loading your favorites...</div>
          ) : ( 
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorite.map(movie => ( 
                  <div className="group relative">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={movie.Poster || "/api/placeholder/400/600"}
                        alt={movie.Title}
                        className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 p-4 w-full">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-gray-300 text-sm">Year</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="bg-white text-black rounded-full p-2 hover:bg-orange-500 transition-colors duration-200">
                              <Play size={20} fill="currentColor" />
                            </button>
                            <button 
                            onClick={()=>removeMovie(movie.imdbID)}
                              className="bg-slate-800/80 text-red-500 rounded-full p-2 hover:bg-slate-700 transition-colors duration-200"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-start">
                      <h3 className="text-white font-medium group-hover:text-orange-500 transition-colors duration-200">
                       {movie.Title}
                      </h3>
                      <span className="text-gray-400 text-sm">{movie.Type}</span>
                    </div>
                  </div>
                  ))}
              </div>
            </div>
           ) } 
        </div>
      </div>
    </div>
  );
};

export default FavoritesMovie;