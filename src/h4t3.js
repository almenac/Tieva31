import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'material-ui';

class App extends Component {
    constructor() {
        super();
            
        this.state = {                        
            currentNum: 0,
            currentCommitted: 0,            
            storedNum: 0,
            history: [],
            future: []
        }
    }    

    storeForUndo = () => {
        const newEntry = {
            num: this.state.currentCommitted,
            store: this.state.storedNum,            
        }
        this.setState({
            history: this.state.history.concat([newEntry]),
            future: []
        });
    }

    undo = () => {
        if (this.state.history.length > 0) {
            const newEntry = {
                num: this.state.currentCommitted,
                store: this.state.storedNum,                
            }
            const c = this.state.history.pop();
            const h = this.state.history;
            const f = this.state.future.concat([newEntry]);
            this.setState({
                currentCommitted: c.num,
                currentNum: c.num,                
                history: h,
                future: f
            });
        }
    }
    
    redo = () => {
        if (this.state.future.length > 0) {
            const newEntry = {
                num: this.state.currentCommitted,
                store: this.state.storedNum,                
            }
            const h = this.state.history.concat([newEntry]);
            const c = this.state.future.pop();
            const f = this.state.future;
            this.setState({
                currentCommitted: c.num,
                currentNum: c.num,                
                history: h,
                future: f
            });
        }
    }
    
    changeNum = (v) => {        
        this.setState({
            currentNum: v
        });
    }

    commitNum = () => {
        this.storeForUndo();
        this.setState({
            currentCommitted: this.state.currentNum
        });
    }

    addToStore = () => {        
        this.storeForUndo();
        this.setState(prevState => {
            return {storedNum: prevState.storedNum + this.state.currentNum}
        });
    }
    


    render() {                
        return(
            <MuiThemeProvider>
                <AppBar 
                        title="Excercise 4.3" 
                    >                    
                    </AppBar>
                <Paper style={{width: 300, textAlign: 'center'}}>                    
                    <div>
                        <Slider        
                            step={1}
                            min={0}
                            max={255}
                            value={this.state.currentCommitted}
                            onChange={(e,v) => {this.changeNum(v);}}
                            onDragStop={(e) => {this.commitNum();}}
                        />                        
                    </div>
                    <div>
                        <TextField
                            value={this.state.currentNum}
                        />
                        <RaisedButton
                            label="Add"
                            onClick={this.addToStore}
                        />
                        <TextField                            
                            value={this.state.storedNum}
                        />
                    </div>
                    <div>
                        <RaisedButton
                            disabled={this.state.history.length === 0}
                            label="Undo"
                            onClick={this.undo}
                        />                        
                        <RaisedButton
                            disabled={this.state.future.length === 0}
                            label="Redo"
                            onClick={this.redo}
                        />                        
                    </div>                                                                                                                        
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
