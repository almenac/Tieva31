import React, { Component } from 'react';
import HexButton from './HexButton'
import './App.css';

/**
  * This application displays 12 HexButtons 
  * and reacts to clicks on them.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			message: null,
			clicks: 0,
		}
	}
	
	/**
	  * This method updates the app state when a button is clicked.
	  */
	updateMessage = (r, c) => {
		this.setState({
			message: "Latest click was on button " + c + " on row " + r + ".",
			clicks: this.state.clicks+1,
		});
	}
	
	render() {
		const size = 200; // Button size, can be modified, everything should scale.
		const hexOff = 0.866; // sin(60 deg) used in position calculations
		const buttonColor = ["#ffffff", "#cccccc", "#999999", "#666666"][this.state.clicks%4];
		// Build the buttons in a loop.
		let buttons = [];
		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 3; col++) {
				const r = row; // constant to bound the value used in updateMessage call
				const c = col; // constant to bound the value used in updateMessage call
				buttons.push(
					<div 
						key={"btn"+row+","+col} 
						style={{position: "absolute", left: col*size*2*hexOff+(row%2)*size*hexOff, top: row*size/2}}
					>
						<HexButton 
							width={size} 
							height={size} 
							label={"B"+row+col} 
							color={buttonColor} 
							onClick={() => {this.updateMessage(r, c)}}
						/>
					</div>);
			}
		}
		return (
			<div>
				<div style={{width: 3*size, height: 4*size}}>
					{buttons}
				</div>
				<div>
					{this.state.message}
				</div>
			</div>
		);
	}
}

export default App;