import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'    

class Music extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

	render() {
        return (
            <div>Hello</div>
        );
    }
}

Music.propTypes = {
    params: React.PropTypes.object,
};

export default Music;