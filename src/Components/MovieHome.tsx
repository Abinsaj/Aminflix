import { useEffect, useState } from 'react';
import { User, ChevronDown, Play, Heart, Search } from 'lucide-react';
import { addFavourite, getMovies } from '../Service/axiosCall';
import { debounce } from 'lodash'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export interface IMovie{
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
}

const MovieHome = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
 
  const fetchMovies = debounce(async (query) => {
    if(!query.trim()){
      setMovies(null);
      return 
    }
    setLoading(true);
    try {
      const data: IMovie[] = await getMovies(query);
      setMovies(data);
    } catch (error) {
      setMovies([]);
    }
    setLoading(false);
  },500);

  useEffect(()=>{

    fetchMovies(searchQuery)
    return ()=>{
      fetchMovies.cancel();
    }
  },[searchQuery])

  const addToFavourite = async (movie: IMovie) => {
    try {
        const data = await addFavourite(movie);
        toast.success(data.message); 
    } catch (error: any) {
        console.log(error);
        toast.error(error.message); 
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/90 backdrop-blur-sm fixed w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text mr-12">
            AMINFLIX
          </h1>

          <div className="ml-auto flex items-center space-x-6">
            <button onClick={()=>navigate('/favourite')} className="text-gray-400 hover:text-white transition-colors duration-200">
              <Heart size={20} />
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
              <User size={20} />
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Centered Search Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Discover Your Next Favorite Movie
            </h2>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 
                          focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300
                          text-lg shadow-xl"
              />
              <button 
                
                className="absolute right-4 top-1/2 transform -translate-y-1/2 
                         bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 
                         transition-colors duration-200">
                <Search size={24} />
              </button>
            </div>
          </div>

          {/* Results Section */}
          {loading ? (
            <div className="text-center text-white text-lg">Loading movies...</div>
          ) : movies && movies.length > 0 ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">Search Results</h3>
                <p className="text-gray-400">Showing results for: "{searchQuery || 'Popular movies'}"</p>
              </div>

              <div className="grid grid-cols-5 gap-6">
                {movies.map(movie => (
                  <div  className="group relative">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={movie.Poster || "/api/placeholder/400/600"}
                        alt={movie.Title}
                        className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 p-4 w-full">
                          <div className="flex items-center space-x-2 mb-2">
                    
                          </div>
                          {/* <p className="text-gray-300 text-sm mb-4">{movie.genre || 'Genre Unknown'}</p> */}
                          <div className="flex items-center space-x-3">
                            <button className="bg-white text-black rounded-full p-2 hover:bg-orange-500 transition-colors duration-200">
                              <Play size={20} fill="currentColor" />
                            </button>
                            {/* <button className="bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700 transition-colors duration-200">
                              <Plus size={20} />
                            </button> */}
                            <button onClick={()=>addToFavourite(movie)} className="bg-slate-800/80 text-white rounded-full p-2 hover:bg-slate-700 transition-colors duration-200">
                              <Heart size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-medium mt-3 group-hover:text-orange-500 transition-colors duration-200">
                      {movie.Title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg">No movies found. Try searching!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieHome;
