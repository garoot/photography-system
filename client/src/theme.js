import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: purple[500],
      // main: '#3B8BEB',
      // main: '#116466',
      // main: '#bd4341',
      // main: '#52aeca',
      main: 'rgba(60, 60, 61, 0.233)',
    },
    secondary: {
      main: '#52aeca',
      // main: '#bd4341',
      contrastText: '#e5e2e2'
    },
  },
});

export default theme