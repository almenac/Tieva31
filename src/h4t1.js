import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';

const pics = ["react1.png", "penguin.png", "rod.jpg"];

class App extends Component {
    constructor() {
        super();
            
        this.state = {                        
            picture: pics[0]
        }
    }    

    swapImage = (v) => {
        this.setState({
            picture: pics[v]
        });
    }
    

    render() {                
        return(
            <MuiThemeProvider>
                <AppBar 
                        title="Excercise 4.1" 
                    >                    
                    </AppBar>
                <Paper style={{width: 300, margin: 'auto', textAlign: 'center'}}>
                    <div style={{height: 200}}>
                        <img src={this.state.picture} />
                    </div>                    
                    <div>
                        <Slider        
                            step={1}
                            min={0}
                            max={2}                            
                            onChange={(e,v) => {this.swapImage(v);}}
                        />                        
                    </div>                                                            
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
