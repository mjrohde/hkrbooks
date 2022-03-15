import React, { useState, useEffect } from "react";
import "./Login.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import OrderItem from "./OrderItem";
import Pagination from "./Pagination";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Login() {
  const [users, setUsers] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [filterDeleted, setFilterDeleted] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hover, setHover] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const usersCollectionRef = collection(db, "users");
  const ordersCollectionRef = collection(db, "orders");
  const finishedOrdersCollectionRef = collection(db, "finishedOrders");

  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(10);

  let navigate = useNavigate();

  function checkUserName() {
    if (users[0].username === username && users[0].password === password) {
      setAdmin(true);
      localStorage.setItem("admin", users[0]);
    } else {
      setAdmin(false);
      alert("Wrong password or username");
    }
  }

  function sortUsers(searchTerm) {
    const tempfilteredUsers = orders.filter((order) => {
      return (
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.book.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilterOrders(tempfilteredUsers);
  }

  function logout() {
    localStorage.removeItem("admin", users[0]);
    navigate("/");
  }

  useEffect(() => {
    localStorage.length == 1
      ? setAdmin(true) && setLoading(false)
      : setAdmin(false);
  }, []);

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
      setFilterDeleted(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getFinishedUsers();
    getUsers();
  }, [deletedProducts]);

  useEffect(() => {
    setLoading(true);
    const getOrders = async () => {
      const res = await getDocs(ordersCollectionRef);
      setOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilterOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    setLoading(false);

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
              <LogoutIcon
                fontSize="large"
                style={{
                  position: "absolute",
                  top: "3%",
                  right: "5%",
                  color: hover ? "#e9312b" : "white",
                }}
                onClick={() => logout()}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
              <MenuIcon
                onClick={() => setShowMenu(true)}
                style={{ position: "absolute", top: "3%", left: "5%" }}
                fontSize="large"
              />

              <div className="tabs" style={{ width: showMenu ? "250px" : 0 }}>
                <CloseIcon
                  onClick={() => setShowMenu(false)}
                  style={{ position: "absolute", top: "1%", right: "5%" }}
                  fontSize="large"
                />
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
                  onClick={() => setFinished(true)}
                >
                  <DeleteSweepIcon
                    fontSize="small"
                    style={{ marginRight: "10px" }}
                  />
                  <p>Finished</p>
                </a>
                <a className="change "></a>
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
                  <tr className="table-header">
                    <td>Name</td>
                    <td>Tlf</td>
                    <td>Email</td>
                    <td>Adress</td>
                    <td>Postal</td>
                    <td>City</td>
                    <td>Quantity</td>
                    <td>Total price</td>
                    <td>Book</td>
                  </tr>
                </tbody>
                {finished
                  ? filterDeleted.map((order) => {
                      return (
                        <OrderItem
                          key={order.id}
                          order={order}
                          finished={true}
                        />
                      );
                    })
                  : currentProducts.map((order) => {
                      return (
                        <OrderItem
                          key={order.id}
                          order={order}
                          finished={false}
                        />
                      );
                    })}
              </table>
              <div className="paginationSelectPage">
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
                    value={prodPerPage}
                    onChange={(e) => setProdPerPage(e.target.value)}
                  >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                  </select>
                </div>
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
