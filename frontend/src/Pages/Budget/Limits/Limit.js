import React from "react";
import { isDateCurrOrFutureMonth } from "../../../func";

export default function Limit(props) {
  const { obj, editLimit, spents } = props;
  const { _id, category, limit, date } = obj;

  let spent;
  for (let i = 0; i < spents.length; i++) {
    if (spents[i].category === category.title) {
      spent = spents[i].spent;
      break;
    }
  }

  let balancePercentage;
  let spentPercentage;

    if(spent === 0 && limit === 0){
      balancePercentage = '50%';
      spentPercentage = '50%';
    }else if(limit-spent < 0){
      balancePercentage = '0%';
      spentPercentage = '100%';
    }
    else if (spent === 0) {
      balancePercentage = '100%';
      spentPercentage = '0%'
    } else {
      balancePercentage = ((limit-spent) / ((limit-spent) + spent)) * 100 + "%";
      spentPercentage = (spent / ((limit-spent) + spent)) * 100 + "%";
    }

    let balance = limit-spent;
    balance = balance > 0 ? balance.toFixed(2) + "€" : null;
    const balanceMinWidth = limit == 0 || limit-spent < 0 ? 0 : "50px";
    const balanceBorderRadius = (!spent && limit)? "5px" : "5px 0px 0px 5px";


    const ttl_spent = spent > 0 ? spent.toFixed(2) + "€" : null; 
    const spentMinWidth = spent == 0 ? 0 : "70px";
    const spentBorderRadius = (!limit && spent) || limit-spent < 0 ? "5px" : "0px 5px 5px 0px";

  return (
    <div className="budget-limit-container">
      <div className="budget-limit__category-img-container"><img src={category.imgSrc} className="budget-limit__category-icon" /></div>
      <h3>{category.title }</h3>
      <div className="budget-linechart">
        <div className="horizontal-bar__pelnas" title={`Likutis ${!limit && !spent ? `0.00€` :  balance}`} style={{width: balancePercentage, minWidth: balanceMinWidth, borderRadius: balanceBorderRadius}}>{!limit && !spent ? `0.00€` :  balance}</div>
        <div className="horizontal-bar__islaidos" title={`Išlaidos ${!limit && !spent ? `0.00€` :  ttl_spent}`} style={{width: spentPercentage, minWidth: spentMinWidth, borderRadius: spentBorderRadius}}>{!limit && !spent ? `0.00€` :  ttl_spent} </div>
      </div>
      <div className="budget-limit-info">
        <h4>
           Nustatytas biudžetas: <span className="green"> {limit.toFixed(2)} €</span>
        </h4>
      </div>
      {isDateCurrOrFutureMonth(date)  ? <button className="budget-limit__set-btn" onClick={() => editLimit(_id)}>Nustatyti</button> : null}
    </div>
  );
}
