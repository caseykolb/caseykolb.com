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
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.player != null)
			console.log(nextProps.player)
	}

	connectAudio() {
		var context = new AudioContext();
    	var audio = new Audio();
    	audio.crossOrigin = "anonymous";

    	// set source to SoundCloud stream_url + client ID
    	audio.src = this.props.source + '?client_id=' + this.client_id;

    	this.source = context.createMediaElementSource(audio);
		this.source.connect(context.destination);

		this.analyzer = context.createAnalyser();
    	this.analyzer.fftSize = 256;
    	this.source.connect(this.analyzer);
    	this.analyzer.connect(context.destination);

	    //setInterval(this.sampleAudioStream.bind(this), 5);
	}

	sampleAudioStream() {
		var streamData = new Uint8Array(this.analyzer.frequencyBinCount);
		this.analyzer.getByteFrequencyData(streamData)

        for (var i = 0; i < streamData.length; i = i + 2)
        	this.drawBar(streamData[i], i)
	}

	drawBar(freqData, index) {
		var bar = new createjs.Graphics();
		bar.setStrokeStyle(1);
		bar.beginStroke("#000000");
		bar.beginFill("red");

		var angle = Math.round((index / this.analyzer.frequencyBinCount) * 180)
		var x = this.centerX + (this.radius * Math.cos(angle));
		var y = this.centerY + (this.radius * Math.sin(angle));

		bar.drawRect(x, y, 4, freqData);
		var barShape = new createjs.Shape(bar);
		this.stage.addChild(barShape);
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
    source: React.PropTypes.string
};

export default Visualizer