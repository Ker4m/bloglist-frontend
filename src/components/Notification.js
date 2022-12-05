const Notification = ({ info }) => {
  if (!info) {
    return null;
  }

  const { type, message } = info;
  return <div className={type}>{message}</div>;
};

export default Notification;
