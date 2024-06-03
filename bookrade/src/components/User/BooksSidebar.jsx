import { useContext, useEffect, useState } from 'react';
import { sendGetRequest } from '../../utils/api';
import { GenreContext } from '../../App';
import {useNavigate} from 'react-router-dom';

const BooksSidebar = () => {
    const navigate = useNavigate();
    const [searchGenre, setSearchGenre] = useContext(GenreContext);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await sendGetRequest('genres');
                const formattedGenres = response.map(genre => ({ id: genre.id, name: genre.name }));
                setGenres(formattedGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        getGenres();
    }, []);

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (e.target.checked) {
            setSearchGenre(prevState => [...prevState, selectedGenre]); 
        } else {
            setSearchGenre(prevState => prevState.filter(genre => genre !== selectedGenre)); 
        }
    };
    
    const handleAddButton = (e) => {
        e.preventDefault();
        navigate('/upload')
    }

    return (
        <div className="mt-10 sticky mx-10 bg-white rounded-md ring-2 ring-gray-900/5 w-2/12 shadow pt-10 flex flex-col items-center" style={{ height: "75vh" }}>
            <button className="success-btn" onClick={handleAddButton}>Add New Book</button>
            <div className="genre-checkbox py-12">
                <h1 className="text-3xl text-black-500">Filter</h1>
                {genres.map(genre => (
                    <div key={genre.id} className="flex items-center my-5">
                        <input
                            type="checkbox"
                            id={`genre-${genre.id}`}
                            value={genre.name}
                            checked={searchGenre.includes(genre.name)} // Check if genre is in searchGenre list
                            onChange={handleGenreChange}
                        />
                        <label htmlFor={`genre-${genre.id}`} className="text-black text-xl ml-3">{genre.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksSidebar;