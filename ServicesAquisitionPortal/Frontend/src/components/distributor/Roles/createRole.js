import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Link,withRouter } from 'react-router-dom';
import TransferList from './transferList'

const useStyles = makeStyles(theme => ({
	root: {
	//	padding: theme.spacing(7, 7,4,7),
		//marginTop: 60,
	},
	paperRoot: {
		marginTop:60,
		padding: theme.spacing(2,3,3,3),
		//marginTop: 60,
	},
	textField: {
marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	grid: {
		[theme.breakpoints.down('sm')]: {
			backgroundColor: theme.palette.secondary.main,
		},
	},
}));
const privilagesList=[
	{title:'Product',margin:0},{title:'Add Product',margin:20},{title:'Product Discount',margin:20},
	{title:'Manage Distributor',margin:0},{title:'Add Distributor',margin:20},{title:'Product Discount',margin:20},

]
 function CreateRole(props) {
	const classes = useStyles();
	//const [item, selectItem] = useState('');
	return (
	
		
					<Paper className={classes.paperRoot}>
					
					 
				 <Grid container spacing={3} direction="column" justify="center">
					
					<Grid item >
						<TextField  label="Role (Required)" className={classes.textField} />
					</Grid>

					<Grid item >
					<Typography variant="h6">Choose Privileges</Typography>
					</Grid>
					
						<Grid item><TransferList /></Grid>
				
				</Grid> 
				<br /> 	<br />
					<Grid container spacing={2} justify="flex-start"
					>
					<Grid item>
				<Button alignItems="center" variant="contained" color="default"
				onClick={
					()=>{
					  props.showRole();props.history.push('/distributor/snd/roles/showRole')
					}
				  }>
					
					Cancel
				
				</Button></Grid>
				<Grid item>
				<Button alignItems="center" variant="contained" color="secondary"
				onClick={
					()=>{
					  props.showRole();props.history.push('/distributor/snd/roles/showRole')
					}
				  }>
					
						Save as New
					</Button>
					</Grid>
					<Grid item>
						<Button alignItems="center" variant="contained" color="primary"
						onClick={
							()=>{
							  props.showRole();props.history.push('/distributor/snd/roles/showRole')
							}
						  }>
					
						Save
					</Button>
					</Grid>
					</Grid>
				
			</Paper>
			
	
	);
}

export default withRouter(CreateRole)