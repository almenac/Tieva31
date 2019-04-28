import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

var images = [
	{name: 'react1.png', size: 2524},
	{name: 'react2.png', size: 2467}, 
	{name: 'react3.png', size: 2343}, 
	{name: 'react4.png', size: 2554}, 
	{name: 'react5.png', size: 896}
];

class App extends Component {
	constructor() {
		super();
		this.state = {
			sortByName: true,
			sortAscending: true,
		}
	}
	
	updateSort = (byName, ascending) => {
		this.setState({
			sortByName: byName,
			sortAscending: ascending,
		});
	}
	
	render() {
		const dir = this.state.sortAscending?1:-1;
		const key = this.state.sortByName?"name":"size";
		const comparator = function(a, b) {
			return (a[key] > b[key])?dir:-dir;
		}
		images.sort(comparator);
		let pictures = [];
		for (var i = 0; i < images.length; i++)
			pictures.push(<img key={images[i].name} alt={images[i].name} src={images[i].name}></img>);
		
		return (
			<MuiThemeProvider>
				<div className="App">
					<Paper style={{width: 300, textAlign: 'center',}}>
						<RadioButtonGroup name="sorting" defaultSelected={3} onChange={(event, value) => {this.updateSort((value&2)>0, (value&1)>0);}}>
							<RadioButton
								value={3}
								label="By name (Asc)"
							/>
							<RadioButton
								value={2}
								label="By name (Desc)"
							/>
							<RadioButton
								value={1}
								label="By size (Asc)"
							/>
							<RadioButton
								value={0}
								label="By size (Desc)"
							/>
						</RadioButtonGroup>						
						{pictures}
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
