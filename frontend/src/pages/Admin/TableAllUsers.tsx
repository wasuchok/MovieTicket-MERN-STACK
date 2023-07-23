import { TextInput } from "@mantine/core";
import axios from "axios";
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalEditUser from "./ModalEditUser";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IUser {
  _id?: number;
  id?: number;
  email: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin: boolean;
  __v?: number;
}


const PAGE_SIZES = [5, 10, 15];

const DataTableComponent = () => {
  const { userinfo } = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [data, setData] = useState<IUser[]>([]);
  let User : IUser[] = [];

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, pageSize));

  const [userSingle, setUserSingle] = useState<IUser>({
    username: "",
    email: "",
    isAdmin: false,
  });

  const handleIsAdmin = (e : boolean) => {
    console.log(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSingle({ ...userSingle, [e.target.name]: e.target.value });
  };

  const ViewUser = async (_id : number | undefined, authtoken: string) => {
    setShowModal(true);
    const response = await axios.post(
      `${import.meta.env.VITE_API}/users/readUser`,
      {
        _id,
      },
      {
        headers: {
          authtoken,
        },
      }
    );
    setUserSingle(response.data);
  };

  const onSubmit = async (e : ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await axios.post(`${import.meta.env.VITE_API}/users/editUser`, {
        _id : userSingle._id,
        ...userSingle
      }, {
        headers : {
          authtoken : localStorage.userinfo
        }
      }).then((response) => {
        if(response.status == 200) {
          FetchAllUser(localStorage.userinfo)
          setShowModal(false);
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const DeleteUser = async (_id: number | undefined, authtoken: string) => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API}/users/deleteUser`,
          {
            _id,
          },
          {
            headers: {
              authtoken,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            FetchAllUser(authtoken);
            console.log(response.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize]);

  useEffect(() => {
    setRecords(
      data.filter((usr) => {
        if (query.length < 4) return data;
        if (usr.email.toLowerCase().includes(query) == false) {
          return false;
        } else {
          return usr.email.toLowerCase().includes(query);
        }
      })
    );
  }, [query]);

  const FetchAllUser = async (authtoken: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API}/users`, {
      headers: {
        authtoken,
      },
    });

    if (response.status == 200) {
      response.data.data.map((user: IUser, i: number) => {
        User.push({ ...user, id: i + 1 });
      });
      setRecords(User);
      setData(User);
    }
  };

  useEffect(() => {
    FetchAllUser(localStorage.userinfo);
  }, []);

  return (
    <>
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
            accessor: "email",
            title: "Email",
            filter: (
              <TextInput
                label="Email"
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
            accessor: "username",
            title: "Username",
          },
          {
            accessor: "createdAt",
            title: "Create",
            render: ({ createdAt }) => moment(createdAt).format("ll"),
          },
          {
            accessor: "updatedAt",
            title: "Update",
            render: ({ updatedAt }) => moment(updatedAt).fromNow(),
          },
          {
            accessor: "Tools",
            width: 130,
            render: ({ _id }) => (
              <div>
                <button
                  className="bg-blue-600 w-10 h-10 rounded-xl hover:bg-blue-700 mx-1 my-1"
                  onClick={() => ViewUser(_id, localStorage.userinfo)}
                >
                  <FontAwesomeIcon icon={faEye} color="white" />
                </button>

                <button
                  className={` w-10 h-10 rounded-xl  mx-1 my-1   ${
                    userinfo._id == _id
                      ? "bg-zinc-800"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                  onClick={() => DeleteUser(_id, localStorage.userinfo)}
                  disabled={userinfo._id == _id ? true : false}
                >
                  <FontAwesomeIcon icon={faTrash} color="white" />
                </button>
              </div>
            ),
          },
        ]}
        totalRecords={data.length}
        paginationColor="grape"
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
      <ModalEditUser isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">Read User</h3>

          <form onSubmit={onSubmit}>

          <div className="my-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={userSingle.email}
              required
              className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={userSingle.username}
              className="bg-gray-50 border border-gray-300 focus:border-blue-500 block w-full p-2.5 rounded-lg"
              required
            />
          </div>

          <div className="my-4">
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={userSingle.isAdmin}
                onChange={(e : ChangeEvent<HTMLInputElement>) => handleIsAdmin(e.target.checked)}
                
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Admin
              </span>
            </label>
          </div>

          <button className="bg-blue-600 text-base-100 font-semibold w-full h-10 rounded-lg hover:bg-blue-700 focus:bg-blue-400">
            Save
          </button>

          </form>
        </div>
      </ModalEditUser>
    </>
  );
};

export default DataTableComponent;
