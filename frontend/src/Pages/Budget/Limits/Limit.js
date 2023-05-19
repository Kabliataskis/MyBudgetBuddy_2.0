import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import { isDateCurrOrFutureMonth } from "../../../func";

function Limit(props) {
  const { obj, editLimit, spents } = props;
  const { _id, category, limit, date } = obj;

  let spent;
  for (let i = 0; i < spents.length; i++) {
    if (spents[i].category === category.title) {
      spent = spents[i].spent;
      break;
    }
  }


  const [limitWidth, setLimitWidth] = useState();
  const [spentWidth, setSpentWidth] = useState();
  useEffect(() => {
    if(spent === 0 && limit === 0){
      setLimitWidth("50%");
      setSpentWidth("50%");
    }else if(limit-spent < 0){
      setLimitWidth("0%");
      setSpentWidth("100%");
    }
    else if (spent === 0) {
      setLimitWidth("100%");
      setSpentWidth("0%");
    } else {
      setLimitWidth(((limit-spent) / ((limit-spent) + spent)) * 100 + "%");
      setSpentWidth((spent / ((limit-spent) + spent)) * 100 + "%");
    }
    console.log("effect");
  }, [limit, spent]);

  return (
    <div className="budget-limit-container">
      <div className="budget-limit__category-img-container"><img src={category.imgSrc} className="budget-limit__category-icon" /></div>
      <h3>{category.title }</h3>
      <div className="budget-linechart">
        <div className="horizontal-bar__pelnas" title="Limitas" style={{width: limitWidth}}>{limit-spent} €</div>
        <div className="horizontal-bar__islaidos" title="Išlaidos" style={{width: spentWidth}}>{spent} €</div>
      </div>
      <div className="budget-limit-info">
        <h4>
           Nustatytas biudžetas: <span className="green"> {limit} €</span>
        </h4>
      </div>
      {isDateCurrOrFutureMonth(date)  ? <button className="budget-limit__set-btn" onClick={() => editLimit(_id)}>Nustatyti</button> : null}
    </div>
  );
}

export default React.memo(Limit);