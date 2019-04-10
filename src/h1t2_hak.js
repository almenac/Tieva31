import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'

/**
  * This is a rather straightforward solution to Exercise 1.2. It utilizes
  * index parameter in binary value update to avoid having multiple, almost
  * identical method implementations.
  */ 
class App extends Component {
	constructor() {
		super();
		this.state = {
			binary: "00000000",
			decimal: "0",
		}
	}
	
	adjustCheck = (box, isChecked) => {
		var newBinary = this.state.binary.substring(0, box) + (isChecked?"1":0) + this.state.binary.substring(box+1);
		this.setState({
			binary: newBinary,
		});
	}
	
	convert = () => {
		this.setState({
			decimal: "" + parseInt(this.state.binary, 2)
		})
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App">
				<Paper style={{width: 600, textAlign: 'center',}}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(0, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(1, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(2, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(3, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(4, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(5, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(6, c)}} />
						</div><div>
						<Checkbox onCheck={(e, c) => {this.adjustCheck(7, c)}} />
						</div>
					</div>
					
					<div><TextField id={"binary"} disabled={true} value={this.state.binary} /></div>
					<div><RaisedButton label={"Convert"} onClick={() => {this.convert()}} /></div>
					<div><TextField id={"binary"} disabled={true} value={this.state.decimal} /></div>
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
