import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton'

class App extends Component {
	constructor() {
		super();
		this.state = {
			value: 0,
			history: [],
			current: " ",
			future: [],
		}
	}
	
	undo = () => {
		if (this.state.history.length > 0) {
			let rv = this.state.current.split(" ");
			rv = parseInt(rv[rv.length-1]);
			const h = this.state.history.slice(0, this.state.history.length-1);
			const c = this.state.history.pop();
			const f = this.state.future.concat([this.state.current]);
			this.setState({
				value: rv,
				history: h,
				current: c,
				future: f,
			});
		}
	}
	
	redo = () => {
		if (this.state.future.length > 0) {
			let rv = this.state.value;
			if (this.state.future.length > 1) {
				rv = this.state.future[this.state.future.length-2].split(" ");
				rv = parseInt(rv[rv.length-1]);
			}
			const h = this.state.history.concat([this.state.current]);
			const c = this.state.future.pop();
			const f = this.state.future.slice(this.state.future.lenght-1);
			this.setState({
				value: rv,
				history: h,
				current: c,
				future: f,
			});
		}
	}
	
	add = () => {
		this.setState({
			history: this.state.history.concat([this.state.current]),
			current: this.state.current + " " + this.state.value,
			future: []
		});
	}
	
	updateValue = (v) => {
		this.setState({
			value: v,
		});
	}
	
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Paper style={{width: 300, textAlign: 'center',}}>
						<div>
							<RaisedButton disabled={this.state.history.length === 0} label="Undo" onTouchTap={this.undo} />
							<RaisedButton disabled={this.state.future.length === 0}label="Redo" onTouchTap={this.redo} />
						</div>
						<div>
							<Slider style={{width: 200}} value={this.state.value} step={1} min={0} max={255} onChange={(e, v) => {this.updateValue(v);}}/>
						</div>
						<div>
							{this.state.value}
						</div>
						<div>
							<RaisedButton label="->" onTouchTap={this.add} />
						</div>
						<div>
							{this.state.current}
						</div>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
