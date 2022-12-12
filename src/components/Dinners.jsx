import React from "react";

export default function Dinners(props) {
  console.log(props.dinner);
  const thisDinner = props.dinner.map((item) => item + ", ");
  return <li className="dinner-list">{thisDinner}</li>;
}
