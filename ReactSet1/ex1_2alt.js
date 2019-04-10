import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'


/**
  * This is a an alternative solution to Exercise 1.2. The difference to
  * the default solution is that it uses a loop to build the 8 checkboxes
  * in render() method.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			binary: "00000000",
			decimal: "0",
		}
	}
	
	adjustCheck = (box, isChecked) => {
		var newBinary = this.state.binary.substring(0, box) + (isChecked?"1":0) + this.state.binary.substring(box+1);
		this.setState({
			binary: newBinary,
		});
	}
	
	convert = () => {
		this.setState({
			decimal: "" + parseInt(this.state.binary, 2)
		})
	}
	
	render() {
		// Here we build the repeating part of the interface into a variable
		// beforehand. You can mix JSX into code freely.
		let boxes = [];
		for (let i = 0; i < 8; i++)
			boxes.push(<div><Checkbox onCheck={(e, c) => {this.adjustCheck(i, c)}} /></div>);
		
		return (
		<MuiThemeProvider>
			<div className="App">
				<Paper style={{width: 600, textAlign: 'center',}}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						{boxes}
					</div>
					
					<div><TextField id={"binary"} disabled={true} value={this.state.binary} /></div>
					<div><RaisedButton label={"Convert"} onClick={() => {this.convert()}} /></div>
					<div><TextField id={"binary"} disabled={true} value={this.state.decimal} /></div>
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
