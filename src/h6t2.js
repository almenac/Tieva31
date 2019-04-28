import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

let people = [
    {
        firstName: "Matti",
        lastName: "Möttönen",
        birthTown: "Toijala"
    },
    {
        firstName: "Tuija",
        lastName: "Tavallinen",
        birthTown: "Helsinki"
    },
    {
        firstName: "John",
        lastName: "Doe",
        birthTown: "Houston"
    },
    {
        firstName: "Molly",
        lastName: "Molls",
        birthTown: "Chicago"
    },
]

class App extends Component {    
    constructor() {
        super();
        this.state = {
            currentPerson: 0,            
            maxPeople: people.length,                
        }
    }

    render() {
        let ind = this.state.currentPerson;
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Exercise 6.2"                    
                    >                    
                    </AppBar>                    

                    <div>
                        <Table
                            fixedHeader={false}
                            fixedFooter={false}
                            selectable={false}
                            multiSelectable={false}
                        >
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn
                                        tooltip="First Name"
                                    >
                                    First Name            
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="Last Name"
                                    >
                                    Last Name            
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        tooltip="Birth Town"
                                    >
                                    Birth Town
                                    </TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={true}
                                showRowHover={true}
                                stripedRows={true}
                            >
                            {people.map( (row, index) => (
                                <TableRow
                                    key={index}
                                    hoverable={true}
                                    style={{background: "lightyellow"}}
                                >
                                <TableRowColumn>
                                    {row.firstName}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {row.lastName}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {row.birthTown}
                                </TableRowColumn>
                                </TableRow>
                            ))}    
                            </TableBody>

                        </Table>
                    </div>
                    
                        
                    
                    
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
