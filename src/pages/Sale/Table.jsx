// import React from 'react'
import { useEffect, useState } from "react";
import "./table.css";
import { MdDeleteForever } from "react-icons/md";
import { SelectPicker } from "rsuite";
import http from "../../http";
import Cookies from "universal-cookie";
import DateTimeFormat from "../../components/DateTimeFormat";
import { Button, Modal } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

const TableCp = () => {
  const [product, setProduct] = useState([]);
  const [productDetails, setProDetails] = useState([]);
  const [productDetailsData, setProductDetailsData] = useState([]);
  const [Clicked, setClicked] = useState(0);
  const [dataSubmit, setDataSubmit] = useState(0);
  const [getError, setError] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rows, setRows] = useState(() => {
    let productData = JSON.parse(localStorage.getItem("productDataSale"));
    if (productData) {
      return productData;
    } else {
      return [
        {
          id: null,
          stkQty: 0,
          qty: 0.0,
          um: 0,
          price: 0,
          disc: 0,
          total: 0,
        },
      ];
    }
  });

  // console.log(setSubTotal);
  const cookies = new Cookies();

  // console.log(total);

  useEffect(() => {
    http
      .get(`/products`, {
        headers: {
          Authorization: "Bearer " + cookies.get("userAuth").token,
        },
      })
      .then((response) => {
        setProduct(response.data.data.data);
      });
  }, []);
  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    http
      .get(`/products/get/${productDetails}`, {
        headers: {
          Authorization: "Bearer " + cookies.get("userAuth").token,
        },
      })
      .then((response) => {
        let localData =
          JSON.parse(localStorage.getItem("productDataSale")) || [];
        let productId = response.data.data.id;
        console.log(response.data.data);
        if (localData.length > 0) {
          localData.map((e) => {
            if (e.id === productId) {
              let FilteredData = localData.filter(function (element) {
                return element.id !== undefined;
              });
              localStorage.setItem(
                "productDataSale",
                JSON.stringify([
                  ...FilteredData,
                  {
                    name: response.data.data.name,
                    U_M: response.data.data.U_M,
                    price: response.data.data.price,
                    disc: response.data.data.disc,
                    id: response.data.data.id,
                    qty: e.qty,
                    stock_qty: response.data.data.stock_qty,
                    total:
                      e.qty * response.data.data.price -
                      response.data.data.disc,
                  },
                ])
              );
            } else {
              let FilteredData = localData.filter(function (element) {
                return element.id !== undefined;
              });
              localStorage.setItem(
                "productDataSale",
                JSON.stringify([
                  ...FilteredData,
                  {
                    name: response.data.data.name,
                    U_M: response.data.data.U_M,
                    price: response.data.data.price,
                    disc: response.data.data.disc,
                    id: response.data.data.id,
                    qty: response.data.data.qty || 0,
                    stock_qty: response.data.data.stock_qty,
                    total: response.data.data.qty || 0,
                  },
                ])
              );
            }
          });
        }
        let FilteredData = localData.filter(function (element) {
          return element.id !== undefined;
        });
        localStorage.setItem(
          "productDataSale",
          JSON.stringify([
            ...FilteredData,
            {
              name: response.data.data.name,
              U_M: response.data.data.U_M,
              price: response.data.data.price,
              disc: response.data.data.disc,
              id: response.data.data.id,
              qty: response.data.data.qty || 0,
              stock_qty: response.data.data.stock_qty,
              total: response.data.data.qty || 0,
            },
          ])
        );
        return true;
      })
      .then(() => {
        let localData =
          JSON.parse(localStorage.getItem("productDataSale")) || [];
        let FilteredData = localData.filter(function (element) {
          return element.id !== undefined;
        });
        setRows([...FilteredData]);
        refreshPage();
      });
  }, [productDetails]);

  function updateData(index, value, data) {
    let localData = JSON.parse(localStorage.getItem("productDataSale")) || [];
    let productId = data.id;
    if (localData.length > 0) {
      localData.map((e) => {
        if (e.id === productId) {
          let FilteredData = localData.filter(function (element) {
            return element.qty !== 0;
          });
          console.log(FilteredData);
          localStorage.setItem(
            "productDataSale",
            JSON.stringify([
              ...FilteredData,
              {
                name: data.name,
                U_M: data.U_M,
                price: data.price,
                disc: data.disc,
                id: data.id,
                stock_qty: data.stock_qty,
                qty: Number(value),
                total: Number(value) * data.price - data.disc,
              },
            ])
          );
        }
      });
      refreshPage();
    }
  }

  const handleAddRow = (proDet) => {
    let promData = new Promise((resolve, reject) => {
      resolve(200);
    });
    promData
      .then(() => {
        let localData = JSON.parse(localStorage.getItem("productDataSale"));
        localStorage.setItem(
          "productDataSale",
          JSON.stringify([
            ...localData,
            {
              U_M: 0.0,
              price: 0,
              disc: 0,
              qty: 0,
              stock_qty: 0.0,
              total: 0,
            },
          ])
        );
      })
      .then(() => {
        let localData = JSON.parse(localStorage.getItem("productDataSale"));
        setRows(localData);
      });
    setClicked(1);
  };
  useEffect(() => {
    if (Clicked == 1) {
      const productData = JSON.parse(localStorage.getItem("productDataSale"));
      setRows(productData);
      setClicked(0);
    }
  }, [Clicked]);
  useEffect(() => {
    if (dataSubmit == 1) {
      setDataSubmit(0);
      refreshPage();
    }
  }, [dataSubmit]);

  const handleSubmitAnother = () => {
    let localData = JSON.parse(localStorage.getItem("productDataSale")) || [];
    let dataArr = [];
    let promData = new Promise((resolve, reject) => {
      resolve(200);
    });
    promData
      .then(() => {
        localData.map((e) => {
          dataArr.push({ product_id: e.id, quantity: e.qty });
        });
        return true;
      })
      .then(() => {
        
        http
          .post(`/sales/create`, dataArr, {
            headers: {
              Authorization: "Bearer " + cookies.get("userAuth").token,
              "Content-type": "multipart/application/json",
            },
          })
          .then((response) => {
            localStorage.setItem("success", true);
            localStorage.removeItem("productDataSale");
            setDataSubmit(1);
            return true;
          })
          .catch((err) => {
            // console.log()

            console.log(err?.response?.data?.message);
            setError(err?.response?.data?.message);
            handleShow();
          });
      });
  };

  const handleDelete = (id) => {
    let productData = JSON.parse(localStorage.getItem("productDataSale"));
    let filterData = productData.filter((e) => e.id !== id);
    localStorage.setItem("productDataSale", JSON.stringify(filterData));
    console.log(filterData);

    setRows(filterData);
  };

  function calculateSum(array, property) {
    const total = array.reduce((accumulator, object) => {
      return accumulator + object[property];
    }, 0);

    return total;
  }

  return (
    <>
      <div>
        <div className="d-flex mb-4">
          <span className="me-2">Date </span>
          <span style={{ border: "1px solid black" }}>
            {DateTimeFormat(new Date())}
          </span>
        </div>
        {/* table */}
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th scope="col">
                Product Name <span className="text-danger">*</span>
              </th>
              <th>Stock Qty</th>
              <th>
                Qty<span className="text-danger">*</span>
              </th>
              <th scope="col">U/M</th>
              <th scope="col">
                Price <span className="text-danger">*</span>
              </th>
              <th scope="col">Disc</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  {/* {check} */}
                  <SelectPicker
                    name="product_id"
                    data={product?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    style={{ width: "100%" }}
                    defaultValue={r?.id || ""}
                    // onSearch={(val) => getSearch(val)}
                    onChange={(value) => setProDetails(value)}
                  />
                </td>
                <td className="">
                  <input
                    type="number"
                    className="text-end qty  clr p-1"
                    placeholder="0.00"
                    defaultValue={r?.stock_qty}
                    disabled
                  />
                </td>
                <td>
                  {" "}
                  <input
                    type="number"
                    step="1"
                    min={0}
                    max={9}
                    className="text-end qty p-1"
                    defaultValue={r?.qty}
                    onChange={(e) => updateData(i, e?.target?.value, r)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="text-end qty p-1"
                    placeholder="0.00"
                    defaultValue={r?.U_M}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="text-end qty p-1"
                    placeholder="0.00"
                    defaultValue={r?.price}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="text-end qty p-1"
                    placeholder="0.00"
                    defaultValue={r?.disc}
                    disabled
                  />
                </td>
                <td>{r.total}</td>
                <td className="  text-white">
                  <button
                    className="d-flex align-items-center justify-content-center btn m-2 dlt text-danger "
                    onClick={() => handleDelete(r.id)}
                  >
                    <MdDeleteForever size={25} />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <th className="add">
                <button
                  className="btn btn-sm btn-info text-white "
                  onClick={() => handleAddRow(productDetailsData)}
                >
                  Add New Product
                </button>
              </th>
              <td colSpan={5} className="text-end fw-semibold">
                Grand Total
              </td>
              <td>{calculateSum(rows, "total")}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-md"
            onClick={handleSubmitAnother}
          >
            Submit
          </button>
          <button
            className="btn btn-success btn-md"
            onClick={handleSubmitAnother}
          >
            Submit and Another
          </button>
        </div>
        {/* table */}
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "50px", margin: "auto" }}>
            <FaExclamationCircle />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "left", fontSize: "20px" }}>
          <ul>
            {getError.name && <li>Product Name: {getError.name}.</li>}
            {getError.msg && <li>Message: {getError.msg}.</li>}
            {getError.product && <li>Message: {getError.product}.</li>}
            {getError.quantity && <li>Message: {getError.quantity}.</li>}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableCp;
