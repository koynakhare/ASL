import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alerts = () => {
  const [isOpen, setisOpen] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert?.success) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: 'ALERT_SUCCESS',
          payload: { boolean: false, message: '', error: false, warning: false }
        });
      }, 3000);
    }
  }, [alert?.success]);

  useEffect(() => {
    if (alert?.error) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: 'ALERT_SUCCESS',
          payload: { boolean: false, message: '', error: false, warning: false }
        });
      }, 3000);
    }
  }, [alert?.error]);

  useEffect(() => {
    if (alert?.warning) {
      setisOpen(true);
      window.setTimeout(() => {
        setisOpen(false);
        dispatch({
          type: 'ALERT_SUCCESS',
          payload: { boolean: false, message: '', error: false, warning: false }
        });
      }, 3000);
    }
  }, [alert?.warning]);

  if (alert?.message !== '') {
    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {(alert?.error || alert?.success || alert?.warning) && alert?.message ? (
          <Alert severity={alert?.success ? 'success' : alert?.warning ? 'warning' : 'error'} sx={{ width: '100%' }}>
            {typeof alert?.message === 'string' ? alert?.message : 'Something went wrong'}
          </Alert>
        ) : null}
      </Snackbar>
    );
  }

  return null;
};

export default Alerts;
