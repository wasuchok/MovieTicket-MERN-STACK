import { TextInput } from "@mantine/core";
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect, ChangeEvent } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { fetchAllMovies, setRecords } from "../../redux/slices/movieSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ModalEditMovie from "./ModalEditMovie";
import { ToastContainer, toast } from "react-toastify";



interface IMovie {
  id? : number
  _id : number
  title : string
  desc : string
  duration : number
  genre : string
  language : string
  releaseDate : string
  poster : string
}

interface editMovieType {
  title : string;
  desc : string;
  duration : number;
  genre : string;
  language : string
  releaseDate : any | null;
}

const PAGE_SIZES = [3, 5, 15];


const TableAllMovies = () => {
  const { movies, records } = useSelector((state : RootState) => state.movie)

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const dispatch = useDispatch();


  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  let Movie : IMovie[] = [];

  const [page, setPage] = useState(1);
  // const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    dispatch(setRecords(movies.slice(from, to)))
    
  }, [page, pageSize, movies]);

  const FetchAllMovies = async (authtoken: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API}/movies/get-all-movies`, {
      headers: {
        authtoken,
      },
    });

    if (response.status == 200) {
      response.data.map((movie: IMovie, i: number) => {
        Movie.push({ ...movie, id: i + 1 });
      });
      
      dispatch(fetchAllMovies(Movie))
    }
  };

  const FetchMovie = async (authtoken : string, _id : number) => {
    try {
      setShowEditModal(true)
      await axios.get(`${import.meta.env.VITE_API}/movies/get-movie-by-id/${_id}`, {
        headers : {
          authtoken
        }
      }).then((response) => {
        if(response.status == 200) {
          setEditMovie(response.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [editMovie, setEditMovie] = useState<editMovieType>({
    title : "",
    desc : "",
    duration : 0,
    genre : "",
    language : "",
    releaseDate : new Date(),
  })

  const handleChange = (event : ChangeEvent<any>) => {
    setEditMovie({...editMovie, [event.target.name] : event.target.value})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
             await axios.put(`${import.meta.env.VITE_API}/movies/update-movie`, {
              ...editMovie,
              "poster" : response.data.secure_url
            }, {
              headers : {
                authtoken : localStorage.userinfo
              }
            }).then((response) => {
              if(response.status == 200) {
                FetchAllMovies(localStorage.userinfo)
                toast.success('Updated movie successfully')
                setShowEditModal(false)
                
              }
            })
          }
        })
      } else {
        await axios.put(`${import.meta.env.VITE_API}/movies/update-movie`, {
          ...editMovie,
        }, {
          headers : {
            authtoken : localStorage.userinfo
          }
        }).then((response) => {
          if(response.status == 200) {
            FetchAllMovies(localStorage.userinfo)
            setShowEditModal(false)
            console.log(response.data)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    FetchAllMovies(localStorage.userinfo);

  }, []);
  return (
    <>
    <ToastContainer />
    <DataTable
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      // provide data
      records={records}
      // define columns
      columns={[
        {
          accessor: "id",
          title: "#",
          textAlignment: "right",
        },
        {
          accessor: "poster",
          title: "Poster",
          render : ({ poster }) => (
            <img src={poster} className="w-36 mx-auto" />
          )
        },
        {
          accessor: "title",
          title: "title",
          filter: (
            <TextInput
              label="Title"
              description="Show email whose names include the specified text"
              placeholder="Search email..."
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          ),
          filtering: query !== "",
        },
        {
          accessor: "desc",
          title: "Description",
        },
        {
          accessor: "duration",
          title: "Duration",
        },
        {
          accessor: "genre",
          title: "Genre",
        },
        {
          accessor: "language",
          title: "Language",
        },
        {
          accessor: "releaseDate",
          title: "ReleaseDate",
          render: ({ releaseDate }) => moment(releaseDate).format("ll"),
        },
        {
          accessor: "Tools",
          width: 130,
          render: ({ _id }) => (
            <div>
              <button onClick={() => FetchMovie(localStorage.userinfo, _id)}
                className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
              >
                <FontAwesomeIcon icon={faEye} color="white" />
              </button>

              <button
                className='bg-emerald-600 w-10 h-10 rounded-xl  mx-1 my-1 hover:bg-emerald-700'>
                <FontAwesomeIcon icon={faTrash} color="white" />
              </button>
            </div>
          ),
        },
      ]}
      totalRecords={movies.length}
      paginationColor="grape"
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
    />

      <ModalEditMovie  isVisible={showEditModal} onClose={() => setShowEditModal(false)} >
      <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">View Movie</h3>

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
                value={editMovie.title}
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
                value={editMovie.desc}
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
                value={editMovie.duration}
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
              <select name="genre" value={editMovie.genre} onChange={handleChange} className="select select-bordered bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg" required>
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
              <select onChange={handleChange}  value={editMovie.language} className="select select-bordered bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg" name="language" required>
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
                value={moment(editMovie.releaseDate).format('YYYY-MM-DD')}
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
                className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              />
            </div>



            <button className="bg-blue-600 text-base-100 font-semibold w-full h-10 rounded-lg hover:bg-blue-700 focus:bg-blue-400">
              Save
            </button>
          </form>
        </div>
      </ModalEditMovie>

  </>
  )
}

export default TableAllMovies