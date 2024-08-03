const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null;
  }

  const className = notificationType === 'error' ? 'error' : 'success';

  return <div className={className}>{message}</div>;
};

export default Notification;