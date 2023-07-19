import useNotificationStore from "../../stores/useNotificationStore";

const Notification = () => {
  const notification = useNotificationStore((state) => state.notification);
  const dismissNotification = useNotificationStore(
    (state) => state.dismissNotification
  );

  return (
    <>
      {notification && (
        <div
          className={`max-w-1/2 fixed right-1/2 top-2 z-50 flex h-fit w-fit translate-x-1/2 items-center justify-center gap-2 border-2 border-black p-4 capitalize ${
            notification?.isError ? "bg-red-400" : "bg-green-400"
          }`}
        >
          <span>{notification?.message}</span>
          <button onClick={dismissNotification}>x</button>
        </div>
      )}
    </>
  );
};

export default Notification;
