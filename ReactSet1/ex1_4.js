import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

/**
  * This method gets an element from the web page DOM outside 
  * of the React controlled content. If the required element is
  * not found, this method creates it.
  */
function getOutputElement() {
	var r = document.getElementById("eventOutput");
	if (r == null) {
		var elemDiv = document.createElement('div');
		elemDiv.setAttribute("id", "eventOutput");
		var reactDiv = document.getElementById('root');
		reactDiv.parentElement.appendChild(elemDiv);
		r = document.getElementById("eventOutput");
	}
	return r;
}


function downUpdate(event) {
	getOutputElement().innerHTML = "Mouse down: " + event.buttons;
}

function moveUpdate(event) {
	getOutputElement().innerHTML = "Move event: " + event.clientX + ", " + event.clientY;
}

function wheelUpdate(event) {
	getOutputElement().innerHTML = "Wheel event: " + event.deltaY;
}

class App extends Component {
	constructor() {
		super();
		// The state contains variables for
		// the listeners. render() places these
		// listener into UI. This shows that the
		// state can contain functions as well as 
		// values and that JSX code can set listeners
		// via state.
		this.state = {
			mouseDown: null,
			mouseMove: null,
			mouseWheel: null,
		}
	}
	
	adjustCheck = (index, checked) => {
		let mouseDown = this.state.mouseDown;
		let mouseMove = this.state.mouseMove;
		let mouseWheel = this.state.mouseWheel;
		if (index === 0)
			mouseDown = checked?(event) => {downUpdate(event);}:null;
		if (index === 1)
			mouseMove = checked?(event) => {moveUpdate(event);}:null;
		if (index === 2) 
			mouseWheel = checked?(event) => {wheelUpdate(event);}:null;
		
		this.setState({
			mouseDown: mouseDown,
			mouseMove: mouseMove,
			mouseWheel: mouseWheel,
		})
	}

	render() {
		return (
		<MuiThemeProvider>
			<div className="App" onMouseDown={this.state.mouseDown} onMouseMove={this.state.mouseMove} onWheel={this.state.mouseWheel}>
				<Paper style={{width: 400, textAlign: 'center',}}>
					<Checkbox onCheck={(e, c) => {this.adjustCheck(0, c)}} label="Mouse Down" />
					<Checkbox onCheck={(e, c) => {this.adjustCheck(1, c)}} label="Mouse Move" />
					<Checkbox onCheck={(e, c) => {this.adjustCheck(2, c)}} label="Mouse Wheel" />
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
