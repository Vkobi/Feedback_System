import React from "react";
import axios from "axios";
import Navigation from "../Components/Nav/Navibar";
import { Row, Col, Form } from "react-bootstrap";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./style.css"
export default class Answer extends React.Component {
    constructor() {
        super();
        this.state={
          Answer: [],
          Tester: [],
          user:""
        }
  }
  componentWillMount() {
     axios.get("http://localhost:9191/Users").then((ress) => {
          this.setState({
            Tester: ress.data,
          });
        });
  }
  foundAnswer(id) {
    axios.get("http://localhost:9191/AnswerByTester/"+id).then((ress) => {
          this.setState({
            Answer: ress.data,
          });
        });
  }
  render() {
        let testers = this.state.Tester.map((post) => {
      return <option value={post.name}>{post.name+"("+post.usertype+")"}</option>;
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

     
    ];
        return (
            <div>
                <Navigation />
                <div className="body-box">
                    <Row>
                        <Col sm={4}>
                            <h3> Filter by Tester</h3>
                            <Form>

                                 <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Tester</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..."
                          
                                     onChange={(e) => {
                                       this.foundAnswer(e.target.value);
                                     }} >
                          
                                            <option value="0">--Select Tester--</option>
                                            {testers}
                                           
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                               
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

