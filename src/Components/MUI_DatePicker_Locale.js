import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/zh-cn';

const DatePickerComponent = ({ date, setDate }) => {
  console.log('date is ', date);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2EC4B6',
      },
      secondary: {
        main: '#2EC4B6',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale={'zh-cn'}
      >
        <DatePicker
          required
          format="L"
          clearable
          okLabel="Ok"
          clearLabel="Clear"
          cancelLabel="Cancle"
          value={date}
          variant="dialog"
          maxDateMessage=""
          mask="__/__/____"
          placeholder="dd/MM/yyyy"
          onChange={(dateChanged) => setDate(dateChanged)}
          views={['year', 'month', 'date']}
          InputProps={{ disableUnderline: true }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default DatePickerComponent;
