import * as React from 'react';
import { useRouter } from 'next/router';
import { Grid, AppBar, Toolbar, IconButton } from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';

import ToggleThemeSwitch from '../components/ToggleThemeSwitch';

export default function TopRibbon({theme, toggleTheme, darkTheme}) {
  const router = useRouter();
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{py: 1, px: 0, my: 1}}
    >
      <Toolbar variant="string" disableGutters>
        <Grid container>
          <Grid item xs={10}>
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

          <Grid item xs={2} textAlign="right">
            <ToggleThemeSwitch
              theme={theme}
              toggleTheme={toggleTheme}
              darkTheme={darkTheme}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  );
}
