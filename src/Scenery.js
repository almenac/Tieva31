import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';

/**
  * This application provides an example of basic canvas drawing
  * and examples of lifecycle methods and usage of refs.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			skyColor: "#00ffff",
			sunLocation: {x: 0, y: 0},
			animating: false,
			sliderValue: 0,
			imageSource: null,
			useImage: false,
			message: "Greetings",
		}
		this.ourCanvas = null;
		this.image = null;
		this.animationRequest = null;
	}
	
	// methods updating state per component interactions
	
	adjustSlider = (e, v) => {
		this.setState({
			sliderValue: v,
		});
		this.update(v / 2000.0);
	}

	switchImage = () => {
		// image source starts image loading. useImage is updated in the end of the load and only after that the image is used.
		this.setState({
			imageSource: this.state.imageSource===null?"http://i.imgur.com/pShXHzp.jpg":null,
			useImage: false, 
		});
	}	
	
	switchAnimation = () => {
		this.setState({
			animating: !this.state.animating,
		});
	}

	// other methods called from different events
	
	/**
	  * This function is called after the source <image> has loaded.
	  */
	applyImage =  () => {
		this.setState({
			useImage: true, 
		});
	}
	
		
	/**
	  * This is called when browser window resizes, see componentDidMount().
	  */
	handleResize(){
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}
	
	// Internal functions

	/**
	  * This function updates graphics related state
	  * values skyColor and sunLocation.
	  */
	update = (sunPhase) => {
		const sunHeight = Math.sin(sunPhase*Math.PI);
		let red = Math.round(255-sunHeight * 255).toString(16);
		if (red.length === 1)
			red = "0" + red;
		let green = Math.round(sunHeight * 255).toString(16);
		if (green.length === 1)
			green = "0" + green;
		this.setState({
			sunLocation: {
				x: sunPhase * this.state.width,
				y: this.state.height/2 - sunHeight * this.state.height / 2,
			},
			skyColor: "#" + red + green + "ff",
		});
	}
	
	/**
	  * This method runs the animation loop. The loop runs, even
	  * if the graphics are not animating. In that case, only the 
	  * drawing is skipped.
	  */
	animate = () => {
		if (this.state.animating) {
			// The update call updates the state and therefore 
			// causes componentDidUpdate call, which redraws the graphics.
			this.update((new Date().getTime()%2000)/2000);
		}
		this.animationRequest = requestAnimationFrame(this.animate);
	}
	
	// Lifetime methods 
	
	componentDidMount() {
		window.addEventListener('resize', () => {this.handleResize()});
		// initialize some of the state values
		this.update(0);
		// start animation loop
		this.animationRequest = requestAnimationFrame(this.animate);
	}
	
	componentDidUpdate() {
		// Don't update state here or you will get an infinite loop (e.g., can't call animate).
		this.redrawCanvas();
	}
	
	componentWillUnmount() {
		// terminate the animation loop
		if (this.animationRequest !== null)
			cancelAnimationFrame(this.animationRequest);
	}
	
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Paper style={{width: this.state.width, height: this.state.height}} zDepth={5}>
						<div>
							<canvas 
								width={this.state.width} 
								height={this.state.height} 
								ref={(el) => {this.ourCanvas = el;}} 
							/>
						</div>
						<img 
							alt="source material" 
							onLoad={this.applyImage} 
							style={{display: "None"}} 
							src={this.state.imageSource} 
							ref={(el) => {this.image = el;}} 
						/>
					</Paper>
					<FlatButton label={this.state.animating?"Stop":"Play"} onClick={this.switchAnimation} />
					<FlatButton label={this.state.imageSource===null?"Use Image":"Remove Image"} onClick={this.switchImage} />
					<Slider disabled={this.state.animating} value={this.state.sliderValue} onChange={this.adjustSlider} min={0} max={2000} />
				</div>
			</MuiThemeProvider>
		);
	}
	
	// Canvas drawing
	redrawCanvas() {
		// context is the actual drawing API
		let ctx = this.ourCanvas.getContext('2d');
		// first you usually want to clear or fill the entire graphics.
		ctx.fillStyle = this.state.skyColor;
		ctx.fillRect(0, 0, this.state.width, this.state.height);
		// image in the sky area
		if (this.state.useImage) {
			ctx.drawImage(this.image, 0, 0, this.state.width, this.image.height/this.image.width*this.state.width);
		}
		// sun, yellow inside and black outline		
		ctx.strokeStyle = "black";
		ctx.fillStyle = "yellow";
		ctx.beginPath();
		ctx.arc(
			this.state.sunLocation.x, 
			this.state.sunLocation.y, 
			Math.min(this.state.width, this.state.height)/8, 
			0, 
			Math.PI*2, 
			true);
		ctx.fill();
		ctx.stroke();
		// green bottom
		ctx.fillStyle = "green";
		ctx.fillRect(0, this.state.height/2, this.state.width, this.state.height/2);
		ctx.strokeRect(0, this.state.height/2, this.state.width, this.state.height/2);
		// text
		ctx.font = '48px sans-serif';
		ctx.lineWidth = 2;
		ctx.fillStyle = "black";
		// measureText provides information how much space a text will take when drawn,
		// use this information to align text in the center of the graphics (there is a
		// textAlign = 'center' functionality in context2D so using measureText for this
		// would not be necessary).
		const metrics = ctx.measureText(this.state.message);
		ctx.fillText(this.state.message, this.state.width/2-metrics.width/2, this.state.height * 0.75);
	}
}

export default App;
