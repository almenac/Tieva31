import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

const WIDTH = 600;
const HEIGHT = 600;

const ROT_OFFSET = Math.PI / 4; // this constant can rotate the visualization, the value has been selected to minimize overlap of texts.

/**
  * This example solutions implements everything into one component.
  * The edit dialogs could easily be separated into separate components.
  *
  * To extent, the solutions supports different numbers of sets. You can try 
  * adding more to the state.sets. Intersection labels are not created correcly 
  * when sets.length != 3.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			sets: [
				{name: "a",
				 color: "#ff0000",
				},
				{name: "b",
				 color: "#00ff00",
				},
				{name: "c",
				 color: "#0000ff",
				},
			],
			textDialogOpen: false,
			colorDialogOpen: false,
			popOpen: false,
			editedText: null,
			editedColor: "#000000",
			targetSet: 0,
		}
		this.radius = (Math.min(WIDTH, HEIGHT)/4);
	}
	
	textActions = [
		<FlatButton
		 label="Cancel"
		 primary={true}
		 onTouchTap={() => {this.closeTextDialog(false);}}
		/>,
		<FlatButton
		 label="OK"
		 primary={true}
		 keyboardFocused={true}
		 onTouchTap={() => {this.closeTextDialog(true);}}
		/>,
	];

	colorActions = [
		<FlatButton
		 label="Cancel"
		 primary={true}
		 onTouchTap={() => {this.closeColorDialog(false);}}
		/>,
		<FlatButton
		 label="OK"
		 primary={true}
		 keyboardFocused={true}
		 onTouchTap={() => {this.closeColorDialog(true);}}
		/>,
	];

	/**
	  * Calculates the center point X for given set, parameter is set index (0..2)
	  */
	getSetX = (setIndex) => {
		return (WIDTH/2) + Math.cos(setIndex * (Math.PI*2/this.state.sets.length) + ROT_OFFSET) * (this.radius*0.9);
	}
	
	/**
	  * Calculates the center point Y for given set, parameter is set index (0..2)
	  */
	getSetY = (setIndex) => {
		return (HEIGHT/2) + Math.sin(setIndex * (Math.PI*2/this.state.sets.length) + ROT_OFFSET) * (this.radius*0.9);
	}
	
	doPopover = (event) => {
		// calculate targetSet index per mouse x, y within canvas
		for (var i = 0; i < this.state.sets.length; i++) {
			// If distance to set centre is smaller than radius, we have a hit
			if (Math.hypot(this.getSetX(i)-event.nativeEvent.clientX, this.getSetY(i)-event.nativeEvent.clientY) < this.radius) {
				this.setState({
					targetSet: i,
					popOpen: true, 
					popupAnchor: event.currentTarget
				});
				break;
			}
		}
	}
	
	selectText = () => {
		this.setState({
			popOpen: false,
			textDialogOpen: true,
			editedText: this.state.sets[this.state.targetSet].name,
		});
	}
	
	selectColor = () => {
		this.setState({
			popOpen: false,
			colorDialogOpen: true,
			editedColor: this.state.sets[this.state.targetSet].color,
		});
	}
	
	valueChange = (event) => {
		this.setState({
			editedText: event.target.value,
		});
	}
	
	colorChange = (value, i) => {
		let c = value.toString(16);
		if (c.length === 1)
			c = "0" + c;
		let nc = this.state.editedColor.substring(0, i*2+1) + c + this.state.editedColor.substring(i*2+3);
		this.setState({
			editedColor: nc,
		});
	}
	
	closeTextDialog = (commit) => {
		if (commit) {
			let sets = this.state.sets;
			sets[this.state.targetSet].name = this.state.editedText;
			this.setState({
				sets: sets,
			});
		}
		this.setState({
			textDialogOpen: false,
		});
	}
	
	closeColorDialog = (commit) => {
		if (commit) {
			let sets = this.state.sets;
			sets[this.state.targetSet].color = this.state.editedColor;
			this.setState({
				sets: sets,
			});
		}
		this.setState({
			colorDialogOpen: false,
		});
	}
	
	componentDidMount() {
		this.redrawCanvas();
	}
	
	componentDidUpdate(preProps, prevState) {
		this.redrawCanvas();
	}
	
	redrawCanvas() {
		let ctx = this.canvas.getContext('2d');

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.lineWidth = 2;
		// First fill each set circle
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 1.0;
		for (let i = 0; i < this.state.sets.length; i++) {
			ctx.fillStyle = this.state.sets[i].color;
			ctx.beginPath();
			ctx.arc(this.getSetX(i), this.getSetY(i), this.radius, 0, 2*Math.PI, true);
			ctx.fill();	
		}
		// Then draw with semitransparent lighting operation to get overlaps have color that is type of mixture of the colors
		ctx.globalCompositeOperation = "lighten";
		ctx.globalAlpha = 0.5;
		for (let i = 0; i < this.state.sets.length; i++) {
			ctx.fillStyle = this.state.sets[i].color;
			ctx.beginPath();
			ctx.arc(this.getSetX(i), this.getSetY(i), this.radius, 0, 2*Math.PI, true);
			ctx.fill();			
		}
		// Then draw the outlines in black and text labels with white fill and black outline
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 1.0;
		ctx.fillStyle = "white";
		// calculate information for middle label at the same time
		let labelAll = "";
		let allX = 0;
		let allY = 0;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		for (let i = 0; i < this.state.sets.length; i++) {
			// Label for the set
			ctx.font = '48px sans-serif';
			ctx.lineWidth = 2;
			const set = this.state.sets[i];
			ctx.fillText(set.name, this.getSetX(i), this.getSetY(i));
			ctx.strokeText(set.name, this.getSetX(i), this.getSetY(i));
			ctx.beginPath();
			ctx.arc(this.getSetX(i), this.getSetY(i), this.radius, 0, 2*Math.PI, true);
			ctx.stroke();
			// Label for the overlap with next/first, i.e., the two set intersection areas
			ctx.font = '24px sans-serif';
			ctx.lineWidth = 1;
			const ni = (i+1)%this.state.sets.length;
			const next = this.state.sets[ni];
			const label = set.name + "+" + next.name;
			ctx.fillText(
				label, 
				(this.getSetX(i) + this.getSetX(ni))/2,
				(this.getSetY(i) + this.getSetY(ni))/2
				);
			ctx.strokeText(
				label, 
				(this.getSetX(i) + this.getSetX(ni))/2,
				(this.getSetY(i) + this.getSetY(ni))/2
				);
			labelAll += "+"+set.name;
			allX += this.getSetX(i);
			allY += this.getSetY(i);
		}
		// Draw the label in the center (all sets intersection)
		labelAll = labelAll.substring(1); // remove the first +
		ctx.fillText(
			labelAll, 
			allX/this.state.sets.length,
			allY/this.state.sets.length
			);
		ctx.strokeText(
			labelAll, 
			allX/this.state.sets.length,
			allY/this.state.sets.length
			);
	}
	
	render() {
		const rgb = parseInt(this.state.editedColor.substring(1), 16);
		const red = rgb >> 16;
		const green = (rgb >> 8) & 0xff;
		const blue = rgb & 0xff;
		return (
		<MuiThemeProvider>
			<div>
				<Paper style={{width: WIDTH, height: HEIGHT}} zDepth={5}>
					<div onTouchTap={this.doPopover}><canvas width={WIDTH} height={HEIGHT} ref={(el) => {this.canvas = el;}} /></div>
					<Popover 
						open={this.state.popOpen} 
						onRequestClose={() => {this.setState({popOpen: false})}}
						anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
						targetOrigin={{horizontal: 'middle', vertical: 'center'}}	
						anchorEl={this.state.popupAnchor}
					>
						<Menu>
							<MenuItem value="setColor" primaryText="Set text..." onTouchTap={(e) => {this.selectText(true)}} />
							<MenuItem value="setText" primaryText="Set color..." onTouchTap={(e) => {this.selectColor(false)}} />
						</Menu>
					</Popover>
				</Paper>
				
				<Dialog
					title="Set text"
					actions={this.textActions}
					modal={true}
					open={this.state.textDialogOpen}
					onRequestClose={() => {this.closeColorDialog(false);}}
				>
					<TextField 
					 id="dialogField" 
					 disabled={false} 
					 value={this.state.editedText===null?"":this.state.editedText} 
					 onChange={this.valueChange} 
					/>
				</Dialog>
				<Dialog
					title="Set color"
					actions={this.colorActions}
					modal={true}
					open={this.state.colorDialogOpen}
					onRequestClose={this.handleColorClose}
				>
					<div style={{display: 'flex', height: 150, flexDirection: 'row', justifyContent: 'space-around'}}>
						<Slider 
							value={red} 
							onChange={(e, v) => {this.colorChange(v, 0);}}
							min={0}	max={255} step={1}
							axis="y"
						/>
						<Slider 
							value={green} 
							onChange={(e, v) => {this.colorChange(v, 1);}}
							min={0}	max={255} step={1}
							axis="y"
						/>
						<Slider 
							value={blue} 
							onChange={(e, v) => {this.colorChange(v, 2);}}
							min={0}	max={255} step={1}
							axis="y"
						/>
						<div style={{backgroundColor: this.state.editedColor, width: 100, height: 100}}>
							
						</div>						
					</div>					
				</Dialog>
			</div>
			
		</MuiThemeProvider>
		);
	}
}

export default App;
