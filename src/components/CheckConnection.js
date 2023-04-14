import { useEffect } from "react";
import { toast } from "react-toastify";

function CheckConnection() {
  const checkOnlineStatus = async () => {
    try {
      const online = await fetch("/1pixel.png");
      return online.status >= 200 && online.status < 300;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    let connectionToastId = null;

    const checkConnection = async () => {
      const result = await checkOnlineStatus();
      if (result === false && connectionToastId === null ) {
        connectionToastId = toast.loading("Please restore internet connection!")
      } else if (result === true) {
        toast.update(connectionToastId, { render: "All is good", type: "success", isLoading: false });
      }
    };

    const interval = setInterval(checkConnection, 3000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default CheckConnection;
