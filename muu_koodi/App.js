import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'

/*
 * This simple currency converter example app was built
 * during the lecture (or initial version of it). It uses 
 * Material-UI components to create the App following regular 
 * React practises.
 *
 * The application also shows, how normal JavaScript/DOM 
 * events can be listened to in React application (mouse
 * movement adjusts background color).
 *
 */

const RATE = 1.21;

class App extends Component {
	constructor() {	
		// Remember to call super in constructor
		super();
		// The application state, all relevant information which needs to be remembered.
		this.state = {
			euros: 0,
			dollars: 0,
			doRound: false,
			bgColor: 0,
		}
	}

	// event handler implementations, a few slightly different ways shown 
	// in updateEuros and updateDollars for the same thing.
	// Remember to use the => notation to have "this" with correct value,
	// you'll get errors like "Cannot read property 'x' of undefined"
	// if you forget it.
	
	updateEuros = (newValue) => {
		// When testing the application, notice that only
		// when the edited text can be parsed as a float (i.e.,
		// the following line does not fail), the edits are 
		// accepted. This is of course unwanted, since entering
		// decimal numbers is not impossible (since 1. does not parse).
		const eurs = parseFloat(newValue);
		let dlrs = eurs*RATE;
		if (this.state.doRound)
			dlrs = Math.round(dlrs);
		this.setState({
			euros: eurs,
			dollars: dlrs,
		});
	}
	
	updateDollar = (event, newValue) => {
		const dlrs = parseFloat(newValue);
		const eurs = this.state.doRound?Math.round(dlrs/RATE):dlrs/RATE;
		this.setState({
			euros: eurs,
			dollars: dlrs,
		});
		
	}
	
	adjustRounding = (event, isChecked) => {
		this.setState({
			doRound: isChecked,
		});
	}
	
	clear = (event, isChecked) => {
		this.setState({
			euros: 0,
			dollars: 0,
		});
	}
	
	mouseMove = (event) => {
		// somewhat random way to come up with a number between 0..255 to be used for a color
		const nc = Math.min(255, (255 * event.clientY / event.clientX))&0xff;
		this.setState({
			bgColor: nc,
		});
	}
	
  render() {
	// building a css style color hex string, e.g., '#0000ff'
	const c = this.state.bgColor;
	const bgcol = "#"+(c*256*256+c*256+255).toString(16);
	
    return (
		<MuiThemeProvider>
			<Paper style={{width: 600, background: bgcol}} onMouseMove={this.mouseMove} >
				<div>
					Euros: <TextField value={this.state.euros} onChange={(e, v) => {this.updateEuros(v);}} id="euros" />
				</div><div>
					Dollars: <TextField value={this.state.dollars} onChange={this.updateDollar} id="dollars" />
				</div><div>
					<Checkbox label="Round" onCheck={this.adjustRounding} />
				</div><div>
					<RaisedButton label="Clear" onClick={this.clear} />
				</div>
			</Paper>
		</MuiThemeProvider>
    );
  }
}

export default App;
