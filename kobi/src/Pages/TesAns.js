import React from "react";
import axios from "axios";
import Navigation from "../Components/Nav/Navibar";
import { Row, Col, Form, Button } from "react-bootstrap";
import {MdDelete,MdEdit } from "react-icons/md";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./style.css"
export default class TesAns extends React.Component {
    constructor() {
        super();
      this.state = {
          user:"",
          Answer: [],
          Questions: [],
            newPostData: {
            btn: 0,
            answer_id:0,
            tester: "",
            question: "",
            ranges:0,
            answer: "",
          },msg:""
      }
        this.addNewAnswer= this.addNewAnswer.bind(this);
    this.deleteDrow = this.deleteDrow.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
  }
  componentWillMount() {
    const user = localStorage.getItem("user");
    let { newPostData } = this.state;
    newPostData.tester = user;
    this.setState({user:user,newPostData});
      axios.get("http://localhost:9191/AnswerByTester/"+localStorage.getItem("user")).then((ress) => {
          this.setState({
            Answer: ress.data,
          });
      }); 
     axios.get("http://localhost:9191/Questions").then((ress) => {
          this.setState({
            Questions: ress.data,
          });
         }); 
  }

  addNewAnswer() {
    let { newPostData } = this.state;
    axios.post("http://localhost:9191/addAnswer", newPostData).then((responce) => {
      this.setState({
        msg: "Saved successfully!",
      });

      axios.get("http://localhost:9191/AnswerByTester/"+localStorage.getItem("user")).then((ress) => {
          this.setState({
            Answer: ress.data,
          });
      }); 
      let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.answer = "";
      this.setState({newPostData});
      
    });
  }

  updateAnswer() {
    let { newPostData } = this.state;
    axios.put("http://localhost:9191/putAnswer", newPostData).then((responce) => {
      this.setState({
        msg: "Updated successfully!",
      });
     
       axios.get("http://localhost:9191/AnswerByTester/"+localStorage.getItem("user")).then((ress) => {
          this.setState({
            Answer: ress.data,
          });
      }); 
      let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.answer = "";
      this.setState({newPostData});
      
    });
  }

  deleteDrow(id) {
    axios
      .delete("http://localhost:9191/deleteAnswer/" + id)
      .then((responce) => {
        this.setState({
          msg: "Delete successfully!",
        });
       
          axios.get("http://localhost:9191/AnswerByTester/"+localStorage.getItem("user")).then((ress) => {
          this.setState({
            Answer: ress.data,
          });
      }); 
        let { newPostData } = this.state;
      newPostData.btn = 0;
      newPostData.answer = "";
      this.setState({newPostData});
      });
  }


  render() {
     let Option;
    if (this.state.newPostData.btn === 0) {
      Option = <Button onClick={this.addNewAnswer.bind(this)}>Submit</Button>;
    } else {
      Option = <Button onClick={this.updateAnswer.bind(this)}>Update</Button>;
    }
      
     let question = this.state.Questions.map((post) => {
      return <option value={post.question}>{post.question}</option>;
    });
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
        Header: "Answer",
        accessor: "answer",
        filterable: false,
        style: {
          textAlign: "center",
        },
             },
             {
        Header: "%",
        accessor: "ranges",
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
                 this.deleteDrow(props.original.answer_id);
                }}
              />{" "}
              <MdEdit
                className="edit-icon"
                onClick={() => {
                   let { newPostData } = this.state;
                  newPostData.answer_id = props.original.answer_id;
                  newPostData.question = props.original.question;
                   newPostData.answer = props.original.answer;
                  newPostData.tester = props.original.tester;
                  newPostData.ranges = props.original.ranges;
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
                            <h3> Answer Question</h3>
                            <Form>
                                  <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Question</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..."
                          value={this.state.newPostData.question}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.question = e.target.value;
                                      this.setState({ newPostData });
                                     }}>
                                            <option value="0">--Select Question--</option>
                                           {question}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Answer</Form.Label>
                      <Form.Control placeholder="Your Answer"
                        value={this.state.newPostData.answer}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.answer = e.target.value;
                                      this.setState({ newPostData });
                                     }} />
                                </Form.Group>
                             
                                <Form.Group controlId="formBasicRange">
                      <Form.Label>Range { this.state.newPostData.ranges}%</Form.Label>
                      <Form.Control type="range"
                        value={this.state.newPostData.ranges}
                                     onChange={(e) => {
                                     let { newPostData } = this.state;
                                      newPostData.ranges = e.target.value;
                                      this.setState({ newPostData });
                                     }} />
                                </Form.Group>

                                

                    {Option}
                    <br>
                    </br>
                    <h3>{ this.state.msg}</h3>
                            </Form>
                        </Col>
                        <Col sm={8}>
                  <h3>All Answer</h3>
                             <ReactTable
                    className="table-header"
                    columns={colo}
                    data={this.state.Answer}
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

