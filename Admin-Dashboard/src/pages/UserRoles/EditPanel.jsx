import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";

const EditPanel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [panelHead, setPanelHead] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [extraMember, setExtraMember] = useState("");

  let navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getPanelDetails();
  }, []);

  const getPanelDetails = () => {
    let mounted = true;

    fetch(`http://localhost:5000/panel/getOnePanel/${id}`)
      .then((res) => res.json())

      .then((panel) => {
        if (mounted) {
          setName(panel.name);

          setDescription(panel.description);

          setPanelHead(panel.panelHead);

          setMember1(panel.member1);

          setMember2(panel.member2);

          setExtraMember(panel.extraMember);
        }
      });

    return () => (mounted = false);
  };

  const [staff, setStaff] = useState([
    {
      name: "",
      email: "",
      role: "",
      image: "",
      phone: "",
    },
  ]);

  useEffect(() => {
    function getStaffList() {
      axios

        .get("http://localhost:5000/panel/allStaff/")

        .then((res) => {
          console.log(res.data);

          setStaff(res.data);
        })

        .catch((err) => {
          alert(err.message);
        });
    }

    getStaffList();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name,
      description,
      panelHead,
      member1,
      member2,
      extraMember,
    };

    axios
      .patch(`http://localhost:5000/panel/updatePanel/${id}`, data)
      .then((res) => {
        navigate("/userRoles");
        alert("Panel Updated Successfully!");
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div>
      <div className="view-group-container" style={{ marginTop: "-25px" }}>
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle" style={{ fontWeight: "200" }}>
              Update Panel Members
            </h1>
          </div>
          <div className="userContainer">
            <div
              className="userShow"
              style={{ backgroundColor: "white", borderRadius: "25px" }}
            >
              <span className="userShowTitle">Panel Name</span>
              <br />
              <span className="userShowUserTitle">{name}</span>
              <br />
              <br />
              <span className="userShowTitle">Description</span>
              <br />
              <span className="userShowUserTitle">{description}</span>
              <div className="userShowBottom">
                <span className="userShowTitle">Panel Head</span>
                <div className="userShowTop">
                  <img
                    src={
                      panelHead.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKPfcYrCzZYwxa23OMrxtPlGxvtc_lRyf6Q&usqp=CAU"
                    }
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">{panelHead}</span>
                    <span className="userShowUserTitle">{panelHead.email}</span>
                  </div>
                </div>
              </div>

              <div className="userShowBottom">
                <span className="userShowTitle">Panel Members</span>
                <div className="userShowTop">
                  <img
                    src={
                      member1.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKPfcYrCzZYwxa23OMrxtPlGxvtc_lRyf6Q&usqp=CAU"
                    }
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">{member1}</span>
                    <span className="userShowUserTitle">{member1.email}</span>
                  </div>
                </div>

                <div className="userShowTop">
                  <img
                    src={
                      member2.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKPfcYrCzZYwxa23OMrxtPlGxvtc_lRyf6Q&usqp=CAU"
                    }
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">{member2}</span>
                    <span className="userShowUserTitle">{member2.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="userUpdate"
              style={{ backgroundColor: "white", borderRadius: "25px" }}
            >
              <span className="userUpdateTitle" style={{ fontWeight: "400" }}>
                Update Panel Details
              </span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft" style={{ marginRight: "20px" }}>
                  <div className="userUpdateItem">
                    <label>Panel Name</label>
                    <input
                      type="text"
                      placeholder=""
                      className="userUpdateInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Description</label>
                    <textarea
                      type="text"
                      placeholder=""
                      className="userUpdateInput"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Panel Head</label>
                    <select
                      className="userUpdateInput"
                      value={panelHead}
                      onChange={(e) => setPanelHead(e.target.value)}
                    >
                      <option>Select Panel head</option>
                      {staff.map((staff) => (
                        <option>{staff.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateItem">
                    <label>Panel Member 1</label>
                    <select
                      className="userUpdateInput"
                      value={member1}
                      onChange={(e) => setMember1(e.target.value)}
                    >
                      <option>Select Panel Member</option>
                      {staff.map((staff) => (
                        <option>{staff.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="userUpdateItem">
                    <label>Panel Member 2</label>
                    <select
                      className="userUpdateInput"
                      value={member2}
                      onChange={(e) => setMember2(e.target.value)}
                    >
                      <option>Select Panel Member</option>
                      {staff.map((staff) => (
                        <option>{staff.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="userUpdateItem">
                    <label>Additional Panel Member</label>
                    <select
                      className="userUpdateInput"
                      value={extraMember}
                      onChange={(e) => setExtraMember(e.target.value)}
                    >
                      <option>Select Additional Panel Member</option>
                      {staff.map((staff) => (
                        <option>{staff.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
              <br />
              <Button
                type="submit"
                className="userUpdateButton"
                onClick={submitHandler}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
