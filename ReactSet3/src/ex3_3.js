import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const NUMBER1 = 0;
const OPERATOR = 1;
const NUMBER2 = 2;

class App extends Component {
	constructor() {
		super();
		this.state = {
			number1: 0,
			number2: 0,
			operator: "+",
			result: 0,
		}
	}
	
	updateValue = (n, v) => {
		// The first parameter specifies which item to update.
		const n1 = n===NUMBER1?v:this.state.number1;
		const op = n===OPERATOR?v:this.state.operator;
		const n2 = n===NUMBER2?v:this.state.number2;
		const res = eval(n1+op+n2);
		this.setState({
			number1: n1,
			number2: n2,
			operator: op,
			result: res,
		});
	}
	
	render() {
		const numbers = [];
		for (var i = 0; i < 10; i++) {
			numbers.push(<MenuItem value={i} key={"nr"+i} primaryText={""+i} />);
		}
		
		return (
		<MuiThemeProvider>
			<div className="App">
				<AppBar title="Exercise 3.3">
				</AppBar>
				<Paper style={{width: 300, textAlign: 'left',}}>
					<SelectField value={this.state.number1} onChange={(event, index, value) => {this.updateValue(NUMBER1, value)}} autoWidth={true} >
						{numbers}
					</SelectField>
					<SelectField value={this.state.operator} onChange={(e, i, v) => {this.updateValue(OPERATOR, v)}}  autoWidth={true} >
						<MenuItem value="+" primaryText="+" />
						<MenuItem value="-" primaryText="-" />
						<MenuItem value="*" primaryText="*" />
						<MenuItem value="/" primaryText="/" />
					</SelectField>
					<SelectField value={this.state.number2} onChange={(e, i, v) => {this.updateValue(NUMBER2, v)}}  autoWidth={true} >
						{numbers}
					</SelectField>
					<div>{this.state.result}</div>
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
