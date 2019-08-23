import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import CustomizedMenus from '../../superAdmin/dashboard/Menus'
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChartContainer from '../../superAdmin/dashboard/chartContainer'
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import NestedList from './DropDownMenu'
import withWidth from '@material-ui/core/withWidth';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
//import CreatePackage from '../packages/createPackage.js';
//import ShowPackage from '../packages/showPackage.js';
//import EnhancedTableHead from './showUsers.js';
import { Users_Action, Users_Status } from '../../../constants/usersActions'
const mapStateToProps = state => ({
	users_Status: state.users_Reducer.users_status
})
const mapDipatchToProps = dispatch => ({
	LoadNewUser: () => { dispatch({ type: Users_Action.LOADNEW }) },
	LoadShowUser: () => { dispatch({ type: Users_Action.LOADSHOW }) },
	LoadNewRole: () => { dispatch({ type: Users_Action.LOADNEWRole }) },
	LoadShowRole: () => { dispatch({ type: Users_Action.LOADSHOWROLE }) }
})
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},

	///drawer classes
	drawerRoot: {
		paddingTop: 60,
		width: '100%',
		maxWidth: 240,
		height:'100%',
		overflowY: 'hidden',
		//paddingBottom: '170%',
		backgroundColor: 'red'//theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function DashboardDis(props) {
	const { container, getScreen } = props;
	const [open, setOpen] = React.useState(false);
	const [headerMargin, setMargin] = useState(80)
	function handleClick() {
		setOpen(!open);
	}

	
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}





	const header = (
		<AppBar position="static">
			<Toolbar variant="dense">
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit">
					Photos
          </Typography>
			</Toolbar>
		</AppBar>
	);


	const drawer = (
		// <div>
		// 	<div className={classes.toolbar} />
		// 	<Divider />
		// 	<List>
		// 		{['Dashboard', 'CreateUser', 'ViewUser', 'AgentManagement'].map((text, index) => (
		// 			<ListItem
		// 				onClick={() => {
		// 					showMe(text);

		// 				}}
		// 				button
		// 				key={text}
		// 			>
		// 				<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
		// 				<ListItemText primary={text} />
		// 			</ListItem>
		// 		))}
		// 	</List>
		// 	<Divider />
		// 	<List>
		// 		{['Profile', 'Change Password', 'Sign Out'].map((text, index) => (
		// 			<ListItem button key={text}>
		// 				<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
		// 				<ListItemText primary={text} />
		// 			</ListItem>
		// 		))}
		// 	</List>
		// </div>
		<List style={{ backgroundColor: '#212121', color: 'white' }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			// subheader={
			//   <ListSubheader component="div" id="nested-list-subheader">
			// 	Nested List Items
			//   </ListSubheader>
			// }
			className={classes.drawerRoot}
		>
			<ListItem button onClick={() => props.history.push('/distributor/snd/dashboard/'+props.match.params.userId)}>
				<ListItemIcon>
					<DashboardIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>

			<ListItem button onClick={handleClick}
			>
				<ListItemIcon>
					<PeopleIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Manage Roles" />
				{open ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => { window.location.pathname==='/distributor/snd/roles/'+props.match.params.userId?
						props.LoadNewRole():props.LoadNewRole(); props.history.push('/distributor/snd/roles/'+props.match.params.userId) }}>
						<ListItemIcon>
							<GroupAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Create Roles" />
					</ListItem>
					<ListItem button className={classes.nested}
						onClick={() => { 
					window.location.pathname==='/distributor/snd/roles/'+props.match.params.userId?props.LoadShowRole(): props.LoadShowRole();props.history.push('/distributor/snd/roles/'+props.match.params.userId) }}>
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Show Roles" />
					</ListItem>
				</List>
			</Collapse>

			<ListItem button onClick={handleClick}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Manage Users" />
				{open ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => { props.LoadNewUser(); props.history.push('/distributor/snd/users/User/'+props.match.params.userId) }}>
						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Create User" />
					</ListItem>
					<ListItem button className={classes.nested}
						onClick={() => { props.LoadShowUser(); props.history.push('/distributor/snd/users/User/'+props.match.params.userId) }}>
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Show User" />
					</ListItem>
				</List>
			</Collapse>
			{/* <ListItem button>
				<ListItemIcon>
					<DraftsIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Agent Management" />
			</ListItem> */}

		</List>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: 'white', color: 'grey' }}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
						Sales & distribution
						{/* width is {props.width} */}
					</Typography>
					<CustomizedMenus />
				</Toolbar>
			</AppBar>

			<AppBar style={{
				marginTop: props.width === 'xs' ? headerMargin - 10 : headerMargin,
				paddingTop: 3, paddingBottom: 3, backgroundColor: '#f5f5f5', color: '#2e7d32'
			}} className={classes.appBar}
				elevation={1}>
				<Toolbar variant="dense">
					<div>

						{(() => {
							if (window.location.pathname === '/distributor/snd/dashboard/'+props.match.params.userId) {
								return <Typography variant="h6">Dashboard</Typography>
							}
							else if (window.location.pathname === '/distributor/snd/roles/'+props.match.params.userId) {
								return <Typography variant="h6">Create Role</Typography>
							}
							else if (window.location.pathname === '/distributor/snd/roles/'+props.match.params.userId) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Role</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											props.LoadNewRole(); props.history.push('/distributor/snd/roles/createRole/'+props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}
							else if (props.users_Status === Users_Status.NEW) {

								return <Typography variant="h6">New User</Typography>
							}
							else if (props.users_Status === Users_Status.SHOW) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show User</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											props.LoadNewUser(); props.history.push('/distributor/snd/users/User/'+props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}

						})()}


					</div>


				</Toolbar>
			</AppBar>

			{/* <AppBar position="fixed" className={classes.appBar}
			color="default" style={{marginTop:70}}
			elevation={1}>
				<Toolbar>
					
					<Typography variant="h6" Wrap>
						S&D
					</Typography>
				</Toolbar>
			</AppBar> */}
			<nav className={classes.drawer}

				aria-label="Mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{/* <NestedList /> */}
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer classes={{ paper: classes.drawerPaper, }}
						variant="permanent"
						open  >
						{/* <NestedList /> */}
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
		</Typography>  */}
		
				{window.location.pathname === '/distributor/snd/dashboard/'+props.match.params.userId ? <ChartContainer /> : getScreen}
				{/* {showMe()} */}
			</main>
		</div>
	);
}

DashboardDis.propTypes = {
	// Injected by the documentation to work in an iframe.
	// You won't need it on your project.
	container: PropTypes.object,
};

export default connect(mapStateToProps, mapDipatchToProps)(withRouter(withWidth()(DashboardDis)))