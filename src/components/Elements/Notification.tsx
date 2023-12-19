import useNotificationStore from "@/stores/useNotificationStore";
import Button from "./Button";

const Notification = () => {
  const { notification, dismissNotification } = useNotificationStore();

  return (
    <>
      {notification && (
        <div
          aria-label="notification"
          className={`fixed  right-1/2 top-2 z-50 flex h-fit w-72 translate-x-1/2 items-center justify-between gap-2 border-2 border-black p-4 capitalize ${
            notification?.isError ? "bg-red-400" : "bg-green-400"
          }`}
        >
          <span className="flex-grow text-center">{notification?.message}</span>
          <Button
            onClick={dismissNotification}
            aria-label="dismiss notification"
          >
            x
          </Button>
        </div>
      )}
    </>
  );
};

export default Notification;
