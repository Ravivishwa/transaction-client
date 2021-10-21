import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function createData(id,name, description, amount, type) {
  return {id, name, description, amount, type };
}

export default function ListData({transactions, editTransaction, deleteTransaction}) {
  const classes = useStyles();

  let rows = transactions.map((t) => createData(t._id, t.name, t.description, t.amount, t.type))
  if(!rows.length){
    return(
      <Typography component="h1" variant="h5" align="center">
        No records found       
      </Typography>
    )
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell><EditIcon style={{cursor:'pointer'}} onClick={() => editTransaction(row.id)}/></TableCell>
              <TableCell><DeleteIcon style={{cursor:'pointer'}} onClick={() => deleteTransaction(row.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
