import React, { useState, useEffect } from "react";
import "./Login.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import OrderItem from "./OrderItem";
import Pagination from "./Pagination";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function Login() {
  const [users, setUsers] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [finished, setFinished] = useState(false);

  const usersCollectionRef = collection(db, "users");
  const ordersCollectionRef = collection(db, "orders");
  const finishedOrdersCollectionRef = collection(db, "finishedOrders");

  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(5);

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

    const getFinishedUsers = async () => {
      const res = await getDocs(finishedOrdersCollectionRef);
      setDeletedProducts(
        res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getFinishedUsers();
    getUsers();
  }, [deletedProducts]);

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

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const indexOfLastProduct = currentPage * prodPerPage;
  const indexOfFirstProduct = indexOfLastProduct - prodPerPage;
  const currentProducts = filterOrders.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
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
              <div className="tabs">
                <h3>Dashboard</h3>
                <a
                  className={finished ? "orderTab" : "orderTab active"}
                  onClick={() => setFinished(false)}
                >
                  <SubscriptionsIcon
                    fontSize="small"
                    style={{ marginRight: "10px" }}
                  />
                  <p>Orders</p>
                </a>
                <a
                  className={
                    finished ? "finishedOrderTab active" : "finishedOrderTab"
                  }
                  s
                  onClick={() => setFinished(true)}
                >
                  <DeleteSweepIcon
                    fontSize="small"
                    style={{ marginRight: "10px" }}
                  />
                  <p>Finished</p>
                </a>
              </div>
              <input
                type="text"
                placeholder="Søk etter navn..."
                className="search"
                onChange={(e) => sortUsers(e.target.value)}
              />
              {finished ? <h1>Deleted Orders</h1> : <h1>Orders</h1>}
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
                {finished
                  ? deletedProducts.map((order) => {
                      return <OrderItem key={order.id} order={order} />;
                    })
                  : currentProducts.map((order) => {
                      return <OrderItem key={order.id} order={order} />;
                    })}
              </table>
              {finished ? (
                <Pagination
                  productsPerPage={prodPerPage}
                  totalProducts={deletedProducts.length}
                  paginate={paginate}
                />
              ) : (
                <Pagination
                  productsPerPage={prodPerPage}
                  totalProducts={filterOrders.length}
                  paginate={paginate}
                />
              )}
              <div className="selectDiv">
                <select
                  className="select"
                  onChange={(e) => setProdPerPage(e.target.value)}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                </select>
              </div>
              <p></p>
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
