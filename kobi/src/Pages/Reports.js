import React from "react";
import axios from "axios";
import Navigation from "../Components/Nav/Navibar";
import { Row, Col, Form } from "react-bootstrap";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./style.css"
export default class Reports extends React.Component {
    constructor() {
        super();
        this.state={
          Answer: [],
          Question: [],
        }
  }
  
  componentWillMount() {
     axios.get("http://localhost:9191/Questions").then((ress) => {
          this.setState({
            Question: ress.data,
          });
        });
  }
  foundAnswer(id) {
    axios.get("http://localhost:9191/AnswerByQuestion/"+id).then((ress) => {
          this.setState({
            Answer: ress.data,
          });
        });
  }
  render() {
      
     let questions = this.state.Question.map((post) => {
      return <option value={post.question}>{post.question}</option>;
    });
         const colo = [ 
      {
        Header: "Tester Name",
        accessor: "tester",
        filterable: false,
        style: {
          textAlign: "center",
        },
             },
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
                            <h3> Filter by Questions</h3>
                            <Form>

                                 <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Select Question</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..."
                         onChange={(e) => {
                                       this.foundAnswer(e.target.value);
                                     }} >
                                            <option value="0">--Select Questions--</option>
                                            {questions}
                                           
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

