import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import { appendTemplate, deleteTemplate, listTemplate } from '../../../redux/actions/templateActions';

// const templates = [
// 	{id: 1, name: "template 1"},
// 	{id: 2, name: "template 2"},
// 	{id: 3, name: "template 3"},
// ]

export default function AddTemplateDialog(props) {
  const [open, setOpen] = React.useState(false);
	const [templateList, setTemplateList] = useState([]);
	const dispatch = useDispatch();

	const { userSignin } = useSelector(state => state.userSignin);
	const { templates } = useSelector(state => state.templateListState);

	useEffect(() => {
		let mounted = true;
		const username = userSignin?.username;
		if (mounted && username?.length > 0)
			dispatch(listTemplate({username}));

		return () => mounted = false;
	}, [open]);

	useEffect(() => {
		let mounted = true;
		if (templates?.length > 0 && mounted) {
			setTemplateList(templates.map(item => {
				const url = item._links?.self.href
				const id = parseInt(url.substring(url.lastIndexOf("/")+1));
				return {...item, id}
			}));
		}
		return () => mounted = false;
	}, [templates, open]);

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
		clientDeleteTemplate(id);
	}

	const clientDeleteTemplate = (id) => {
		dispatch(deleteTemplate(id));
	}

	const handleAppendTemplate = (id) => {
		dispatch(appendTemplate(id));
		props.onForceUpdate();
		setOpen(false);
		props.onClose();
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
						<div key={item.id} className="add-template-item" >
							<p onClick={() => handleAppendTemplate(item.id)}>{item.name}</p>
							<DialogActions>
								<Delete style={{cursor: "pointer"}} onClick={() => handleDeleteTemplate(item.id)}/>
							</DialogActions>
						</div>
					))}
        </DialogActions>
      </Dialog>
    </div>
  );
}
