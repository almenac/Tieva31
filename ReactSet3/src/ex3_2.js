import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import DropDownMenu from 'material-ui/DropDownMenu';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton'
import TextGenerator from './TextGenerator.js'

class App extends Component {
	constructor() {
		super();
		this.state = {
			fontSize: 9,
			text: "",
		}
	}
	
	generate = () => {
		console.log(TextGenerator);
		this.setState({
			fontSize: this.state.fontSize,
			text: this.state.text + " " + TextGenerator.generate(this.state.text, 12),
		});
	}
	
	updateText = (event) => {
		this.setState({
			fontSize: this.state.fontSize,
			text: event.target.value,
		});
	}
	
	updateFontSize = (newSize) => {
		this.setState({
			fontSize: newSize,
			text: this.state.text,
		});
	}
	
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 3.2">
					</AppBar>
					
					<Paper style={{width: 600, textAlign: 'left',}}>
						<TextField 
							multiLine={true} 
							rowsMax={10} 
							rows={10} 
							id="editor" 
							value={this.state.text} 
							onChange={this.updateText} 
							style={{fontSize: this.state.fontSize}}
						/>
						<RadioButtonGroup name="fontSize" defaultSelected="9pt" onChange={(event, value) => {this.updateFontSize(value);}}>
							<RadioButton
								value="9pt"
								label="9 points"
							/>
							<RadioButton
								value="12pt"
								label="12 points"
							/>
							<RadioButton
								value="16pt"
								label="16 points"
							/>
						</RadioButtonGroup>
						<RaisedButton onTouchTap={this.generate} label="Generate" />
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
