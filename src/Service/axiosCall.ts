import { IMovie } from "../Components/MovieHome"
import axiosInstance from "../Config/axiosInstance"

export const getMovies = async(query: string)=>{
    try {
        const response = await axiosInstance.get(`/movies?query=${query}`)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}
export const addFavourite = async (data: IMovie) => {
    try {
        const response = await axiosInstance.post('/addfavourite', { data });
        return response.data; 
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Something went wrong');
        }
        throw new Error('Network error or server is unreachable');
    }
};

export const getFavouriteMovie = async()=>{
    try {
        const response = await axiosInstance.get('/getfavourite')
        console.log(response)
        return response.data.data
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Something went wrong');
        }
    }
}
  