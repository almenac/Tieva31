// This application doesn't calculate correctly,
// because I didn't know how to simultaneusly
// fire the calculateResult and value change
// functions.

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const styles = {
    customWidth: {
        width: 50,
    },
};

class App extends Component {    
    constructor() {
        super();
        this.state = {
            firstValue: "0",
            opsValue: "+",
            secondValue: "0",
            result: null
        }
    }

    calculateResult = (op, first, second) => {
        let result = 0;        
        if(op === "+"){
            result = first + second;
        }
        else if(op === "-"){
            result = first - second;
        }
        else if(op === "*"){
            result = first * second;
        }
        else {
            result = first / second;
        }
    }
    
    changeFirstValue = (value) => {
        this.setState({
            firstValue: value,
        });
    }
    
    changeOpsValue = (value) => {
        this.setState({
            opsValue: value,
        });
    }

    changeSecondValue = (value) => {
        this.setState({
            secondValue: value,
        });
    }

    render() {
        const nums = ["0", 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let numItems = [];
        const ops = ["+", "-", "*", "/"];
        let opsItems = [];

        for (let i = 0; i < nums.length; i++) {
            numItems.push(<MenuItem value={nums[i]} primaryText={nums[i]} />);
        }
        
        for (let i = 0; i < ops.length; i++) {
            opsItems.push(<MenuItem value={ops[i]} primaryText={ops[i]} />);
        }
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar 
                        title="Excercise 3.3" 
                    >                    
                    </AppBar>

                    <Paper style={{margin: 'auto'}}>
                        <div style={{display: 'inline-flex'}}>
                            <SelectField
                                styles={styles.customWidth}
                                value={this.state.firstValue}
                                onChange={(e,i,v) => this.changeFirstValue(v)}
                            >
                                {numItems}
                            </SelectField>                            
                            <SelectField
                                styles={styles.customWidth}
                                value={this.state.opsValue}
                                onChange={(e,i,v) => this.changeOpsValue(v)}
                            >
                                {opsItems}
                            </SelectField>
                            <SelectField
                                styles={styles.customWidth}
                                value={this.state.secondValue}
                                onChange={(e,i,v) => this.changeSecondValue(v)}
                            >
                                {numItems}
                            </SelectField>
                            <TextField
                                value={this.state.result} 
                            />                                                        
                        </div>                                                
                    </Paper>
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
