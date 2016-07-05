import React from 'react'
import ReactDOM from 'react-dom'
import css from './Visualizer'

class Visualizer extends React.Component {
	constructor(props) {
		super(props)

		this.client_id = '4b5c0ba7c1c975229158789980bcd8b0'
		this.radius = this.props.width / 2;
		this.centerX = this.props.width / 2;
		this.centerY = this.props.height / 2;
	}

	componentDidMount() {
		var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.stage = new createjs.Stage(canvas);
        createjs.Ticker.addEventListener('tick', this.stage);
        createjs.Ticker.setFPS(45);  

        this.connectAudio()

        // gather color palette from artwork
        var colorThief = new ColorThief();
        var artwork = new Image();
        artwork.crossOrigin = "Anonymous";
        artwork.src = this.props.artwork;
        artwork.onload = function() {
			this.palette = colorThief.getPalette(artwork, 8);
		}.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.playing) {
			this.audio.play();
			this.tick = setInterval(this.sampleAudioStream.bind(this), 50);
		}
		else if (this.audio != undefined) {
			this.audio.pause();
			clearInterval(this.tick);
			this.stage.removeAllChildren();
		}
	}

	connectAudio() {
		var context = new AudioContext();
		this.audio = new Audio();
		this.audio.crossOrigin = "anonymous";
		this.audio.src = this.props.source + '?client_id=4b5c0ba7c1c975229158789980bcd8b0';
    	this.source = context.createMediaElementSource(this.	audio);
		this.source.connect(context.destination);
		this.analyzer = context.createAnalyser();
    	this.analyzer.fftSize = 256;
    	this.source.connect(this.analyzer);
    	this.analyzer.connect(context.destination);
		
	}

	sampleAudioStream() {
		this.stage.removeAllChildren();
		var streamData = new Uint8Array(this.analyzer.frequencyBinCount);
		this.analyzer.getByteFrequencyData(streamData)

        for (var i = 0; i < streamData.length - 40; i++)
        	this.drawBar(streamData[i], i)
	}

	drawBar(freqData, index) {
		// map indices to radians -1 to 1
		var radian = Math.PI * (index / (this.analyzer.frequencyBinCount - 40)) * 2;
		var color = this.palette[Math.floor(Math.random() * 7)]; 

		var x = this.centerX + (this.radius * Math.cos(radian));
		var y = this.centerY + (this.radius * Math.sin(radian));
		var w = freqData / 8 + 2;
		var h = 16;

		var bar = new createjs.Shape(bar);
		bar.graphics.beginFill('rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 1.0)').drawRect(0, 0, w, h)
		bar.x = x;
		bar.y = y;
		bar.rotation = radian * (180 / Math.PI) ;
		this.stage.addChild(bar);
	}

  	render() {
	    return (<div className='canvas'>
	        	<canvas ref="canvas" 
                    width={this.props.width}
                    height={this.props.height}/>
	        </div>)
	}
}

Visualizer.propTypes = {
    children: React.PropTypes.node,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    source: React.PropTypes.string,
    playing: React.PropTypes.bool
};

export default Visualizer