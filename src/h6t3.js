/**
 * Incomplete answer. I didn't know how to calculate
 * magic square or change values inside the array that's
 * in the state.
 */

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';

class App extends Component {    
    constructor() {
        super();
        this.state = {
            nums: [
                [1, 2, 3],
                [4, 5, 6],                
                [7, 8, 9]
            ],
            magicNumber: false,
            message: ""            
        }
    }

    checkForMagic = () => {
        this.setState({
            message: "Unknown"
        })
    }

    updateValue = (event, value) => {
        this.setState({
            
        })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Exercise 6.3"                    
                    >                    
                    </AppBar>
                    <div>
                        <h1>Glorious Magic Square</h1>
                    </div>
                    <div>
                        <Table
                            style={{width: 300}}
                            fixedHeader={false}
                            fixedFooter={false}
                            selectable={false}
                            multiSelectable={false}
                        >                            
                            <TableBody
                                displayRowCheckbox={false}                                
                            >
                            {this.state.nums.map( (row, rowIndex) => (
                                <TableRow
                                    selectable={false}                                    
                                >
                                    {row.map((number, columnIndex) => (
                                        <TableRowColumn>
                                            <TextField 
                                                value={number}
                                                onChange={(e,v) => {this.updateValue(e,v)}}                                                
                                            />
                                        </TableRowColumn>
                                    ))}                                
                                </TableRow>
                            ))}    
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <RaisedButton label="Check" onClick={this.checkForMagic} />
                    </div>
                    <div>
                        <TextField value={this.state.message}/>
                    </div>
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
