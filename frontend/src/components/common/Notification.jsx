import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../features/ui/uiSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const uiState = useSelector(state => state.ui);
//   console.log('UI State:', uiState);

  const { notification } = uiState;

  const handleClose = () => {
    dispatch(clearNotification());
  };

  if (!notification) return null;

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={notification.type}
        variant="filled"
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
