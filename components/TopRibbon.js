import * as React from 'react';
import { useRouter } from 'next/router';
import ToggleThemeSwitch from '../components/ToggleThemeSwitch';
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Grid, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RadarIcon from '@mui/icons-material/Radar';

export default function TopRibbon({theme, toggleTheme, darkTheme}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{py: 1, px: 0, my: 1}}
    >
      <Toolbar variant="string" disableGutters>
        <Grid container>
          <Grid item xs={8}>
            <IconButton
              color="secondary"
              size="large"
              aria-label="radar-icon"
              aria-haspopup="true"
              disableRipple
              onClick={() => router.push('/')}
              sx={{ ml: 0, p: 0, pt: 1, fontWeight: 900}}
            >
              <RadarIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: '1em',
                  mr: 1,
                  animation: 'spin 2s linear infinite',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(0deg)'
                    },
                    '100%': {
                      transform: 'rotate(360deg)'
                    }
                  }
                }}
              />
              NHL Radar
            </IconButton>
          </Grid>

          <Grid item xs={3} textAlign="center">
            <ToggleThemeSwitch
              theme={theme}
              toggleTheme={toggleTheme}
              darkTheme={darkTheme}
            />
          </Grid>

          <Grid item xs={1} textAlign="right">
            <Tooltip title="Settings">
              <IconButton
                color="secondary"
                size="large"
                aria-label="menu-cog"
                aria-controls="menu-cog"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{m: 0, p: 0}}
            >
              <MenuItem onClick={() => router.push('/')}>Menu Item 1</MenuItem>
              <MenuItem onClick={() => router.push('/')}>Menu Item 2</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  );
}
