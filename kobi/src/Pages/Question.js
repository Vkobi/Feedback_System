import React from "react";
import axios from "axios";
import Navigation from "../Components/Nav/Navibar";
import { Row, Col, Form, Button } from "react-bootstrap";
import {MdDelete,MdEdit } from "react-icons/md";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./style.css"
export default class Question extends React.Component {
    constructor() {
        super();
        this.state={
          Question: [],
          newPostData: {
            btn: 0,
            question_id: "",
            question: "", 
          },
        deleteData:{
           question_id:""
          },
          msg:""
      }
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.deleteDrow = this.deleteDrow.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }
  
  componentWillMount() {
    axios.get("http://localhost:9191/Questions").then((response) => {
      console.log(response.data);
      this.setState({
        Question: response.data,
      });
    });
  }
  
addNewQuestion() {
    let { newPostData } = this.state;
    axios.post("http://localhost:9191/addQuestion", newPostData).then((responce) => {
      this.setState({
        msg: "Saved successfully!",
      });

        axios.get("http://localhost:9191/Questions").then((ress) => {
          this.setState({
            Question: ress.data,
          });
        });
      let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.question = "";
      this.setState({newPostData});
      
    });
  }

  updateQuestion() {
    let { newPostData } = this.state;
    axios.put("http://localhost:9191/putQuestion", newPostData).then((responce) => {
      this.setState({
        msg: "Updated successfully!",
      });
     
        axios.get("http://localhost:9191/Questions").then((ress) => {
          this.setState({
            Question: ress.data,
          });
        });
      let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.question = "";
      this.setState({newPostData});
      
    });
  }

  deleteDrow(id) {
    axios
      .delete("http://localhost:9191/deleteQuestion/" + id)
      .then((responce) => {
        this.setState({
          msg: "Delete successfully!",
        });
       
         axios.get("http://localhost:9191/Questions").then((ress) => {
          this.setState({
            Question: ress.data,
          });
         }); 
        let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.question = "";
      this.setState({newPostData});
      });
  }


  render() {
      
    let Option;
    if (this.state.newPostData.btn === 0) {
      Option = <Button onClick={this.addNewQuestion.bind(this)}>Submit</Button>;
    } else {
      Option = <Button onClick={this.updateQuestion.bind(this)}>Update</Button>;
    }
         const colo = [ 
      {
        Header: "Question",
        accessor: "question",
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
                  this.deleteDrow(props.original.question_id);
                }}
              />{" "}
              <MdEdit
                className="edit-icon"
                onClick={() => {
                  let { newPostData } = this.state;
                  newPostData.question_id = props.original.question_id;
                  newPostData.question = props.original.question;
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
                            <h3> Crate New Question</h3>
                            <Form>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>New Question</Form.Label>
                      <Form.Control placeholder="New Question"
                                    value={this.state.newPostData.question}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.question = e.target.value;
                                      this.setState({ newPostData });
                                     }}
                                     />
                                </Form.Group>
                    {Option}
                    <br>
                    </br>
                    <h4>{ this.state.msg}</h4>
                            </Form>
                        </Col>
                        <Col sm={8}>
                  <h3>All Questions</h3>
                             <ReactTable
                    className="table-header"
                    columns={colo}
                    data={this.state.Question}
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

