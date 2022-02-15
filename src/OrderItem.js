import React, { useState } from "react";
import "./Login.css";

function OrderItem({ order }) {
  let { name, tlf, email, address, postalCode, city, quantity } = order;
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    setHide((oldState) => !oldState);
  };
  return (
    <tbody>
      <tr>
        <td style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <span style={{ flex: 0.1, marginLeft: "10px" }}>
            <input type="checkbox" className="checkbox" onClick={toggleHide} />
          </span>
          <span>{name}</span>
        </td>
        <td>{tlf}</td>
        <td>{email}</td>
        <td>{address}</td>
        <td>{postalCode}</td>
        <td>{city}</td>
        <td>{quantity}</td>
      </tr>
    </tbody>
  );
}

export default OrderItem;
