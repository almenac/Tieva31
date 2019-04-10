import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
    constructor() {
        super();
        this.state = {
            binary: "00000000",            
            decimal: "0"        
        }
    }

    changeChar = (box, isChecked) => {
        let newBinary = this.state.binary.substring(0, box) + (isChecked?"1":0) + this.state.binary.substring(box+1);
        this.setState({
            binary: newBinary
        });
    }
    
    hexToInt = () => {
        this.setState({
            decimal: "" + parseInt(this.state.binary, 2)
        })
    }
    
    render() {                
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Paper style={{width: 600, textAlign: 'center'}}>
                        <div style={{textAlign: 'center'}}>
                            <strong>Exercise 1.2</strong>
                        </div>
                        <br></br>
                        <div style={{ display: 'inline-flex'}}>
                            <Checkbox onCheck={(e,c) => this.changeChar(0, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(1, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(2, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(3, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(4, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(5, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(6, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(7, c)}/>
                            <Checkbox onCheck={(e,c) => this.changeChar(8, c)}/>
                            
                        </div>
                        <div><TextField id="text1" value={this.state.binary} /></div>                                               
                        <div><RaisedButton onClick={this.hexToInt} id="convert" label="Convert" /></div>
                        <div><TextField id="text2" value={this.state.decimal} /></div>                                               
                    </Paper>            
                </MuiThemeProvider>        
            </div>
        );
    }
}

export default App;
