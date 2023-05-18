import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";

export default function Limit(props) {
  const { obj, editLimit, spents } = props;
  const { _id, category, limit } = obj;
  const [currLimit, setCurrLimit] = useState({
    amount: limit,
    status: false,
  });
  function statusChange() {
    setCurrLimit((prevLimit) => ({
      ...prevLimit,
      status: !prevLimit.status,
    }));
  }
  let spent;
  for (let i = 0; i < spents.length; i++) {
    if (spents[i].category === category.title) {
      spent = spents[i].spent;
      break;
    }
  }

  const handleLimitChange = (e) => {
    setCurrLimit((prevLimit) => ({
      ...prevLimit,
      amount: e.target.value,
    }));
  };

  const [limitWidth, setLimitWidth] = useState();
  const [spentWidth, setSpentWidth] = useState();
  useEffect(() => {
    if (spent === 0 && limit === 0) {
      setLimitWidth("50%");
      setSpentWidth("50%");
    } else if (spent === 0) {
      setLimitWidth("100%");
      setSpentWidth("0%");
    } else {
      setLimitWidth((limit / (limit + spent)) * 100 + "%");
      setSpentWidth((spent / (limit + spent)) * 100 + "%");
    }
    console.log("effect");
  }, [limit, spent]);

  return (
    <div className="budget-limit-container">
      <img src={category.imgSrc} className="budget-limit__category-icon" />
      <h3>{category.title}</h3>
      <div className="budget-linechart">
        <div className="horizontal-bar__pelnas" style={{ width: limitWidth }}>
          {limit} €
        </div>
        <div className="horizontal-bar__islaidos" style={{ width: spentWidth }}>
          {spent} €
        </div>
      </div>
      <div className="budget-limit-info">
        <h4>
          Nustatytas biudžetas:
          <span className="green"> {currLimit.amount} €</span>
          <span
            className="red budget-limit__editBtn"
            onClick={() => editLimit(_id)}
          >
            <FaPen />
          </span>
        </h4>

        <h4>
          Vidutiniškai išleidžiama: <span className="red">1045.45 €</span>
        </h4>
      </div>
    </div>
  );
}
