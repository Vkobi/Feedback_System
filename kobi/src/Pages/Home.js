import React from "react";
import axios from "axios";
import Navigation from "../Components/Nav/Navibar";
import { Row, Col, Form, Button } from "react-bootstrap";
import {MdDelete,MdEdit } from "react-icons/md";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./style.css"
export default class Home extends React.Component {
    constructor() {
        super();
        this.state={
          Users: [],
          newPostData: {
            btn: 0,
            user_id:"",
            name: "",
            email: "",
            usertype: "",
            password:""
          },msg:""
      }
    this.addNewUser = this.addNewUser.bind(this);
    this.deleteDrow = this.deleteDrow.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  
 componentWillMount() {
    axios.get("http://localhost:9191/Users").then((response) => {
      console.log(response.data);
      this.setState({
        Users: response.data,
      });
    });
  }
  
addNewUser() {
    let { newPostData } = this.state;
    axios.post("http://localhost:9191/addUser", newPostData).then((responce) => {
      this.setState({
        msg: "Saved successfully!",
      });

        axios.get("http://localhost:9191/Users").then((ress) => {
          this.setState({
            Users: ress.data,
          });
        });
      let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.name = "";
      newPostData.email = "";
      newPostData.password = "";
      this.setState({newPostData});
      
    });
  }

  updateUser() {
    let { newPostData } = this.state;
    axios.put("http://localhost:9191/putUser", newPostData).then((responce) => {
      this.setState({
        msg: "Updated successfully!",
      });
     
        axios.get("http://localhost:9191/Users").then((ress) => {
          this.setState({
            Users: ress.data,
          });
        });
      let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.name = "";
      newPostData.email = "";
      newPostData.password = "";
      this.setState({newPostData});
      
    });
  }

  deleteDrow(id) {
    axios
      .delete("http://localhost:9191/deleteUser/" + id)
      .then((responce) => {
        this.setState({
          msg: "Delete successfully!",
        });
       
         axios.get("http://localhost:9191/Users").then((ress) => {
          this.setState({
            Users: ress.data,
          });
         }); 
        let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.name = "";
      newPostData.email = "";
      newPostData.password = "";
      this.setState({newPostData});
      });
  }






  render() {
      
    let Option;
    if (this.state.newPostData.btn === 0) {
      Option = <Button onClick={this.addNewUser.bind(this)}>Submit</Button>;
    } else {
      Option = <Button onClick={this.updateUser.bind(this)}>Update</Button>;
    }
         const colo = [ 
      {
        Header: "Name",
        accessor: "name",
        filterable: false,
        style: {
          textAlign: "center",
        },
             },
             {
        Header: "Email",
        accessor: "email",
        filterable: false,
        style: {
          textAlign: "center",
        },
             },
             {
        Header: "User Tyep",
        accessor: "usertype",
        filterable: false,
        style: {
          textAlign: "center",
        },
      },

      {
        Header: "Remove",
        Cell: (props) => {
          return (
            <div>
              <MdDelete
                className="delete-icon"
                onClick={() => {
                 this.deleteDrow(props.original.user_id);
                }}
              />{" "}
              <MdEdit
                className="edit-icon"
                onClick={() => {
                  let { newPostData } = this.state;
                  newPostData.user_id = props.original.user_id;
                  newPostData.name = props.original.name;
                  newPostData.email = props.original.email;
                  newPostData.usertype = props.original.usertype;
                  newPostData.password = props.original.password;
                  newPostData.btn = 1;
                  this.setState({ newPostData });
                }}
              />
            </div>
          );
        },
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style: {
          textAlign: "center",
        },
      },
    ];
        return (
            <div>
                <Navigation />
                <div className="body-box">
                    <Row>
                        <Col sm={4}>
                            <h3> Crate Tester</h3>
                            <Form>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control placeholder="Tester name"
                                     value={this.state.newPostData.name}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.name = e.target.value;
                                      this.setState({ newPostData });
                                     }}
                                     />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                         value={this.state.newPostData.email}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.email = e.target.value;
                                      this.setState({ newPostData });
                                     }}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                         value={this.state.newPostData.password}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.password = e.target.value;
                                      this.setState({ newPostData });
                                     }}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>User Type</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..."
                        value={this.state.newPostData.usertype}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.usertype = e.target.value;
                                      this.setState({ newPostData });
                                     }}>
                                            <option value="Tester">Tester</option>
                                            <option value="Admin">Admin</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                    {Option}
                    <br>
                    </br>
                    <h4>{this.state.msg}</h4>
                            </Form>
                        </Col>
                        <Col sm={8}>
                            <h3>Testers Details</h3>
                             <ReactTable
                    className="table-header"
                    columns={colo}
                    data={this.state.Users}
                    defaultPageSize={7}
                    noDataText={"Please Wait...."}
                  ></ReactTable>
                        </Col>
                    </Row>
           
                </div>
         
            </div>
        );
    }
};

