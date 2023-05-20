/* eslint-disable linebreak-style */
import React from "react";
import "./Budget.css";
import Limits from "./Limits/Limits";
import TopBlock from "./TopBlock/TopBlock";
import Center_Block from "./CenterBlock/Center_block";

export default function Budget() {
  return (
    <div className="Budget-container Budget">
      <TopBlock />
      <Center_Block/>
    <Limits/>
    </div>
  );
  }
