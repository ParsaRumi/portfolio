import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Profile = () => {
  const profile=useSelector((state)=>state.profile)
  return (
    <div className="check_out_container">
      <Container className="checkout_window1">
        <img className="profileImage1" src={profile.user?.image} />
        <Row>
          <Col xs="12" md="6" className="credit-info1">
            <div className="credit-info-content1">
              Email:
              <p disabled  className="input-field">{profile.user?.email}</p>
              User Name:
              <p disabled  className="input-field">{profile.user?.username}</p>
              Age:
              <p disabled  className="input-field">{profile.user?.age==undefined?"not set":profile.user.age}</p>
              Mobile:
              <p disabled  className="input-field">{profile.user?.mobile}</p>
            </div>
          </Col>

          <Col xs="12" md="6" className="credit-info">
            <div className="credit-info-content1">
              First Name:
              <p disabled  className="input-field">{profile.user?.firstname==undefined?"not set":profile.user.firstname}</p>
              Last Name:
              <p disabled  className="input-field">{profile.user?.lastname==undefined?"not set":profile.user.lastname}</p>
              Gender:
              <p disabled  className="input-field">{profile.user?.gender==undefined?"not set":profile.user.gender}</p>
              City:
              <p disabled  className="input-field">{profile.user?.city==undefined?"not set":profile.user.city}</p>

            </div>
          </Col>
       
        </Row>
      </Container>
    </div>
  )
}

export default Profile