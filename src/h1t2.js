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
            chars: ["0","0","0","0","0","0","0","0"],            
            boxString: "",
            hexInt: 0,            
        }
    }

    hexToInt = () => {
        let argString = this.state.boxString;
        let newInt = parseInt(argString,2);        
        this.setState({
            hexInt: newInt,
        });
    }

    compileString = () => {
        let newString = "";
        let arr = this.state.chars;
        
        for(var i = 0; i < arr.length; i++){
            newString += arr[i];
        }
        
        this.setState({
            boxString: newString,
        })
    }
    
    changeChar1 = () => {        
        let newChars = this.state.chars;         
        if (newChars[0] === "0"){
            newChars[0] = "1";
        }
        else{
            newChars[0] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar2 = () => {        
        let newChars = this.state.chars;         
        if (newChars[1] === "0"){
            newChars[1] = "1";
        }
        else{
            newChars[1] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar3 = () => {        
        let newChars = this.state.chars;         
        if (newChars[2] === "0"){
            newChars[2] = "1";
        }
        else{
            newChars[2] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar4 = () => {        
        let newChars = this.state.chars;         
        if (newChars[3] === "0"){
            newChars[3] = "1";
        }
        else{
            newChars[3] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar5 = () => {        
        let newChars = this.state.chars;         
        if (newChars[4] === "0"){
            newChars[4] = "1";
        }
        else{
            newChars[4] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar6 = () => {        
        let newChars = this.state.chars;         
        if (newChars[5] === "0"){
            newChars[5] = "1";
        }
        else{
            newChars[5] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar7 = () => {        
        let newChars = this.state.chars;         
        if (newChars[6] === "0"){
            newChars[6] = "1";
        }
        else{
            newChars[6] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }

    changeChar8 = () => {        
        let newChars = this.state.chars;         
        if (newChars[7] === "0"){
            newChars[7] = "1";
        }
        else{
            newChars[7] = "0"
        }
        this.setState({
            chars: newChars,
        })
        
        this.compileString()
    }
    
    render() {                
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Paper style={{width: 600, textAlign: 'left'}}>
                        <div style={{textAlign: 'center'}}>
                            <strong>Exercise 1.2</strong>
                        </div>
                        <br></br>
                        <div style={{ display: 'inline-flex'}}>
                            <Checkbox onCheck={this.changeChar1} id="box1"/>
                            <Checkbox onCheck={this.changeChar2} id="box2"/>
                            <Checkbox onCheck={this.changeChar3} id="box3"/>
                            <Checkbox onCheck={this.changeChar4} id="box4"/>
                            <Checkbox onCheck={this.changeChar5} id="box5"/>
                            <Checkbox onCheck={this.changeChar6} id="box6"/>
                            <Checkbox onCheck={this.changeChar7} id="box7"/>
                            <Checkbox onCheck={this.changeChar8} id="box8"/>
                        </div>
                        <div><TextField id="text1" value={this.state.boxString} /></div>                                               
                        <div><RaisedButton onClick={this.hexToInt} id="convert" label="Convert" /></div>
                        <div><TextField id="text2" value={this.state.hexInt} /></div>                                               
                    </Paper>            
                </MuiThemeProvider>        
            </div>
        );
    }
}

export default App;
