/* eslint-disable linebreak-style */
import react from "react";
import "./Budget.css";
import Center_Block from "./CenterBlock/Center_block";
import Limits from "./Limits/Limits";
import TopBlock from "./TopBlock/TopBlock";

export default function Budget() {
  return (
    <div className="Budget-container Budget">
      <TopBlock />
      <Center_Block/>
      <Limits/>
    </div>
  );
  }
