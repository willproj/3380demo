import './App.css';
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { DataGrid } from '@mui/x-data-grid';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const columns = [
  { field: 'Spell Name', headerName: 'Spell Name', width: 130 },
  { field: 'Level', headerName: 'Level', width: 130 },
  { field: 'Ritual', headerName: 'Ritual', width: 130 },
  { field: 'Casting Time', headerName: 'Casting Time', width: 130 },
  { field: 'Range', headerName: 'Range', width: 130 },
  { field: 'Target/Area', headerName: 'Target/Area', width: 130 },
  { field: 'V', headerName: 'V', width: 130 },
  { field: 'S', headerName: 'S', width: 130 },
  { field: 'M', headerName: 'M', width: 130 },
  { field: 'Component(s)', headerName: 'Component(s)', width: 130 },
  { field: 'Cost', headerName: 'Cost', width: 130 },
  { field: 'Concentration', headerName: 'Concentration', width: 130 },
  { field: 'Duration', headerName: 'Duration', width: 130 },
  { field: 'Attack/Saving Throw(Effect)', headerName: 'Attack/Saving Throw(Effect)', width: 130 },
  { field: 'Damage Type', headerName: 'Damage Type', width: 130 },
  { field: 'Sourcebook', headerName: 'Sourcebook', width: 130 },
  { field: 'Page#', headerName: 'Page#', width: 130 },
  { field: 'Additioinal Detail', headerName: 'Additioinal Detail', width: 130 },
  { field: 'Per Higher Spell Level', headerName: 'Per Higher Spell Level', width: 130 },
  { field: 'Bard', headerName: 'Bard', width: 130 },
  { field: 'Cleric', headerName: 'Cleric', width: 130 },
  { field: 'Druid', headerName: 'Druid', width: 130 },
  { field: 'Paladin', headerName: 'Paladin', width: 130 },
  { field: 'Ranger', headerName: 'Ranger', width: 130 },
  { field: 'Sorceror', headerName: 'Sorceror', width: 130 },
  { field: 'Warlock', headerName: 'Warlock', width: 130 },
  { field: 'Wizard', headerName: 'Wizard', width: 130 }
];



function App() {

  //get list of table from server
  const [list, setlist] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3010/getall").then((res) => {
      setlist(res.data);
    })
  },[]);

  const rows = list;
  //material ui
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openTable, setOpenTable] = React.useState(true);
  const handleClick = () => {
    setOpenTable(!openTable);
  };


  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              3380 demo
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Spell Table" />
              {openTable ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTable} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {rows.map((cell) => {
                  return (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={cell["Spell Name"]} />
                    </ListItemButton>
                  )
                })}

              </List>
            </Collapse>
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph>

            <div style={{ height: 700, width: '100%' }}>
              <DataGrid getRowId={row => row["Spell Name"]}
                rows={rows}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default App;
