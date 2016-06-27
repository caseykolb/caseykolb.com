import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink } from 'react-router'
import FullScreen from 'react-fullscreen';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import css from './Menu.css'

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
        // Init CreateJS
        var canvas = ReactDOM.findDOMNode(this.refs.canvas)
        this.stage = new createjs.Stage(canvas);
        createjs.Ticker.addEventListener('tick', this.stage);
        createjs.Ticker.setFPS(45);

        // Set Properties
        this.canvasWidth = this.stage.canvas.width;
        this.canvasHeight = this.stage.canvas.height;

        var menuCircle = new createjs.Shape();
        menuCircle.radius = 180;
        menuCircle.graphics.setStrokeStyle(1).beginStroke("Black").drawCircle(0, 0, menuCircle.radius);
        menuCircle.x = this.canvasWidth / 2;
        menuCircle.y = this.canvasHeight / 2;
        this.stage.addChild(menuCircle);

        var music = new createjs.Bitmap("assets/img/music-icon.png");
        music.x = canvas.width / 2;
        music.y = canvas.height / 2 - menuCircle.radius;
        music.regX = music.image.width / 2;
        music.regY = music.image.height / 2;
        music.scaleX = music.scaleY = music.scale = 0.3;
        this.stage.addChild(music);
        */
    }

	render() {
        return (
            /*<FullScreen>
                    <canvas ref="canvas" id="menu"></canvas>
                </FullScreen>*/
            <div className="menu">
                <IndexLink to={`/music`}><Button>Music</Button></IndexLink>
                <IndexLink to={`/bio`}><Button>Bio</Button></IndexLink>
            </div>
        );
    }
}

Menu.propTypes = {
    params: React.PropTypes.object,
};

export default Menu;