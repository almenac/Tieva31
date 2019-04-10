import TextGenerator from './TextGenerator.js'
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'

class App extends Component {    
    constructor() {
        super();
        this.state = {
            areaText: "Here is text",
            fontSize: 12,                    
        }
    }

    generate = (oldText) => {
        let genString = TextGenerator.generate(oldText, 24);
        let newString = this.state.areaText + genString;
        this.setState({
            areaText: newString,
        });       
    }

    changeFont = (newSize) => {
        this.setState({
            fontSize: newSize,
        });
    }

    render() {                
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar 
                        title="Excercise 3.2" 
                    >                    
                    </AppBar>

                    <Paper style={{width: 600, margin: 'auto'}}>                        
                        <TextField
                            variant="outlined"
                            id="textArea"
                            multiLine={true}
                            rowsMax={10}
                            rows={10}
                            value={this.state.areaText}
                            inputStyle={{fontSize: this.state.fontSize}}                                                     
                        />

                        <div>
                            <RadioButtonGroup 
                                name="fontSize" 
                                defaultSelected={12}
                                onChange={(e,v) => this.changeFont(v)}
                                >
                                <RadioButton 
                                    value={9}
                                    label="9 points"
                                />
                                <RadioButton 
                                    value={12}
                                    label="12 points"
                                />
                                <RadioButton 
                                    value={16}
                                    label="16 points"
                                />
                            </RadioButtonGroup>
                        </div>
                        
                            
                        
                        <RaisedButton 
                            id="generate"
                            label="Generate"
                            onClick={() => this.generate(this.state.areaText)}                            
                        />
                        
                    </Paper>
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
