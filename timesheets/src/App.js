import React from 'react'
import { Button, Collapse, Container, Form, Col, Row } from 'react-bootstrap'
import './App.scss'
import Date from './Date.js'
import { getWeek, getStartingWeek } from './calendar.js'


const weeks = {
  last: getWeek(-6),
  this: getWeek(1),
  next: getWeek(8)
}


class Timesheets extends React.Component {
  state = {
    week: getStartingWeek(),
    showWeek: true
  }

  nameInput = React.createRef()

  onClick = e => {
    const value = e.currentTarget.value
    this.setState({ showWeek: false })
    setTimeout(() => this.setState({ week: value, showWeek: true }), 300)
  }

  saveName = () => localStorage.setItem("name", this.nameInput.current.value)

  render = () => {
    return (
      <Form inline method="post" action="/service">
        <input type="hidden" name="startDate" value={weeks[this.state.week][0].id} />
        <Container className="text-center mb-5">
          <Row className="header">
            <Col>
              Create a timesheet for{" "}
              <Form.Control
                type="text"
                size="lg"
                placeholder="your name"
                name="name"
                defaultValue={localStorage.getItem("name")}
                ref={this.nameInput}
              />
            </Col>
          </Row>
          <Row>
            {["last", "this", "next"].map(weekId => {
              const week = weeks[weekId]
              return (
                <Col key={weekId}>
                  <Button size="lg" className="px-5" onClick={this.onClick} value={weekId} active={this.state.week === weekId} variant="outline-primary">
                    {weekId.charAt(0).toUpperCase() + weekId.slice(1)} week
                    <div className="subtext">{week[0].text} - {week[week.length - 1].text}</div>
                  </Button>
                </Col>
              )
            })}
          </Row>
          <Collapse in={this.state.showWeek} mountOnEnter={true} unmountOnExit={true}>
            <Row>
              {this.state.week !== null && weeks[this.state.week].map(day => <Col key={day.id}><Date {...day} /></Col>)}
            </Row>
          </Collapse>
          <Button type="submit" onClick={this.saveName} className="p-4" style={{marginTop: "100px", fontSize: "40px"}} size="lg">Download timesheet</Button>
        </Container>
      </Form>
    )
  }
}

export default Timesheets;
