import React, { useState } from "react";
import "./Login.css";
import { db } from "./firebase-config";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { collection, doc, deleteDoc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function OrderItem({ order, finished }) {
  let { id, name, tlf, email, address, postalCode, city, quantity, total } =
    order;
  const [check, setCheck] = useState(false);
  const [hover, setHover] = useState(false);

  const ordersCollectionRef = collection(db, "orders");
  const finishedOrdersCollectionRef = collection(db, "finishedOrders");

  let navigate = useNavigate();

  const handleChecked = (checkbox) => {
    checkbox ? setCheck(true) : setCheck(false);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(ordersCollectionRef, id));
    await addDoc(finishedOrdersCollectionRef, {
      name: order.name,
      tlf: order.tlf,
      email: order.email,
      address: order.address,
      postalCode: order.postalCode,
      city: order.city,
      quantity: order.quantity,
      total: order.total,
    });
  };

  const handleFullDelete = async () => {
    await deleteDoc(doc(finishedOrdersCollectionRef, id));
  };

  return (
    <tbody>
      <tr>
        <td
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            position: "relative",
          }}
        >
          <span style={{ flex: 0.1, marginLeft: "10px" }}>
            <input
              type="checkbox"
              className="checkbox"
              value={name}
              onClick={(e) => handleChecked(e.target.checked)}
            />
            {check ? (
              finished ? (
                <PersonRemoveIcon
                  onClick={() => handleFullDelete()}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  fontSize="large"
                  style={{
                    color: hover ? "red" : "white",
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                  }}
                />
              ) : (
                <DeleteIcon
                  onClick={() => handleDelete()}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  fontSize="large"
                  style={{
                    color: hover ? "red" : "white",
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                  }}
                />
              )
            ) : null}
          </span>
          <span>{name}</span>
        </td>
        <td>{tlf}</td>
        <td>{email}</td>
        <td>{address}</td>
        <td>{postalCode}</td>
        <td>{city}</td>
        <td>{quantity}</td>
        <td>{total}</td>
      </tr>
    </tbody>
  );
}

export default OrderItem;
