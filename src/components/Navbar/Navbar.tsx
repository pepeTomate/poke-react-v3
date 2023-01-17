import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { SelectedPokemon } from '@/models/selectedPokemon';
import { useDispatch, useSelector } from 'react-redux';
import { Appstore } from '@/redux/store';
import { getPokemonData } from '@/axios/utils/getPokemonData';
import { changeSelectedPokemon } from '@/redux/states/selectedPokemon';
import { PokemonAPI } from '@/models/fetchPokemonAPI';
import CustomDialog, { dialogOpenSubject$ } from './CustomDialog/CustomDialog';
import { Favorite } from '@mui/icons-material';
import { FavoriteTable } from './FavoriteTable';

const { useState } = React;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  
  const selectedPokemonState: PokemonAPI = useSelector((store:Appstore)=> store.pokemon);
  const favoritesState:PokemonAPI[] = useSelector((store: Appstore) => store.favorites);
  const [state, setState] = useState<string>(selectedPokemonState.name);
  const dispatch = useDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    console.log(e.target.value);
  }

  const onSubmitHandler = () => {
    getPokemonData(state.toLowerCase())
    .then((res) => {
      dispatch(changeSelectedPokemon({
        name: res.name,
        id: res.id
      }))
      alert(`POKEMON: ${res.name} existe en la pokedex nacional`)
    })
    .catch((err) => {
      console.error(`CODIGO ROJO: ${err}`),
      alert(`El pokemon ${state} no existe en la pokedex!`)
    })
    console.log(`Estas buscando un ${state}, los venden en Revolico!`);
  }

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmitHandler();
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    dialogOpenSubject$.setSubject = true;
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Favorite />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Poke-React!
          </Typography>
          <Search>
              <IconButton sx={{paddingLeft: 2}} aria-label='search'onClick={onSubmitHandler}>
            <SearchIconWrapper> 
                  <SearchIcon />
            </SearchIconWrapper>
              </IconButton>  
            <StyledInputBase
              placeholder= {`${selectedPokemonState.name}`}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Favorite   />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}


        // <div>
        //   <ul>
        //     {favoritesState.map((p) => (
        //       <li key={p.id}>
        //         {`${p.name}`}
        //       </li>
        //     ))}
        //   </ul>
        // </div>