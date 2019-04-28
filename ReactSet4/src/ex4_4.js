import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
  * This React solution to exercise 4.4 implementes minimal
  * undo objects which encapsulate the undo operation, kind 
  * of similar to UndoableEdit objects which Java/Swing 
  * UndoManager works with. These could be extended to support
  * redo functionality as well and the solutions would expand
  * easily to more different undoable operations in an application.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			colorName: "Red",
			red: 255,
			green: 128,
			blue: 0,
			color: "rgb(255,128,0)",
			combinations: [],
			undoStack: [],
		}
	}
	
	styles = {
	  sliders: {
		display: 'flex',
		height: 150,
		flexDirection: 'row',
		justifyContent: 'space-around',
	  },
	};	
	
	updateColorName = (v) => {
		this.setState({
			colorName: v,
		});
	}
	
	updateRed = (v) => {
		this.setState({
			red: v,
		});
	}

	updateGreen = (v) => {
		this.setState({
			green: v,
		});
	}

	updateBlue = (v) => {
		this.setState({
			blue: v,
		});
	}
	
	commitColor = () => {
		const c = this.state.color; // can't use this.state.color directly in the next line as it will be evaluated later and would use the variable value at that time.
		const edit = {undo: () => {this.undoColor(c);}};
		this.setState({
			color: "rgb("+this.state.red+","+this.state.green+","+this.state.blue+")",
			undoStack: this.state.undoStack.concat(edit),
		});
	}
	
	undo = () => {
		console.log("in undo");
		if (this.state.undoStack.length > 0) {
			let edit = this.state.undoStack[this.state.undoStack.length-1];
			console.log("edit:", edit);
			edit.undo();
			this.setState({
				undoStack: this.state.undoStack.slice(0, this.state.undoStack.length-1),
			})
		}
	}
	
	add = () => {
		const newCombinations = this.state.combinations.concat({color: this.state.color, name: this.state.colorName});
		const edit = {undo: () => {this.undoAdd()}};
		this.setState({
			combinations: newCombinations,
			undoStack: this.state.undoStack.concat(edit),
		});
	}
	
	undoAdd = () => {
		this.setState({
			combinations: this.state.combinations.slice(0, this.state.combinations.length-1),
			undoStack: this.state.undoStack.slice(0, this.state.undoStack.length-1),
		});
	}
	
	undoColor = (colorString) => {
		const cols = colorString.substring(4, colorString.length-1).split(",");
		this.setState({
			red: parseInt(cols[0]),
			green: parseInt(cols[1]), 
			blue: parseInt(cols[2]),
			color: colorString,
			undoStack: this.state.undoStack.slice(0, this.state.undoStack.length-1),
		});
	}
	
	render() {
		let selections = [];
		for (var i = 0; i < this.state.combinations.length; i++) {
			const comb = this.state.combinations[i];
			selections.push(<div style={{backgroundColor: comb.color}}>{comb.name}</div>);
		}
		const c = "rgb(" + this.state.red + "," + this.state.green + "," + this.state.blue + ")";
		
		return (
			<MuiThemeProvider>
				<div className="App">
					<Paper style={{width: 300, textAlign: 'center',}}>
						<div>
							<RaisedButton disabled={this.state.undoStack.length === 0} label="Undo" onTouchTap={this.undo} />
						</div>
						<SelectField 
							onChange={(e, i, v) => {this.updateColorName(v);}}
							floatingLabelText="Select color name"
							value={this.state.colorName}
						>
							<MenuItem value="Red" primaryText="Red" />
							<MenuItem value="Green" primaryText="Green" />
							<MenuItem value="Cyan" primaryText="Cyan" />
							<MenuItem value="Peach" primaryText="Peach" />
						</SelectField>
						
						<div style={{backgroundColor: c}} >
							<div style={this.styles.sliders}>
								<Slider 
									style={{height: 100}} 
									value={this.state.red} 
									step={1} min={0} max={255} 
									onDragStop={(e) => {this.commitColor();}}
									onChange={(e, v) => {this.updateRed(v);}}
									axis="y"
								/>
								<Slider 
									style={{height: 100}} 
									value={this.state.green} 
									step={1} min={0} max={255} 
									onDragStop={(e) => {this.commitColor();}}
									onChange={(e, v) => {this.updateGreen(v);}}
									axis="y"
								/>
								<Slider 
									style={{height: 100}} 
									value={this.state.blue} 
									step={1} min={0} max={255} 
									onDragStop={(e) => {this.commitColor();}}
									onChange={(e, v) => {this.updateBlue(v);}}
									axis="y"
								/>
							</div>
						</div>
						<div>
							<RaisedButton label="->" onTouchTap={this.add} />
						</div>
						<div>
							{selections}
						</div>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
