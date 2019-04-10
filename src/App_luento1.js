import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

const RATE = 1.21;

class App extends Component {
    constructor() {
        super();
        this.state = {
            euros: 0,
            dollars: 0,
            doRound: false,
            bgColor: 255,
        }
    }

    updateEuros = (newValue) => {
        const euros = parseFloat(newValue);
        const dlrs = this.state.doRound?Math.round(euros*RATE):euros*RATE;
        console.log(euros, dlrs);
        this.setState({
            euros: "" + euros,
            dollars: "" + dlrs,  
        });
    }

    adjustRounding = (event, isChecked) => {
        this.setState({
            doRound: isChecked, 
        });
    }

    clear = (event) => {
        this.setState({
            euros: 0,
            dollars: 0,
        });
    }

    mouseMove = (event) => {
        let nc = Math.min(255, (255 * event.clientY / event.clientX))&0xff;        
        this.setState({
            bgColor: nc,
        });
    }

    render() {
        const c = this.state.bgColor;        
        const bgcol = "#"+(c*256*256+c*256+c).toString(16);
        
        return (
            <div className="App" onMouseMove={this.mouseMove}>
                <MuiThemeProvider>
                    <Paper style={{width: 600, textAlign: 'left', background: bgcol}}>
                        <div>Euros: <TextField id="euros" onChange={(e,v) => {this.updateEuros(v);}} value={this.state.euros} /></div>
                        <div>Dollars: <TextField id="dollars" value={this.state.dollars} /></div>
                        <div><Checkbox onCheck={this.adjustRounding} label="Round" /></div>
                        <div><RaisedButton onClick={this.clear} id="clear" label="Clear" /></div>
                    </Paper>            
                </MuiThemeProvider>        
            </div>
        );
    }
}

export default App;
