import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

class App extends Component {
	constructor() {
		super();
		this.state = {
			clickMessage: "",
			moveMessage: "",
			wheelMEssage: "",
		}
	}
	
	clickUpdate = (event) => {
		this.setState({
			clickMessage: "Mouse was clicked: button " + event.buttons,
		})
	}
	
	moveUpdate = (event) => {
		this.setState({
			moveMessage: "Mouse moved to " + event.clientX + ", " + event.clientY,
		})
	}
	
	wheelUpdate = (event) => {
		this.setState({
			wheelMessage: "Wheel moved " + event.deltaY,
		})
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App" onMouseDown ={(event) => {this.clickUpdate(event);}} onMouseMove = {(event) => {this.moveUpdate(event);}} onWheel = {(event) => {this.wheelUpdate(event);}}>
				<Paper style={{width: 600, textAlign: 'center',}}>
					<div><TextField id={"clickMessage"} disabled={true} value={this.state.clickMessage} /></div>
					<div><TextField id={"moveMessage"} disabled={true} value={this.state.moveMessage} /></div>
					<div><TextField id={"wheelMessage"} disabled={true} value={this.state.wheelMessage} /></div>
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
