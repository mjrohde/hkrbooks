import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

function Homepage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tlf, setTlf] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState(299);

  const usersCollectionRef = collection(db, "orders");
  const book = "Gudmoren";

  const price = 299;

  function calculateTotal(quantity) {
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
    });
  };

  return (
    <div className="container">
      <div className="input-container">
        <h1>Order for {book}</h1>
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
                type="number"
                placeholder="Tlf..."
                className="input tlf"
                onChange={(e) => setTlf(e.target.value)}
              />
            </div>
            <div>
              <span>
                <label htmlFor="input email">Email:</label>
              </span>
              <input
                type="text"
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
                placeholder="1"
                className="input quantity"
                onChange={
                  ((e) => setQuantity(e.target.value),
                  (e) => calculateTotal(e.target.value))
                }
              />
            </div>
          </span>
        </div>
        <div className="button">
          <button onClick={() => setOrder()}>Place Order</button>
        </div>
        <p>*Din bestilling vil ikke bli sendt før betaling er gjennomført</p>
        <h3>
          {"Total price: "}
          {total} {" kr"}
        </h3>
      </div>
    </div>
  );
}

export default Homepage;
