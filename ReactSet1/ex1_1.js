import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

class App extends Component {
	constructor() {
		super();
		this.state = {
			first: "",
			middle: "",
			last: "",
			middleNameEnabled: false,
		}
	}
	
	/**
	  * The updateName method takes an integer indicating which
	  * of the fields to update. This enables the use of a single
	  * method for all the text fields. Arrow notation is used
	  * to include the integer into the relevant call in the 
	  * interface specification (i.e., in render() return value).
	  */
	updateName = (part, newName) => {
		this.setState({
			first: part===0?newName:this.state.first,
			middle: part===1?newName:this.state.middle,
			last: part===2?newName:this.state.last,
		});
	}
	
	adjustCheck = (event, isChecked) => {
		this.setState({
			middleNameEnabled: isChecked,
		});
	}
	
	
	autoFill = () => {
		this.setState({
			first: "Jaakko",
			middle: "Samuli",
			last: "Hakulinen",
		});
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App">
				<Paper style={{width: 600, textAlign: 'left',}}>
					<div>First name: <TextField id={"first"} value={this.state.first} onChange={(e, v) => {this.updateName(0, v);}} /></div>
					<div>Middle name: <TextField disabled={!this.state.middleNameEnabled} id={"middle"} value={this.state.middle} onChange={(e, v) => {this.updateName(1, v);}} /></div>
					<div><Checkbox onCheck={this.adjustCheck} checked={this.state.middleNameEnabled} label="Middle name" /></div>
					<div>Last name: <TextField id={"last"} value={this.state.last} onChange={(e, v) => {this.updateName(2, v);}} /></div>
					<div><RaisedButton id={"autofill"} label="Autofill" onClick={() => {this.autoFill()}}/></div>
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
