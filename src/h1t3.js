import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class App extends Component {
    constructor() {
        super();
        this.state = {
            buttons: 0,
            mouseX: 0,
            mouseY: 0,
            wheelEvent: 0,
        }
    }

    regClick = (event) => {
        this.setState({
            buttons: event.button,
        });
    }

    regCoord = (event) => {        
        this.setState({
            mouseX: event.clientX,
            mouseY: event.clientY,
        });
    }

    regWheel = (event) => {
        this.setState({
            wheelEvent: event.deltaY,
        });
    }
    
    render() {                
        const button = this.state.buttons;
        const mouseX = this.state.mouseX;
        const mouseY = this.state.mouseY;
        const wheel = this.state.wheelEvent;
        return (
            <div className="App" onMouseDown={this.regClick} onMouseMove={this.regCoord} onWheel={this.regWheel}>
                <MuiThemeProvider>
                    <Paper style={{width: 600, textAlign: 'left'}}>
                        <div style={{textAlign: 'center'}}>
                            <strong>Exercise 1.3</strong>
                        </div>
                        <br></br>                        
                        <div>
                            Mouse button pressed: 
                            <TextField id="buttonText" value={button} />
                        </div>
                        <div style={{ display: 'inline-flex'}}>
                            Mouse at: 
                            <TextField id="mouseX" value={mouseX} />
                            <TextField id="mouseY" value={mouseY} />
                        </div>                                               
                        <div>
                            Wheel event:
                            <TextField id="wheel" value={wheel} />
                        </div>                                               
                    </Paper>            
                </MuiThemeProvider>        
            </div>
        );
    }
}

export default App;
