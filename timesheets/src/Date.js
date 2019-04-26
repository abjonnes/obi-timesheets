import React from 'react';
import { Card, ButtonGroup, ToggleButton } from 'react-bootstrap';

const BTButton = ({ value, groupValue, onClick, name, children }) => (
  <ToggleButton
    variant="outline-primary"
    value={value}
    onClick={onClick}
    checked={value === groupValue}
    type="radio"
    name={name}
  >
    {children}
  </ToggleButton>
)

class Date extends React.Component {
  state = {
    selected: null
  }

  onClick = e => {
    if (e.target.tagName !== "INPUT")
      return

    const value = e.target.value
    const selected = (value === this.state.selected) ? null : value
    this.setState({ selected })
  }

  render = () => (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>
          {this.props.dow}
          <div className="subtext">{this.props.text}</div>
        </Card.Title>
        {this.props.holiday ? <div className="mt-5">
          <input type="hidden" name={this.props.id} value="holiday" />
          <i className="em em-tada" />
          {" "}HOLIDAY{" "}
          <i className="em em-confetti_ball" />
          </div> : 
        <ButtonGroup
          type="radio"
          name="s"
          vertical
          toggle
          className="mt-3"
        >
          <BTButton value="full" groupValue={this.state.selected} onClick={this.onClick} name={this.props.id}>
            Full day off
          </BTButton>
          <ButtonGroup
            type="radio"
            size="sm"
            value={this.state.selected}
            toggle
          >
            <BTButton value="am" groupValue={this.state.selected} onClick={this.onClick} name={this.props.id}>
              AM off
            </BTButton>
            <BTButton value="pm" groupValue={this.state.selected} onClick={this.onClick} name={this.props.id}>
              PM off
            </BTButton>
          </ButtonGroup>
        </ButtonGroup>
     }
      </Card.Body>
    </Card>
  )
}

export default Date;
