import React from "react";
import Item from "./item.jsx";

export default function List({ items }) {
  return (
    <div className="list">
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
