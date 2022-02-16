import React, { useState, useEffect } from "react";
import "./Login.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import OrderItem from "./OrderItem";

function Login() {
  const [users, setUsers] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const usersCollectionRef = collection(db, "users");
  const ordersCollectionRef = collection(db, "orders");

  function checkUserName() {
    if (users[0].username === username && users[0].password === password) {
      setAdmin(true);
    } else {
      setAdmin(false);
      alert("Wrong password or username");
    }
  }

  function sortUsers(searchTerm) {
    const tempfilteredUsers = orders.filter((order) => {
      return order.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterOrders(tempfilteredUsers);
  }

  useEffect(() => {
    const getUsers = async () => {
      const res = await getDocs(usersCollectionRef);
      setUsers(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const res = await getDocs(ordersCollectionRef);
      setOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilterOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getOrders();
  }, [admin]);
  return (
    <div>
      {loading ? (
        <div className="dots">
          <div className="dot red" />
          <div className="dot green" />
          <div className="dot yellow" />
        </div>
      ) : (
        <div>
          {admin ? (
            <div className="table-view">
              <input
                type="text"
                placeholder="Søk etter navn..."
                className="search"
                onChange={(e) => sortUsers(e.target.value)}
              />
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Tlf</td>
                    <td>Email</td>
                    <td>Adress</td>
                    <td>Postal</td>
                    <td>City</td>
                    <td>Quantity</td>
                    <td>Total price</td>
                  </tr>
                </tbody>
                {filterOrders.map((order) => {
                  return <OrderItem key={order.id} order={order} />;
                })}
              </table>
            </div>
          ) : (
            <div className="containerLogin">
              <h1>User login</h1>
              <input
                type="text"
                placeholder="Username"
                className="input username"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button">
                <button onClick={() => checkUserName()}>Login</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
