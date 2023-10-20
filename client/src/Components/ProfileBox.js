import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/userSlice';
import { reset } from '../Redux/Slices/boardsSlice';

export default function ProfileBox() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const open = Boolean(anchorEl);
	const name = useSelector((state) => state.user.userInfo.name);
	const color = useSelector((state) => state.user.userInfo.color);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title='Logout'>
					<IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
						<Avatar sx={{ width: 32, height: 32, bgcolor: color, fontSize: '0.875rem', fontWeight: '800' }}>
							{name[0]}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				
			>
				<MenuItem
					onClick={() => {
						dispatch(reset);
						dispatch(logout());
					}}
				>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
