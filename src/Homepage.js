import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import MuiPhoneNumber from "material-ui-phone-number";

function Homepage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tlf, setTlf] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(150);
  const [display, setDisplay] = useState(false);

  const usersCollectionRef = collection(db, "orders");

  const book = "Gudmoren";

  const price = 150;

  function calculateTotal(quantity) {
    setQuantity(quantity);
    setTotal(price * quantity);
  }

  const setOrder = async () => {
    await addDoc(usersCollectionRef, {
      name: name,
      address: address,
      postalCode: postal,
      city: city,
      quantity: quantity.toString(),
      tlf: tlf.toString(),
      email: email,
      total: total.toString(),
      book: book,
    });
    let elements = [];
    elements = document.getElementsByClassName("input");
    for (var i = 0; i < elements.length; i++) {
      elements[i].value = "";
    }

    const q = query(usersCollectionRef, where("name", "==", name));

    const data = await getDoc(q);
    data.forEach((doc) => {
      console.log(doc.data());
    });
  };

  function sendOrder() {
    quantity != "" &&
    quantity > 0 &&
    name != "" &&
    address != "" &&
    city != "" &&
    tlf != "" &&
    email != ""
      ? setOrder() && setDisplay(true)
      : alert("Please fill in all fields below.");
  }

  return (
    <div className="container">
      <div className="thankYou" style={{ display: display ? "block" : "none" }}>
        <h1>Thank you for your order!</h1>
      </div>
      <div
        className="input-container"
        style={{ display: display ? "none" : null }}
      >
        <h1>Order {book}</h1>
        <div>
          <span>
            <div>
              <span>
                <label htmlFor="input name">Full Name:</label>
              </span>
              <input
                type="text"
                placeholder="Full Name..."
                className="input name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <span>
                <label htmlFor="input tlf">Tlf:</label>
              </span>
              <input
                type="tel"
                placeholder="Tlf..."
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                className="input tlf"
                onChange={(e) => setTlf(e.target.value)}
              />
            </div>
            <div>
              <span>
                <label htmlFor="input email">Email:</label>
              </span>
              <input
                type="e-mail"
                placeholder="E-mail..."
                className="input email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </span>
          <span>
            <div>
              <span>
                <label htmlFor="input address">Address:</label>
              </span>
              <input
                type="text"
                placeholder="Address"
                className="input address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <span>
                <label htmlFor="input postal">Postal code:</label>
              </span>
              <input
                type="text"
                placeholder="0604"
                className="input postal"
                onChange={(e) => setPostal(e.target.value)}
              />
            </div>
            <div>
              <span>
                <label htmlFor="input city">City:</label>
              </span>
              <input
                type="text"
                placeholder="City"
                className="input city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </span>
        </div>
        <div>
          <span>
            <div>
              <span>
                <label htmlFor="input quantity">Quantity:</label>
              </span>

              <input
                type="number"
                placeholder="0"
                className="input quantity"
                onChange={(e) => calculateTotal(e.target.value)}
              />
            </div>
          </span>
        </div>
        <div className="deliveryPrice">
          <p className="delivery">
            *Din bestilling vil ikke bli sendt før betaling er gjennomført
            <br />
            Vipps-krav blir sendt om litt.
          </p>
          <h3>
            {"Total price: "}
            {total} {" kr"}
          </h3>
        </div>
        <div className="button">
          <button onClick={() => sendOrder()}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
