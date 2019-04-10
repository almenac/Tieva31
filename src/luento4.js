import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import rod from './rod.jpg';
import settings from './settings.json';
import LABELS from './labels';
import {rotateTransform, filterStyle} from './styleTools';
import {isColorString} from './colorTools';
import Slider from 'material-ui/Slider';
import './Resources.css'

class App extends Component {
    constructor() {
        super();
            
        this.state = {
            color: settings.color,
            rot: settings.rot,
            rotCommitted: settings.rot,
            picture: rod,
            history: [],
            future: [],
        }
    }

    storeForUndo = () => {
        const newEntry = {
            rot: this.state.rotCommitted,
            col: this.state.color,
            pic: this.state.picture
        }
        this.setState({
            history: this.state.history.concat([newEntry]),
            future: []
        });
    }

    updateColor = (e,v) => {
        if (isColorString(v)) {
            this.storeForUndo();
            this.setState({
                color: v
            });
        }
    }

    updateRotate = (i,v) => {
        let newRot = this.state.rot.slice(0, i).concat([v].concat(this.state.rot.slice(i+1)));
        this.setState({
            rot: newRot
        });
    }

    commitRotate = () => {
        this.storeForUndo();
        this.setState({
            rotCommitted: this.state.rot
        });
    }

    swapImage = (v) => {
        this.storeForUndo();
        this.setState({
            picture: v
        });
    }

    storeForUndo = () => {
        const newEntry = {
            rot: this.state.rotCommitted,
            col: this.state.color,
            pic: this.state.picture
        }
        this.setState({
            history: this.state.history.concat([newEntry]),
            future: []
        });
    }

    undo = () => {
        if (this.state.history.length > 0) {
            const newEntry = {
                rot: this.state.rotCommitted,
                col: this.state.color,
                pic: this.state.picture
            }
            const c = this.state.history.pop();
            const h = this.state.history;
            const f = this.state.future.concat([newEntry]);
            this.setState({
                rotCommitted: c.rot,
                rot: c.rot,
                color: c.col,
                picture: c.pic,
                history: h,
                future: f
            });
        }
    }

    redo = () => {
        if (this.state.future.length > 0) {
            const newEntry = {
                rot: this.state.rotCommitted,
                col: this.state.color,
                pic: this.state.picture
            }
            const h = this.state.history.concat([newEntry]);
            const c = this.state.future.pop();
            const f = this.state.future;
            this.setState({
                rotCommitted: c.rot,
                rot: c.rot,
                color: c.col,
                picture: c.pic,
                history: h,
                future: f
            });
        }
    }
    

    render() {
        let style = {transform: rotateTransform(this.state.rot), filter: filterStyle(this.state.color)};
        return(
            <MuiThemeProvider>
                <Paper style={{width: 300, textAlign: 'center'}}>
                    <div style={{height: 200}}>
                        <img src={this.state.picture} style={style} />
                    </div>
                    <div>{LABELS.rotate}</div>
                    <div className="Slider-group">
                        <Slider 
                            axis="y" 
                            style={{height: 100}}
                            step={1}
                            min={0}
                            max={180}
                            value={this.state.rot[0]}
                            onChange={(e,v) => {this.updateRotate(0,v);}}
                            onDragStop={(e) => {this.commitRotate();}}
                        />
                        <Slider 
                            axis="y" 
                            style={{height: 100}}
                            step={1}
                            min={0}
                            max={180}
                            value={this.state.rot[1]}
                            onChange={(e,v) => {this.updateRotate(1,v);}}
                            onDragStop={(e) => {this.commitRotate();}}
                        />
                        <Slider 
                            axis="y" 
                            style={{height: 100}}
                            step={1}
                            min={0}
                            max={180}
                            value={this.state.rot[2]}
                            onChange={(e,v) => {this.updateRotate(2,v);}}
                            onDragStop={(e) => {this.commitRotate();}}
                        />
                    </div>
                    <div>{LABELS.shadowColor}</div>
                    <TextField
                        name="color"
                        value={this.state.color}
                        onChange={this.updateColor}
                    />
                    <RadioButtonGroup
                        name="pictureSelection"
                        valueSelected={this.state.picture}
                        onChange={(e,v) => {this.swapImage(v);}}
                    >
                        <RadioButton value={rod} label="rod from src"/>
                        <RadioButton value="react1.png" label="logo from public"/>

                    </RadioButtonGroup>
                    <div>
                        <RaisedButton 
                        label="Undo"
                        onClick={this.undo}
                        disabled={this.state.history.length === 0}
                        />
                        <RaisedButton 
                        label="Redo"
                        onClick={this.redo}
                        disabled={this.state.future.length === 0}
                        />
                    </div>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
