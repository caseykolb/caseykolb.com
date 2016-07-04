import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import { Button, Grid, Row, Col, Image } from 'react-bootstrap'
import Loader from 'react-loader' 
import Track from '../components/Track'
import css from './Music.css'


class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            loaded: false
        }
    }

    componentWillMount() {
        this.fetchTracks()
    }

    fetchTracks() {
    	SC.resolve('http://soundcloud.com/virginia-kilbertus-music').then((user) => {
            SC.get('/users/' + user.id + ' /tracks').then((tracks) => {
                this.setState({ tracks: tracks, loaded: true })
            })
        })
    }

	render() {
        return (<div>
        		<Loader loaded={this.state.loaded} scale={3.00} color='#807182'>
	        		<Grid fluid>
		        		<Row className="track-row">
		                    {this.state.tracks.map((track, index) => {
		                        return (<Track key={track.id} data={track} />)
		                    })}
		                </Row>
	                </Grid>
	            </Loader>
            </div>);
    }
}

Music.propTypes = {
    params: React.PropTypes.object,
};

export default Music;