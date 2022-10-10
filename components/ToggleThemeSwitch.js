import { Tooltip, FormControlLabel, Switch } from '@mui/material';
import { NightsStay, WbSunny } from '@mui/icons-material';

const ToggleThemeSwitch = ({theme, toggleTheme, darkTheme}) => {
  return (
    <Tooltip title="Toggle light/dark theme">
      <FormControlLabel
        sx={{ mt: 1 }}
        aria-label="toggle theme"
        id="toggle-theme"
        control={
          <Switch
            checked={theme === darkTheme}
            onChange={toggleTheme}
            name="toggleDarkMode"
            color="primary"
          />
        }
        label={theme === darkTheme ? <NightsStay /> : <WbSunny color="secondary" /> }
      />
    </Tooltip>
  );
};

export default ToggleThemeSwitch;
