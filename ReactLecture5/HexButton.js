import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
  * This class implements a hexagonal button.
  * The button indicates mouse hover with slight
  * color change.
  */
class HexButton extends Component {
	constructor() {
		super();
		this.state = {
			mouseIsOver: false, // controls highlight
		}
		this.canvas = null; // updated via ref
	}
	
	/**
	  * This method calls onClick if provided 
	  * mouse event is inside the actual button
	  * hexagon.
	  */
	checkTap = (e) => {
		if (this.inside(e.nativeEvent))
			this.props.onClick(e);
	}
	
	/**
	  * This method update mouseIsOver state item.
	  */
	checkMouse = (e) => {
		this.setState({
			mouseIsOver: this.inside(e),
		});
	}	
	
	/**
	  * Draw the canvas graphics when some prop or state changed.
	  */
	componentDidUpdate(prevProps, prevState) {
		this.redrawCanvas();
	}
	
	/**
	  * Draw the canvas graphics when the component first appears on screen.
	  */
	componentDidMount() {
		this.redrawCanvas();
	}
	
	/**
	  * This method calculates if the mouse coordinates
	  * of the given mouse event are inside the hexagon.
	  */
	inside = (e) => {
		if (!e)
			return false;
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const bounds = this.canvas.getBoundingClientRect();
		// first make sure if the mouse is inside the canvas (can be false since this is called from mouseOut as well.
		let inside = mouseX >= bounds.left && mouseX < bounds.right && mouseY >= bounds.top && mouseY < bounds.bottom;
		if (inside) {
			// check if mouse is inside the hexagon, alternatively this 
			// could be implemented by using CanvasRenderingContext2D.isPointInPath()
			const distFromMid = Math.abs((mouseY - bounds.top - (bounds.bottom-bounds.top)/2)/(bounds.height/2));
			const width = (1.0-distFromMid) * 0.5 + 0.5;
			const relX = Math.abs(bounds.width/2 - (mouseX - bounds.left)) / (bounds.width/2);
			if (relX > width)
				inside = false;
		}
		return inside;
	}
	
	/**
	  * This method paints the hexagon button graphics and text label
	  * into the <canvas>.
	  */
	redrawCanvas() {
		let ctx = this.canvas.getContext('2d');
		// This painting adjusts transform (scaling, translating) and therefore we must remember to reset it.
		ctx.resetTransform();
		// reset also the composite operation to the default value
		ctx.globalCompositeOperation = "source-over";
		// adjust coordinate system so that 0,0 is in the center and width and height are 2 units
		ctx.scale(this.props.width/2.0, this.props.height/2.0);
		ctx.translate(1.0, 1.0);
		// clear everything, i.e., make everything transparent
		ctx.clearRect(-1, -1, 2, 2);
		// draw the actual hexagon, first set styles
		ctx.fillStyle = this.props.color;
		ctx.lineWidth = 0.1; // since the canvas is now scaled to 2 units wide, line with must be small
		ctx.strokeStyle = "black";
		// create the hexagonal path
		ctx.beginPath();
		ctx.moveTo(1, 0);
		for (var angle = Math.PI/3; angle < 2*Math.PI; angle+=Math.PI/3) {
			// thanks to our optimized coordinate system, this is simple
			ctx.lineTo(Math.cos(angle), Math.sin(angle));
		}
		// fill and stroke the hexagon
		ctx.fill();
		ctx.stroke();
		// if need to highlight, paint over existing content with half-transparent gray
		if (this.state.mouseIsOver) {
			ctx.globalCompositeOperation = "source-atop";
			ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
			ctx.fillRect(-1, -1, 2, 2);
		}
		// Draw the text with different composite.
		ctx.fillStyle = "white";
		ctx.globalCompositeOperation = "difference";
		ctx.scale(0.02, 0.02);
		ctx.font = '14pt sans-serif';
		// set text alignment so that coordinates specify the center point.
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.props.label, 0, 0);
	}
	
	render() {
		return (
			<div 
				onClick={(e) => {this.checkTap(e);}}
				onMouseEnter={(e) => {this.checkMouse(e);}}
				onMouseOut={(e) => {this.checkMouse(e);}}
				onMouseMove={(e) => {this.checkMouse(e);}}
			>
					<canvas 
						width={this.props.width} 
						height={this.props.height} 
						ref={(el) => {this.canvas = el;}} 
					/>
			</div>
		);
	}
}

export default HexButton;
