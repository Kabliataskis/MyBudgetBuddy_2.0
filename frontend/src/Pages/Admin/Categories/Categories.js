import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Category from "./Category";
import CategoryCreate_Modal from "./CategoryCreateModal";
import CategoryEditModal from "./CategoryEditModal";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import axios from "../../../axios";
export const Categories = () => {
  const [modal_categoryCreate, setModal_categoryCreate] = useState(false);
  const [modal_categoryEdit, setModal_categoryEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [value, setValue] = useState("");
  const [pageSize, setPageSize] = useState(10); // number of records per page
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("/category?");
      setCategories(res.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const editCategory = (id) => {
    setEditId(id);
    setModal_categoryEdit(true);
  }

  const deleteCategory = (id) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite ištrinti šią kategoriją?",
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
            const res = await axios.delete("/category/" + id);
            console.log(res);
            swal.fire({
              title: "Sėkmingai",
              text: "Kategorija ištrinta",
              icon: "success",
              confirmButtonColor: "#28b78d",
            });
            getCategories();
          } catch (err) {
            toast.error(err.response.data.msg);
          }
        }
      });
  }

  const filterCategory = categories.filter((el) => {
    const title = el.title || ""; // fallback to an empty string if title is undefined or null
    const lowercaseValue = value ? value.toLocaleLowerCase() : ""; // fallback to an empty string if value is undefined or null
    return title.toLocaleLowerCase().includes(lowercaseValue);
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let categories_list = filterCategory.slice(startIndex, endIndex).map((el) => {
    return (
      <Category
        key={uuidv4()}
        obj={el}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />
    );
  });


  return (
      <div className="container-pajamos flex_container">
        <CategoryCreate_Modal
        getCategories={getCategories}
        modal_categoryCreate={modal_categoryCreate}
        setModal_categoryCreate={setModal_categoryCreate}
      />
      <CategoryEditModal
        getCategories={getCategories}
        modal_categoryEdit={modal_categoryEdit}
        setModal_categoryEdit={setModal_categoryEdit}
        editId={editId}
      />
        <div className="table_main">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Pavadinimas</th>
                <th>Paveikslėlis</th>
                <th>Redaguoti</th>
                <th>Pašalinti</th>
              </tr>
            </thead>
            <tbody>{categories_list}</tbody>
          </table>
          </div>

          <div className="filter-block">
          <button className="Admin-createBtn" onClick={() => setModal_categoryCreate(true)}>Sukurti kategoriją</button>
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

export default Categories;
