/**
 * The conversion doesn't work (produces NaN), but
 * internationalization does.
 */

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


const RATE = 1.3065;

class App extends Component {    
    constructor(props) {
        super(props);        
        this.state = {            
            originAmount: 0,
            targetAmount: 0,
            language: "en-US"
        }
    }

    setLanguage = (e, value) => {
        this.setState({
            language: value,
        });
    }

    convert = (event, newValue) => {
        if (this.state.language === "en-US") {
            const dollars = parseFloat(newValue);
		    const pounds = dollars / RATE;
            
            this.setState ({
                originAmount: dollars,
                targetAmount: pounds,
		    });		
        }
        else if (this.state.language === "en-GB") {
            const pounds = parseFloat(newValue);
		    const dollars = pounds * RATE;
            
            this.setState ({
                originAmount: pounds,
                targetAmount: dollars,
		    });		
        }        
    }
    
    updateDollar = (event, newValue) => {
		const dlrs = parseFloat(newValue);
		const eurs = this.state.doRound?Math.round(dlrs/RATE):dlrs/RATE;
		this.setState({
			euros: eurs,
			dollars: dlrs,
		});
		
	}

    render() {
        let date = new Date();        
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Exercise 7.2">                    
                    </AppBar>                    

                    <Paper style={{width: 600, margin: 'auto'}}>                        
                        <div>
                            Exchange rate at {new Intl.DateTimeFormat(this.state.language).format(date)} is {RATE} dollars for a pound
                        </div>
                        <div>                            
                            {this.state.language === "en-US"?"$":"£"}
                            <TextField
                                id="origin"
                                value={this.state.originAmount}
                                onChange={(e, v) => {this.convert(v);}}                                
                            />                            
                            {this.state.language === "en-US"?"£":"$"}
                            <TextField
                                id="target"
                                value={this.state.targetAmount}
                            />                            
                        </div>
                        
                        <div>
                            <RadioButtonGroup name="setLang" onChange={this.setLanguage}>
                                <RadioButton value='en-GB' label='£ to $'/>
                                <RadioButton value='en-US' label='$ to £'/>
                            </RadioButtonGroup>
                        </div>
                    </Paper>                    
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
