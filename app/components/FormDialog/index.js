import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function FormDialog({open, handleClose, currentTransaction, onChange, handleSubmit}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{currentTransaction.name ? "EDIT" : "ADD"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
						value={currentTransaction.name}
						onChange={onChange}
            fullWidth
          />
					<TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"		
						value={currentTransaction.description}
						onChange={onChange}				
            fullWidth
          />
					<TextField
            autoFocus
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="number"
						value={currentTransaction.amount}		
						onChange={onChange}
            fullWidth
          />
					<InputLabel id="demo-simple-select-label">Type</InputLabel>	
					<Select
						label="Type"
						labelId="demo-simple-select-label"
						id="type"
						name="type"
						value={currentTransaction.type}
						onChange={onChange}
						>
						<MenuItem value={"credit"}>Credit</MenuItem>
						<MenuItem value={"debit"}>Debit</MenuItem>
					</Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
					{!currentTransaction.amount ? "ADD" : "UPDATE" }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
