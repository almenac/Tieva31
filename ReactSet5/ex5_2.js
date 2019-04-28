import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const UPPER = "upper";
const LOWER = "lower";
const IMAGE = "image";

const WIDTH = 600;
const HEIGHT = 600;

class App extends Component {
	constructor() {
		super();
		this.state = {
			imageSource: null,
			upperText: "",
			lowerText: "",
			popOpen: false,
			dialogOpen: false,
			editedValue: null,
			editTarget: null,
		}
	}
	
	actions = [
		<FlatButton
		 label="Cancel"
		 primary={true}
		 onTouchTap={() => {this.closeDialog(false);}}
		/>,
		<FlatButton
		 label="OK"
		 primary={true}
		 keyboardFocused={true}
		 onTouchTap={() => {this.closeDialog(true);}}
		/>,
	];
	
	doPopover = (event) => {
		this.setState({
			popOpen: true, 
			popupAnchor: event.currentTarget
		});
	}
	
	selectText = (upper) => {
		this.setState({
			popOpen: false,
			dialogOpen: true,
			editTarget: upper?UPPER:LOWER,
			editedValue: upper?this.state.upperText:this.state.lowerText,
		});
	}
	
	selectImage = () => {
		this.setState({
			popOpen: false,
			dialogOpen: true,
			editTarget: IMAGE,
			editedValue: this.state.imageSource!==null?this.state.imageSource:"http://",
		});
	}
	
	valueChange = (event) => {
		this.setState({
			editedValue: event.target.value,
		});
	}
	
	closeDialog = (commit) => {
		if (commit) {
			if (this.state.editTarget === UPPER) {
				this.setState({upperText: this.state.editedValue});
			} else if (this.state.editTarget === LOWER) {
				this.setState({lowerText: this.state.editedValue});
			} else {
				this.setState({imageSource: this.state.editedValue});
			}
		}
		this.setState({dialogOpen: false});
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
		
		ctx.font = '48px sans-serif';
		ctx.lineWidth = 2;
		ctx.drawImage(this.image, 0, 0, WIDTH, this.image.height/this.image.width*WIDTH);
		let metrics = ctx.measureText(this.state.upperText);
		ctx.fillText(this.state.upperText, WIDTH/2-metrics.width/2, 48);
		ctx.strokeText(this.state.upperText, WIDTH/2-metrics.width/2, 48);
		metrics = ctx.measureText(this.state.lowerText);
		ctx.fillText(this.state.lowerText, WIDTH/2-metrics.width/2, HEIGHT-20);
		ctx.strokeText(this.state.lowerText, WIDTH/2-metrics.width/2, HEIGHT-20);
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div>
				<Paper style={{width: WIDTH, height: HEIGHT}} zDepth={5}>
					<div onTouchTap={this.doPopover}><canvas width={WIDTH} height={HEIGHT} ref={(el) => {this.canvas = el;}} /></div>
					<img onLoad={(e) => {this.redrawCanvas();}} alt="source material" style={{display: "None"}} src={this.state.imageSource} ref={(el) => {this.image = el;}} />
					<Popover 
						open={this.state.popOpen} 
						onRequestClose={() => {this.setState({popOpen: false})}}
						anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'left', vertical: 'bottom'}}	
						anchorEl={this.state.popupAnchor}
					>
						<Menu>
							<MenuItem value="setImage" primaryText="Set image" onTouchTap={(e) => {this.selectImage()}} />
							<MenuItem value="setUpper" primaryText="Set upper..." onTouchTap={(e) => {this.selectText(true)}} />
							<MenuItem value="setLower" primaryText="Set lower..." onTouchTap={(e) => {this.selectText(false)}} />
						</Menu>
					</Popover>
					</Paper>
					<Dialog
						title="Set text"
						actions={this.actions}
						modal={true}
						open={this.state.dialogOpen}
						onRequestClose={this.handleClose}
					>
						<TextField 
						 id="dialogField" 
						 disabled={false} 
						 value={this.state.editedValue===null?"":this.state.editedValue} 
						 onChange={this.valueChange} 
						/>
				</Dialog>
			</div>
			
		</MuiThemeProvider>
		);
	}
}

export default App;
