import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableAllMovies from "../../components/Admin/TableAllMovies";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, Children, useState } from "react";
import ModalAddMovie from "../../components/Admin/ModalAddMovie";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllMovies } from "../../redux/slices/movieSlice";

interface addMovieType {
  title : string;
  desc : string;
  duration : number;
  genre : string;
  releaseDate : Date | null;
}


const ManageMovies = () => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState<boolean>(false);


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addMovie, setAddMovie] = useState<addMovieType>({
    title : "",
    desc : "",
    duration : 0,
    genre : "",
    releaseDate : null,
  })

  const handleChange = (event : ChangeEvent<any>) => {
    setAddMovie({...addMovie, [event.target.name] : event.target.value})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  let Movie : any = [];

  const FetchAllMovies = async (authtoken: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API}/movies/get-all-movies`, {
      headers: {
        authtoken,
      },
    });

    if (response.status == 200) {
      response.data.map((movie: any, i: number) => {
        Movie.push({ ...movie, id: i + 1 });
      });
      dispatch(fetchAllMovies(Movie))
    }
  };



  const onSubmit = async (event : ChangeEvent<any>) => {
    try {
      event.preventDefault()
      if(selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'ddscwu6o');
        axios
        .post(`https://api.cloudinary.com/v1_1/movieticket/image/upload`, formData)
        .then( async (response) => {
          if(response.status == 200) {
             await axios.post(`${import.meta.env.VITE_API}/movies/add-movie`, {
              ...addMovie,
              "poster" : response.data.secure_url
            }, {
              headers : {
                authtoken : localStorage.userinfo
              }
            }).then((response) => {
              if(response.status == 201) {
                FetchAllMovies(localStorage.userinfo)
                toast.success('Added movie added successfully')
                setShowModal(false)
                
              }
            })
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="w-full p-4">
      <ToastContainer />
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">จัดการภาพยนตร์</h1>
        <button
          className="bg-blue-500 w-10 h-10 rounded-2xl mx-24 hover:bg-blue-600 focus:bg-blue-800"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} color="white" />
        </button>
      </div>

      <div className="mx-auto mt-5">
        <TableAllMovies  />
      </div>



      <ModalAddMovie isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">Add Movie</h3>

          <form onSubmit={onSubmit}>
            <div className="my-4">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Desc
              </label>
              <input
                id="desc"
                type="text"
                name="desc"
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Duration
              </label>
              <input
                id="duration"
                type="number"
                name="duration"
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Genre
              </label>
              <select name="genre" onChange={handleChange} className="select select-bordered bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg" required>
                <option value="">
                  Select Genre
                </option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
              </select>
            </div>

            <div className="my-4">
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Language
              </label>
              <select onChange={handleChange} className="select select-bordered bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg" name="language" required>
                <option value="">
                  Select Language
                </option>
                <option value="Thai">Thai</option>
                <option value="English">English</option>
                <option value="Germany">Germany</option>
              </select>
            </div>

            <div className="my-4">
              <label
                htmlFor="releaseDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ReleaseDate
              </label>
              <input
                id="releaseDate"
                type="date"
                name="releaseDate"
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="poster"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Poster
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              />
            </div>



            <button className="bg-blue-600 text-base-100 font-semibold w-full h-10 rounded-lg hover:bg-blue-700 focus:bg-blue-400">
              Save
            </button>
          </form>
        </div>
      </ModalAddMovie>
    </div>
  );
};

export default ManageMovies;
