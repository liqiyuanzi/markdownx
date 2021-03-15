/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: docs/index.tsx
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 05/12/2020
 * Description:
 ******************************************************************/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Documentation from './Documentation';

ReactDOM.render( (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Documentation />
    </ThemeProvider>
), document.getElementById( 'root' ) );