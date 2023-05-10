import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import User from "./User";
import UserEdit_Modal from "./UserEditModal";
export const Users = () => {
  const [value, setValue] = useState("");
  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [users, setUsers] = useState([
    {
      id: 1,
      date: "2023-03-28",
      username: "Vardenis",
      email: "slapyvardis123@gmail.com",
    },
  ]);
  const [editId, setEditId] = useState();
  const [modal_UserEdit, setModal_UserEdit] = useState(false);
  const getUsers = async () => {
    try {
      const res = await axios.get("/auth");
      setUsers(res.data.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const editUser = async (id) => {
    console.log(id);
    setEditId(id);
    setModal_UserEdit(true);
  };
  const deleteUser = (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite šį vartotoją?",
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
            const res = await axios.delete("/auth/" + id);
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
  }
  const updateUserRole = async (e, id, username) => {
    console.log(id);
    let role = e.target.value;
    try{
      const res = await axios.patch("/auth/role/"+id, {
        role
      });
      getUsers();
      // swal.fire({
      //   title: "Sėkmingai",
      //   text: "Vartotojo rolė atnaujinta",
      //   icon: "success",
      //   confirmButtonColor: "#28b78d",
      // });
      toast.success(`Vartotojo ${username} rolė atnaujinta`);
    } catch (err){
      console.log(err);
      toast.error(`Klaida. ${err.response.data.msg}`);
    }

  }
  const filterUsers = users.filter((el) => {
    const title = el.title || ""; // fallback to an empty string if title is undefined or null
    const lowercaseValue = value ? value.toLocaleLowerCase() : ""; // fallback to an empty string if value is undefined or null
    return title.toLocaleLowerCase().includes(lowercaseValue);
  });

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
        modal_UserEdit={modal_UserEdit}
        setModal_UserEdit={setModal_UserEdit}
        getUsers={getUsers}
      />
      <div className="table_main">
        <table>
          <thead>
            <tr>
              <th>Reg. Data</th>
              <th>Slapyvardis</th>
              <th>El. Paštas</th>
              <th>Rolė</th>
              <th>Redaguoti</th>
              <th>Pašalinti</th>
            </tr>
          </thead>
          <tbody>{users_list}</tbody>
        </table>
      </div>

      <div className="filter-block">
        <h3>Filtravimas</h3>
        <div>
          <form>
            <input
              type="text"
              placeholder="Paieška..."
              className="paieska_filter"
              onChange={(event) => setValue(event.target.value)}
            />
            <p className="data_filter_p">
              <label htmlFor="nuo_data">Nuo</label>
              <input className="data_filter" type="date" id="nuo_data" />
              <label htmlFor="iki_data">iki</label>
              <input className="data_filter" type="date" id="iki_data" />
            </p>
            <button className="btn-dark">Ieškoti</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
