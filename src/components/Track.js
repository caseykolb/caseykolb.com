import React from 'react'
import {Col, Image} from 'react-bootstrap'
import Visualizer from './Visualizer'
import css from './Track.css'

class Track extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			player: null,
			playing: false
		}
	}

	componentWillMount() {
		/*SC.stream('/tracks/' + this.props.data.id).then((player) => {
			this.setState({ player: player })
		})*/
	}

	transformArtworkURL() {
		const url = this.props.data.artwork_url;
		return (url != undefined) ? url.substr(0, url.lastIndexOf("-")+1) + 't300x300.jpg' : ''
	}

	play() {
		/*if (this.state.player != null && !this.state.playing) {
			this.setState({ playing: true })
			this.state.player.play();
		}*/
		this.setState({ playing: true })
	}

	stop() {
		/*if (this.state.player != null) {
			this.setState({ playing: false })
			this.state.player.pause();
		}*/
		this.setState({ playing: false })
	}

  	render() {
	    return (
	        <div className='track-wrapper'>
	        	<Col xs={12} sm={6} md={4} className='track'>
	        		<div style={{ backgroundImage: 'url(' + this.transformArtworkURL() + ')'}} 
	        			className='artwork'
						onMouseEnter={this.play.bind(this)} 
						onMouseLeave={this.stop.bind(this)} >
			        	<div className='text'>
	                		<strong>{this.props.data.title}</strong>
	                	</div>
	                	<div className='waveform'>
	                		<Image src={this.props.data.waveform_url} responsive rounded/>
	                	</div>
	                </div>
	                <Visualizer 
	                	width={300} 
	                	height={300} 
	                	source={this.props.data.stream_url} 
	                	artwork={this.props.data.artwork_url}
	                	playing={this.state.playing} />
	        	</Col>
	        </div>
	    	)
	}
}

Track.propTypes = {
    children: React.PropTypes.node,
    data: React.PropTypes.object,
};

export default Track