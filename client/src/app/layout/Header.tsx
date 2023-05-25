import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Fade, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useState } from "react";

const midLinks = [
    { title: 'products', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({handleThemeChange, darkMode}: Props) {
    const {basket} = useAppSelector(state => state.basket);
    const {user} = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <AppBar position='static'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box display='flex' alignItems='center'>
                    <Typography variant="h6" component={NavLink}
                        to='/'
                        sx={navStyles}
                    >
                        Web Shop
                    </Typography>
                    <LocalMallOutlinedIcon sx={{ml: 1}} />
                    {/*<Switch checked={darkMode} onChange={handleThemeChange} />*/}

                <List sx={{ display: 'flex', ml: 6}}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                     </List>
                    {user && user.roles?.includes('Admin') &&
                    
                    <Box display='flex' alignItems='center'>
                     <>
                    <Button
                            color='inherit'
                            onClick={handleClick}
                            sx={{ typography: 'h6' }}
                        >
                            Admin menu
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem component={Link} to='/inventory'>Inventory</MenuItem>
                            <MenuItem component={Link} to='/allOrders'>Orders</MenuItem>
                            <MenuItem component={Link} to='/brandInventory'>Brands</MenuItem>
                            <MenuItem component={Link} to='/productTypeInventory'>Product types</MenuItem>
                            <MenuItem component={Link} to='/sizeInventory'>Sizes</MenuItem>

                        </Menu>
                        </>
                        </Box>
                        }
                        
                        </Box>



                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>


            </Toolbar>
        </AppBar>
    )
}