import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';

const images = ['react1.png', 'react2.png', 'react3.png', 'react4.png', 'react5.png'];

class App extends Component {
	constructor() {
		super();
		this.state = {
			selected: 0,
		}
	}
	
	updateSelection = (newIndex) => {
		this.setState({
			selected: newIndex,
		});
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App">
				<Paper style={{width: 300, textAlign: 'center',}}>
					<div><img src={images[this.state.selected]} /></div>
					<div><Slider style={{width: 200}} defaultValue={1} step={1} min={1} max={5} onChange={(e, v) => {this.updateSelection(v-1);}}/></div>
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
