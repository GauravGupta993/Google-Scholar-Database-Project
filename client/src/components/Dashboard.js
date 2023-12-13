import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(0);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    // <div>
    //   <h1 className="mt-5">Dashboard</h1>
    //   <h2>Welcome {name}</h2>
    //   <button onClick={e => logout(e)} className="btn btn-primary">
    //     Logout
    //   </button>
    // </div>
    <div className="App">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="">Dashboard</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            </ul>
            {/* <li class="nav-item nav-link active ml-auto list-unstyled">
            <Link to="/admin" >Edit Users</Link>
            </li> */}
            <li class="nav-item ml-auto list-unstyled">
              <button className="btn btn-primary" onClick={e=> logout(e)}>Logout</button>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> */}
        </div>
      </div>
    </nav>
     <h1 className="mt-5">Dashboard</h1>
    <h2>Welcome {name}</h2>
  </div>
  );
};

export default Dashboard;