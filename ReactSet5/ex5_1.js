import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

class App extends Component {
	/**
	  * This method draws a simple house shape with two paths
	  * to the given context2d.
	  */
	drawHouse(ctx) {
		// House outline
		ctx.beginPath();
		ctx.moveTo(5, -15);
		ctx.lineTo(10, -10);
		ctx.lineTo(10, 0);
		ctx.lineTo(0, 0);
		ctx.lineTo(0, -10);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		// Roof extending outside the outline
		ctx.beginPath();
		ctx.moveTo(-2, -9);
		ctx.lineTo(5, -15);
		ctx.lineTo(12, -9);
		ctx.stroke();
	}
	
	/**
	  * This draws into the canvas when it becomes available.
	  */
	componentDidMount() {
		let ctx = this.canvas.getContext('2d');
		// Drawing the sky
		ctx.fillStyle = "lightblue";
		ctx.fillRect(0, 0, 600, 150);
		// Drawing ground half
		ctx.strokeStyle = "black";
		ctx.fillStyle = "green";
		ctx.fillRect(0, 150, 600, 50);
		ctx.strokeRect(0, 150, 600, 50);
		// Drawing three houses in different sizes
		ctx.translate(100, 150);
		ctx.scale(5, 5);
		this.drawHouse(ctx);
		ctx.translate(40, 0);
		ctx.scale(2, 1);
		this.drawHouse(ctx);
		ctx.translate(25, 0);
		ctx.scale(0.25, 1.1);
		this.drawHouse(ctx);
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App">
				<canvas width={600} height={200} ref={(el) => {this.canvas = el;}} />
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
