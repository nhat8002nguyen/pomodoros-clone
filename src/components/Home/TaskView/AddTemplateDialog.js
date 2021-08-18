import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

const templates = [
	{id: 1, name: "template 1"},
	{id: 2, name: "template 2"},
	{id: 3, name: "template 3"},
]

export default function AddTemplateDialog(props) {
  const [open, setOpen] = React.useState(false);
	const [templateList, setTemplateList] = useState(templates);

  const handleClickOpen = () => {
    setOpen(true);
		props.onDialogOpen();
  };

  const handleClose = () => {
    setOpen(false);
		props.onClose()
  };

	const handleDeleteTemplate = (id) => {
		setTemplateList(templateList.filter(item => item.id !== id));
	}

  return (
    <div>
			<div onClick={handleClickOpen} className="task-header-option">
				<AddIcon />
				<p>Add from templates</p>
			</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Templates"}</DialogTitle>
        <DialogActions style={{display: "flex", flexDirection: "column"}}>
					{templateList.map(item => (
						<div className="add-template-item">
							<p>{item.name}</p>
							<DialogActions>
								<Delete onClick={() => handleDeleteTemplate(item.id)}/>
							</DialogActions>
						</div>
					))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
