import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';

export default function SaveTemplateDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
		props.onDialogOpen();
  };

  const handleClose = () => {
    setOpen(false);
		props.onClose()
  };

  return (
    <div>
			<div onClick={handleClickOpen} className="task-header-option">
				<SaveIcon />
				<p>Save as template</p>
			</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{fontWeight: "bold"}} id="alert-dialog-title">{"SAVE TEMPLATE"}</DialogTitle>
        <input className="save-template-input" type="text" placeholder="Name this template"></input>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
						Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
						Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
