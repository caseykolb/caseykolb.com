import React from 'react'
import {Row, Col, Label} from 'react-bootstrap'
import css from './App.css'
import ReactCSSTransitionGroup from 'react-addons-transition-group'

class App extends React.Component {
  render() {
    return (
        <div>
      		<Row className="show-grid">
        		<Col xs={12} md={12}>
              		{this.props.children}
        		</Col>
        	</Row>
        </div>
    	)
  	}
}

App.propTypes = {
    children: React.PropTypes.node,
};

export default App