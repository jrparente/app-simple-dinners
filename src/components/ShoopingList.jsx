import React from "react";

export default function ShoppingList(props) {
  let thisWeeksList = props.list.map((item) => item + ", ");

  return <p>Shopping List: {thisWeeksList}</p>;
}
