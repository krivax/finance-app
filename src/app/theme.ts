import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

const theme = createTheme({
    palette: {
        primary: {
            main: '#003399',
        },
        secondary: {
            main: '#cecece',
        },
        mode: 'light',
    },
}, ptBR);

export default theme;