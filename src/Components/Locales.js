import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { zhCN, enUS, frFR } from '../assets/MUI_locales';

export default function Locales() {
  const [locale, setLocale] = React.useState('zhCN');
  const locales = { zhCN, enUS, frFR };

  return (
    <ThemeProvider
      theme={(outerTheme) => createTheme(outerTheme, locales[locale])}
    >
      <Autocomplete
        options={Object.keys(locales)}
        getOptionLabel={(key) =>
          `${key.substring(0, 2)}-${key.substring(2, 4)}`
        }
        style={{ width: 300 }}
        value={locale}
        disableClearable
        onChange={(event, newValue) => {
          setLocale(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="自动完成"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <TablePagination
        nextIconButtonProps={{ style: {} }}
        count={2000}
        rowsPerPage={10}
        page={1}
        component="div"
        onPageChange={() => {}}
      />

      {/* <Pagination count={2000} color="primary" />
        <Rating defaultValue={4} name="locales" /> */}
    </ThemeProvider>
  );
}
