import React, { useState } from "react";
import "../style/Setting.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [proFlage, setProFlage] = useState(true);
  const [pasFlage, setPasFlage] = useState(false);
  const [avaFlage, setAvaFlage] = useState(false);
  return (
    <div style={{ overflow: "hidden" }}>
      <Container>
        <Row className="editRow">
          <Col xs="12" lg="3" className="sidebar">
            <img className="profileImage" src={profile.user?.image} />
            <p
              onClick={() => {
                navigate("/setting");
                setProFlage(true);
                setPasFlage(false);
                setAvaFlage(false);
              }}
              className={proFlage ? "sidebarp" : ""}
            >
              Change Profile
            </p>
            <p
              onClick={() => {
                navigate("change-password");
                setProFlage(false);
                setPasFlage(true);
                setAvaFlage(false);
              }}
              className={pasFlage ? "sidebarp" : ""}
            >
              Change Password
            </p>
            <p
              onClick={() => {
                navigate("upload-avatar");
                setProFlage(false);
                setPasFlage(false);
                setAvaFlage(true);
              }}
              className={avaFlage ? "sidebarp" : ""}
            >
              Upload Avatar
            </p>
          </Col>

          <Col  className="profile_Content">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditProfile;
