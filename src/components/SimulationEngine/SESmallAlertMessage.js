import React from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {   
                borderRadius: '16px !important',
            },
            
          },
        }
       }
    });

const SESmallAlertMessage = (props) => {
    const { type, content } = props;
    const outerTheme = useTheme();
 
    return (
            <Stack sx={{ width: '65.2%', borderRadius: '16px' }} spacing={2}> 
                <ThemeProvider theme={customTheme(outerTheme)}>  
                    <Alert severity={type}>{content}</Alert> 
                </ThemeProvider>
            </Stack>
    );
}

export default SESmallAlertMessage;
