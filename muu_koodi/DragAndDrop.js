import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

/**
  * This example provides minimal drag and drop
  * implementation using the default JavaScript 
  * support. React doesn't have any DnD support 
  * by itself.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			selected: "Drop here",
		}
	}
	
	/**
	  * This (with name onDragStart) and 
	  * attribute draggable are required
	  * for drag source.
	  */
	dragStart = (e, v) => {
		// Setting the data and its MIME type
		e.dataTransfer.setData("text/plain", v);
		// Specifying the operation (cf. cursor shape)
		e.dataTransfer.dropEffect = "copy";
	}
	
	/**
	  * This takes care of the actual drop
	  * and must be set for drop target.
	  * 
	  */
	onDrop = (e) => {
		// Prevent the default drag and drop processing
		e.preventDefault();
		// get the data
		var data = e.dataTransfer.getData("text");
		// use the data 
		this.setState({
			selected: data,
		});
	}
	
	/**
	  * This should also be specified for drop target.
	  */
	onDragOver = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App" style={{width: 300}}>
				<Paper 
					onDrop={this.onDrop}
					onDragOver={this.onDragOver}
					style={{width: 300, height: 300, textAlign: 'center', fontSize: '48pt'}}
				>
					{this.state.selected}
				</Paper>
				Drag any of these:
				<Paper 
					draggable={true} 
					onDragStart={(e) => {this.dragStart(e, "1");}} 
					style={{width: 100, height: 100, textAlign: 'center',}}
				>
					1
				</Paper>
				<Paper 
					draggable={true} 
					onDragStart={(e) => {this.dragStart(e, "2");}} 
					style={{width: 100, height: 100, textAlign: 'center',}}
				>
					2
				</Paper>
				<Paper 
					draggable={true} 
					onDragStart={(e) => {this.dragStart(e, "3");}} 
					style={{width: 100, height: 100, textAlign: 'center',}}
				>
					3
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
