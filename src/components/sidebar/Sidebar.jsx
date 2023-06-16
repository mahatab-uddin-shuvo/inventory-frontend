import React, { useState, useEffect } from "react";
import { FaBars, FaBarcode, FaExclamationCircle } from "react-icons/fa";

import { RiDashboardLine } from "react-icons/ri";
import avater from "../../images/avater.svg";
import "./sidebar.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import ComponentGuard from "../../helpers/ComponentGuard";

import DropdownMenu from "./DropdownMenu";
import http from "../../http";

const Sidebar = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const removeUser = async () => {
    await cookies.remove("userAuth");
    await cookies.remove("userPermissions");
    await navigate("/login");
  };

  const logOut = () => {
    http
      .get("/logout", {
        headers: {
          Authorization: "Bearer " + cookies.get("userAuth").token,
        },
      })
      .then((res) => {
        console.log("logout", res);
        if (res.status == 200) {
          removeUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (window.innerWidth < 764) {
      setIsOpen(false);
    }
  }, [window.innerWidth]);

  const menuItem = [
    {
      id: 0,
      path: "/purchase",
      name: "Purchase",
      icon: <RiDashboardLine />,
      permissions: [],
    },
    {
      id: 0,
      path: "/sale",
      name: "Sale",
      icon: <FaBarcode />,
      permissions: [],
    },
  ];

  
  return (
    <>
      <div className="container">
        <div
          style={{ minWidth: isOpen ? "300px" : "50px" }}
          className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
        >
          <div className="top_section">
            <h3 className="logo" style={{ width: "200px", height: "auto" }}>
              Inventory
            </h3>
            <div
              style={{
                marginLeft: isOpen ? "40px" : "0px",
                width: isOpen ? "43px" : "20px",
              }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="height">
            {menuItem.map((item, index) => (
              <ComponentGuard needsPermission={item.permissions}>
                <DropdownMenu item={item} key={index} isOpen={isOpen} />
              </ComponentGuard>
            ))}
          </div>
        </div>
        <div className="menu_wrapper">
          <div className="top_navbar">
            {cookies.get["userAuth"]?.token !== null && (
              <>
                <span className="user_name fw-bold">
                  {cookies.get("userAuth")?.name}
                </span>
                <div className="user_wraper">
                  <span className="user">
                    <img src={avater} />
                    <span className="down_arrow"></span>

                    <ul className="user_profile_list">
                      <li
                        className="up_item"
                        type="button"
                        onClick={handleShow}
                      >
                        logout
                      </li>
                    </ul>
                  </span>
                </div>
              </>
            )}
          </div>
          <div style={{ marginTop: "85px" }}>
            <main
              className="mt-3"
              style={{ paddingLeft: isOpen ? "300px" : "80px" }}
            >
              <div className="ms-4 children_wrapper">{children}</div>
            </main>
          </div>
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "50px", margin: "auto" }}>
            <FaExclamationCircle />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: "30px" }}>
          Do you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={logOut}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sidebar;
