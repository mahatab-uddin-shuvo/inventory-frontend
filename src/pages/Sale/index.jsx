import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import loginCheck from "../../helpers/loginCheck";
import Cookies from "universal-cookie";
import Table from "./Table"
import "../../App.css";



const Sale = () => {

  const [getToken, setToken] = useState("");
  const cookies = new Cookies();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginCheck()) {
      navigate("/login");
    } else {
      setToken(cookies.get("userAuth")?.token);
    }
  }, []);


  return (
    <>
      <Layout>
        <h2 className="pb-5 text-decoration-underline">Sale</h2>
         <Table/>
      </Layout>
    </>
  );
};

export default Sale;
