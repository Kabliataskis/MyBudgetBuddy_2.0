import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import User from "./User";
import UserEdit_Modal from "./UserEditModal";
import UserCreate_Modal from "./UserCreateModal";
import { getPageNumbers } from "../../../func";
import BeatLoader from "react-spinners/BeatLoader";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
export const Users = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState();
  const [modal_UserEdit, setModal_UserEdit] = useState(false);
  const [modal_UserCreate, setModal_UserCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/auth");
      setUsers(res.data.data.users);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const editUser = async (id) => {
    setEditId(id);
    setModal_UserEdit(true);
  };
  const deleteUser = (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite ištrinti šį vartotoją?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#243743",
        confirmButtonText: "Ištrinti",
        cancelButtonText: "Atšaukti!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.delete("/user/" + id);
            swal.fire({
              title: "Sėkmingai",
              text: "Vartotojas ištrintas",
              icon: "success",
              confirmButtonColor: "#28b78d",
            });
            getUsers();
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
      });
  };
  const updateUserRole = async (e, id, username) => {
    let role = e.target.value;
    try {
      const res = await axios.patch("/user/role/" + id, {
        role,
      });
      getUsers();
      toast.success(`Vartotojo ${username} rolė atnaujinta`);
    } catch (err) {
      console.log(err);
      toast.error(`Klaida. ${err.response.data.msg}`);
    }
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filterUsers = users.filter((el) => {
    const title = el.username || "";
    const date = el.createdAt || "";
    const lowercaseValue = value ? value.toLocaleLowerCase() : "";

    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    const incomeDateObj = date ? new Date(date) : null;

    const dateInRange =
      (!startDateObj ||
        startDateObj <= incomeDateObj.setHours(0, 0, 0, 0) + 86400000) &&
      (!endDateObj || endDateObj >= incomeDateObj.setHours(0, 0, 0, 0));

    return title.toLocaleLowerCase().includes(lowercaseValue) && dateInRange;
  });

  const removeFilter = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setValue("");
    setStartDate("");
    setEndDate("");
  };

  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const totalItems = filterUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let users_list = filterUsers.slice(startIndex, endIndex).map((el) => {
    return (
      <User
        key={uuidv4()}
        obj={el}
        editUser={editUser}
        deleteUser={deleteUser}
        updateUserRole={updateUserRole}
      />
    );
  });

  return (
    <div className="container-pajamos flex_container">
      <UserEdit_Modal
        editId={editId}
        setEditId={setEditId}
        modal_UserEdit={modal_UserEdit}
        setModal_UserEdit={setModal_UserEdit}
        getUsers={getUsers}
      />
      <UserCreate_Modal
        modal_UserCreate={modal_UserCreate}
        setModal_UserCreate={setModal_UserCreate}
        getUsers={getUsers}
      />
      <div className="table_main">
        <table>
          <thead>
            <tr>
              <th>Reg. data</th>
              <th>Slapyvardis</th>
              <th>El. paštas</th>
              <th>Rolė</th>
              <th>Redaguoti</th>
              <th>Pašalinti</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <BeatLoader
                    color="#28b78d"
                    loading
                    margin={2}
                    size={20}
                    cssOverride={{
                      display: "block",
                    }}
                  />
                </td>
              </tr>
            ) : (
              users_list
            )}
          </tbody>
        </table>
        <div className="pagination-container">
          <ul>
            <li disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
              <MdKeyboardDoubleArrowLeft />
            </li>
            <li
              onClick={() =>
                setCurrentPage(
                  currentPage === 1 ? currentPage - 0 : currentPage - 1
                )
              }
            >
              <MdKeyboardArrowLeft />
            </li>

            {getPageNumbers(totalPages, currentPage).map((page, index) => (
              <li
                className={currentPage === page ? "select" : ""}
                key={index}
                onClick={() => {
                  if (page === "...") {
                    return;
                  }
                  setCurrentPage(page);
                }}
              >
                {page}
              </li>
            ))}

            <li
              onClick={() =>
                setCurrentPage(
                  endIndex >= users.length ? currentPage - 0 : currentPage + 1
                )
              }
            >
              <MdOutlineKeyboardArrowRight />
            </li>
            <li
              onClick={() =>
                setCurrentPage(
                  endIndex >= users.length ? currentPage - 0 : totalPages
                )
              }
            >
              <MdKeyboardDoubleArrowRight />
            </li>
          </ul>
        </div>
      </div>

      <div className="filter-block">
        <button
          className="Admin-createBtn"
          onClick={() => setModal_UserCreate(true)}
        >
          Sukurti vartotoją
        </button>
        <h3 className="Admin-filter-title">Filtravimas</h3>
        <div>
          <form>
            <input
              type="text"
              placeholder="Vartotojo slapyvardis..."
              className="paieska_filter"
              onChange={(event) => setValue(event.target.value)}
              value={value}
            />
            <p className="data_filter_p">
              <label className="word" htmlFor="nuo_data">
                Nuo
              </label>
              <input
                onChange={(event) => setStartDate(event.target.value)}
                className="data_filter"
                type="date"
                id="nuo_data"
                value={startDate}
              />

              <label className="word2" htmlFor="iki_data">
                iki
              </label>
              <input
                onChange={(event) => setEndDate(event.target.value)}
                className="data_filter"
                type="date"
                id="iki_data"
                value={endDate}
              />
            </p>
            <button
              className="btn-dark"
              onClick={(event) => removeFilter(event)}
            >
              Išvalyti
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
