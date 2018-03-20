import { Row, Col, CardPanel, Input, Button, Table } from 'react-materialize'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.css'


class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: ['My favorite programming language.', 'How Happy am I as a programmer?', 'Favorite Programming Resource', 'Favorite Learning Methodology', 'What Kind of Developer Am I?', 'Favorite Christmas Carol'],
      answers: [['PHP','JS','Ruby','C#'],['Very Happy','Moderately Happy','Just Getting By', 'Miserable'], ['GitHub', 'FreeCodeCamp', 'Code Wars', 'Code Fights'], ['I go solo and build projects', 'I like to pair program', 'I practice algorithms', 'I watch videos and courses'], ['Front End Developer', 'Back End Developer', 'DevOps Engineer', 'Mobile Developer'], ['Frosty the Snowman', 'Let It Snow', 'Santa Baby', 'Winter Wonderland']],
      userResponses: [],
      currentQuestion: 0,
      isHidden: true
    }
  }
  incrementQuestion() {
    if (this.state.currentQuestion >= 5) {
      this.state.currentQuestion = 0
      this.setState({
        isHidden: false
      })
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
  }
  pushUserResponses(response) {
    let copiedState = this.state.userResponses
    copiedState.push(response)
    this.setState({
      userResponses: copiedState
    })
  }
  render() {
    let curr = this.state.currentQuestion
    return (
        <div className="main">
          {this.state.isHidden ?
            <Questions question={this.state.questions[curr]}
            answer={this.state.answers[curr]}
            submitValue={this.incrementQuestion.bind(this)}
            pushUserResponses={this.pushUserResponses.bind(this)}/>
          :
          <Results result={this.state.userResponses}/>
        }
        </div>
    );
  }
}

App.propTypes = {
  currentQustion: PropTypes.number
}

class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
    }
  }
  submitVal(e) {
    e.preventDefault()
    this.props.submitValue()
    this.props.pushUserResponses(e.target.group1.value)
  }
  render() {
      return (
        <div className='main'>
        <h2 className="center-align">Coding Survey</h2>

        <Row className="question">
          <Col s={12}>
              <CardPanel className="teal lighten-4 black-text">
                  <span>{this.props.question}</span>
              </CardPanel>
          </Col>
        </Row>

        <form onSubmit={this.submitVal.bind(this)}>

          <Row className="answers">
              <Col s={12} m={8} l={6} offset="m2 l3">
                <Input name='group1' type='radio' value={this.props.answer[0]} label={this.props.answer[0]}/>
              </Col>
              <Col s={12} m={8} l={6} offset="m2 l3">
                <Input name='group1' type='radio' value={this.props.answer[1]} label={this.props.answer[1]}/>
              </Col>
              <Col s={12} m={8} l={6} offset="m2 l3">
                <Input name='group1' type='radio' value={this.props.answer[2]} label={this.props.answer[2]}/>
              </Col>
              <Col s={12} m={8} l={6} offset="m2 l3">
                <Input name='group1' type='radio' value={this.props.answer[3]} label={this.props.answer[3]}/>
              </Col>

          <Row className="nextButtonContainer">
            <Col s={12}>
              <Button type='submit' variant="raised">Submit</Button>
            </Col>
          </Row>
        </Row>

        </form>

      </div>
    )
  }
}

class Results extends Component {
  render() {
    let responses = this.props.result.map((response) =>
      <td>{response}</td>
    );
  return (
    <Table>
      <thead>
        <tr className="table-header-rows grey lighten-2">
          <th data-field="id">My Answers</th>
          <th data-field="name">Most Popular</th>
          <th data-field="price">Percentage Chosen</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          {responses}
        </tr>
      </tbody>
    </Table>
  )
  }
}







export default App;
