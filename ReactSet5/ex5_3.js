import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const WIDTH = 600;
const HEIGHT = 600;

class App extends Component {
	constructor() {
		super();
		this.state = {
			offsetX: 0,
			offsetY: 0,
		}
	}
	
	componentDidMount(preProps, prevState) {
		this.redrawCanvas();
	}
	
	componentDidUpdate(preProps, prevState) {
		// This gets called whenever eye offset values change.
		this.redrawCanvas();
	}
	
	setOffset = (x, y) => {
		// Calculate where the eyes should point, or rather
		// how much they should offset from center/middle.
		// Using div element accessed via ref to get 
		// reference for the mouse coordinates.
		this.setState({
			offsetX: (x-this.area.clientWidth/2)/this.area.clientWidth*WIDTH/12, 
			offsetY: (y-this.area.clientHeight/2)/this.area.clientHeight*HEIGHT/12, 
		});
	}
	
	redrawCanvas() {
		const ctx = this.canvas.getContext('2d');

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		
		ctx.lineWidth = 2;
		// Outline
		ctx.beginPath();
		ctx.arc(WIDTH/2, HEIGHT/2, WIDTH/3, 0, Math.PI * 2, false);
		ctx.stroke();
		// Eyes
		for (var i = 0; i < 2; i++) {
			// Outline
			ctx.beginPath();
			ctx.arc(WIDTH/2+((i===0)?WIDTH/-6:WIDTH/6), HEIGHT/2-HEIGHT/8, WIDTH/12, 0, Math.PI * 2, false);
			ctx.stroke();
			// Pupil
			ctx.beginPath();
			ctx.arc(WIDTH/2+((i===0)?WIDTH/-6:WIDTH/6)+this.state.offsetX, HEIGHT/2-HEIGHT/8+this.state.offsetY, WIDTH/24, 0, Math.PI * 2, false);
			ctx.fill();
		}
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div>
				<Paper 
					onMouseMove={(e) => {this.setOffset(e.clientX, e.clientY);}} 
					style={{width: WIDTH, height: HEIGHT}} 
					zDepth={5} 
				>
					<div ref={(el) => {this.area = el;}} >
						<div onTouchTap={this.doPopover}><canvas width={WIDTH} height={HEIGHT} ref={(el) => {this.canvas = el;}} /></div>
					</div>
				</Paper>
			</div>
			
		</MuiThemeProvider>
		);
	}
}

export default App;
