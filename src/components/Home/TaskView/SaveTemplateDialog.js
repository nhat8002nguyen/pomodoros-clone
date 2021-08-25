import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import { addTemplate } from '../../../redux/actions/templateActions';

export default function SaveTemplateDialog(props) {
	const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState("");

	const { userSignin } = useSelector(state => state.userSignin);

  const handleClickOpen = () => {
    setOpen(true);
		props.onDialogOpen();
  };

  const handleClose = () => {
		const username = userSignin?.username;
		if (username?.length > 0 && name.length > 0)
			dispatch(addTemplate(username, {
				name: name,
			}));		

    setOpen(false);
		props.onClose()
  };

	const handleCancel = () => props.onClose();

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
        <input className="save-template-input" type="text" placeholder="Name this template"
					value={name} onChange={(e) => setName(e.target.value)}></input>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
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
