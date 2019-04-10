import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import rod from './rod.jpg';
import settings from './settings.json';
import LABELS from './labels';
import {rotateTransform, filterStyle} from './styleTools';
import {isColorString} from './colorTools';
import Slider from 'material-ui/Slider';
import './Resources.css';

/**
  * This example applications illustrates:
  * - undo functionality, basic implementation,
  * - slider usage, difference between onChange and onDragStop,
  * - using regular expression to reject bad values in text field,
  * - importing a JavaScript file, json file, css and an image file.
  * - using images from public folder.
  */
class App extends Component {
	constructor() {	
		super();

		this.state = {
			color: settings.color, // current shadow color
			rot: settings.rot, // current image to use
			rotCommitted: settings.rot, // rotation updated after the slider is released, separate from rot so that undo can work on this level
			picture: rod, // current, live rotation value
			history: [], // history for undo
			future: [], // undone operation for redo functionality
		}
	}
	updateColor = (e, v) => {
		if (isColorString(v)) {
			this.storeForUndo();
			this.setState({
				color: v
			});
		}
	}
	/**
	  * This is called whenever a slider moves.
	  */
	updateRotate = (i, v) => {
		let newRot = this.state.rot.slice(0, i).concat([v].concat(this.state.rot.slice(i+1)));
		this.setState({
			rot: newRot
		});
	}
	/**
	  * This is called once a slider has been released.
	  */
	commitRotate = () => {
		this.storeForUndo();
		this.setState({
			rotCommitted: this.state.rot
		});
	}
	swapImage = (v) => {
		this.storeForUndo();
		this.setState({
			picture: v
		});
	}
	/**
	  * This function builds entries which go to
	  * history/future (added after the lecture)
	  */
	buildHistoryEntry = () => {
		return {
			rot: this.state.rotCommitted,
			col: this.state.color,
			pic: this.state.picture
		}
	}
	/**
	  * This function put infor from a history entry
	  * to the state (added after the lecture).
	  */
	restoreHistoryEntry = (entry) => {
		this.setState({
			rotCommitted: entry.rot,
			rot: entry.rot,
			color: entry.col,
			picture: entry.pic,
		});
	}
	/**
	  * This stores current state information to history so that "undo" 
	  * functionality can work.
	  */
	storeForUndo = () => {
		this.setState({
			history: this.state.history.concat([this.buildHistoryEntry()]),
			future: []
		});
	}
	undo = () => {
		if (this.state.history.length > 0) {
			const c = this.state.history.pop();
			const h = this.state.history; // pop already removed the last entry in previous line
			const f = this.state.future.concat([this.buildHistoryEntry()]);
			this.restoreHistoryEntry(c);
			this.setState({
				history: h,
				future: f
			});
		}
	}
	redo = () => {
		if (this.state.future.length > 0) {
			const h = this.state.history.concat([this.buildHistoryEntry()]);
			const c = this.state.future.pop();
			const f = this.state.future; // pop already removed the last entry in previous line
			this.restoreHistoryEntry(c);
			this.setState({
				history: h,
				future: f
			});
		}
	}
	render() {
		let style = {transform: rotateTransform(this.state.rot), filter: filterStyle(this.state.color)};
		return(
			<MuiThemeProvider>
				<Paper style={{width: 300, textAlign: 'center'}}>
					<div style={{height: 200}}>
						<img src={this.state.picture} style={style} />
					</div>
					<div>{LABELS.rotate}</div>
					<div className="Slider-group">
						<Slider axis="y" style={{height: 100}}
						 step={1} min={0} max={180}
						 value={this.state.rot[0]}
						 onChange={(e, v) => {this.updateRotate(0, v);}}
						 onDragStop={(e) => {this.commitRotate();}}
						/>
						<Slider axis="y" style={{height: 100}}
						 step={1} min={0} max={180}
						 value={this.state.rot[1]}
						 onChange={(e, v) => {this.updateRotate(1, v);}}
						 onDragStop={(e) => {this.commitRotate();}}
						/>
						<Slider axis="y" style={{height: 100}}
						 step={1} min={0} max={180}
						 value={this.state.rot[2]}
						 onChange={(e, v) => {this.updateRotate(2, v);}}
						 onDragStop={(e) => {this.commitRotate();}}
						/>
					</div>
					<div>{LABELS.shadowColor}</div>
					<div>
						<TextField
							name="color"
							value={this.state.color}
							onChange={this.updateColor}
						/>
					</div>
					<RadioButtonGroup
						name="pictureSelection"
						valueSelected={this.state.picture}
						onChange={(e, v) => {this.swapImage(v);}}
					>
						<RadioButton value={rod} label="rod from src" />
						<RadioButton value="react1.png" label="logo from public" />
					</RadioButtonGroup>
					<div>
						<RaisedButton label="Undo" onClick={this.undo}
						 disabled={this.state.history.length === 0}
						/>
						<RaisedButton label="Redo" onClick={this.redo}
						 disabled={this.state.future.length === 0}
						/>
					</div>
				</Paper>
			</MuiThemeProvider>
		);
	}
}
export default App;