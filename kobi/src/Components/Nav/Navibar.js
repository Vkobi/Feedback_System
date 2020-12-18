import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { MdMail } from "react-icons/md";
import "./Header.css";
import { Redirect } from "react-router-dom";
import img from "./logo.png";
//const jwt = require("jsonwebtoken");
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login:[],
    };
  }
  componentWillMount() {
   //this code for eanble jsonwebtoken 
    const token = localStorage.getItem("token");
    if (token != null) {
      axios.get("http://localhost:9191/UserById/"+token).then((ress) => {
        this.setState({
          Login: ress.data,
        });
      });
    }
  }

  render() {
    //this code login checkk
    const token = localStorage.getItem("token");
    if (token == null) {
      return <Redirect to={"/"} />;
    } 
    
     let Option;
    if (this.state.Login.usertype === "Admin") {

      Option = <Nav>
              <NavDropdown title="TESTERS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="./Home">
                 <span className="navfont"> NEW TESTER</span> 
                  </NavDropdown.Item>
                
              </NavDropdown>

              <NavDropdown title="OUESTIONS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="Qus">NEW OUESTIONS</NavDropdown.Item>
                 <NavDropdown.Item href="Ans">ALL ANSWERS</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="ANSWER" id="collasible-nav-dropdown">
                <NavDropdown.Item href="TesterAns">YOUR ANSWER</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="REPORTS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="Reports">REPORTS</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="USERS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="Profile">
                  {this.state.Login.name}
                </NavDropdown.Item>
                <NavDropdown.Item href="Login">Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link eventKey={3} href="Message">
                <MdMail />
              </Nav.Link>
            </Nav>;

    } else {

      Option = <Nav>
             
              <NavDropdown title="ANSWER" id="collasible-nav-dropdown">
                <NavDropdown.Item href="TesterAns">YOUR ANSWER</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="USERS" id="collasible-nav-dropdown">
                <NavDropdown.Item href="Profile">
                  {this.state.Login.name}
                </NavDropdown.Item>
                <NavDropdown.Item href="Login">Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link eventKey={3} href="Message">
                <MdMail />
              </Nav.Link>
            </Nav>;

    }

    return (
      <div>
        <Navbar className="nav-bar" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand href="Home">
            <div className="header-logo">
              <img src={img} alt="" width="230" height="120" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            
              {Option}

          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Navigation;
