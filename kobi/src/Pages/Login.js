import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import img from "../Components/Nav/logo.png"
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./style.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLoginData: {
        email: "",
        password: "",
      },
      message: "",
      reset: false,
      redirect: false,
    };
    this.login = this.login.bind(this);
  }
  componentWillMount() {
    localStorage.clear();
  }
  login() {
    let { newLoginData } = this.state;
    axios
      .get("http://localhost:9191/Login/"+ newLoginData.email)
      .then((result) => {
        console.log(result);
        if (result.data.email===newLoginData.email && result.data.password===newLoginData.password ) {
          localStorage.setItem("token", result.data.user_id);
           localStorage.setItem("user", result.data.name);
          this.setState({ redirect: true });
        } else {
          this.setState({ message: "Invalid username or Password" });
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/TesterAns"} />;
    }
      return (
          <Container>
              <br></br>
               <br></br>
              <div className="body-box">
               <img src={img} alt="logo"/>  
        <Row>
          <Col md="3" xs="12"></Col>
          <Col md="6" xs="12">
            <div className="login-box">
              <Container>
               
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      className="inputx"
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Email"
                      vlaue={this.state.newLoginData.email}
                      onChange={(e) => {
                        let { newLoginData } = this.state;
                        newLoginData.email = e.target.value;
                        this.setState({ newLoginData });
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      className="inputx"
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="***************"
                      vlaue={this.state.newLoginData.password}
                      onChange={(e) => {
                        let { newLoginData } = this.state;
                        newLoginData.password = e.target.value;
                        this.setState({ newLoginData });
                      }}
                    />
                  </FormGroup>

                  <Label for="exampleMessage" className="ErrorMessage">
                    <b>{this.state.message}</b>
                  </Label>
                  <br />
                  <a href="forgot" className="forgot-pass">
                    #Forgot Password
                  </a>
                  <br />
                  <Button className="buttonx" onClick={this.login.bind(this)}>
                    Login
                  </Button>
                </Form>
              </Container>
            </div>
          </Col>
          <Col md="3" xs="12"></Col>
        </Row>
              </div>
              </Container>
    );
  }
}
export default Login;
