import React from "react";

export default function Dinners(props) {
  const thisDinner = props.dinner.map((item) => item + ", ");
  return <li>{thisDinner}</li>;
}
