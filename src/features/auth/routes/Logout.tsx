import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";
import Header from "@/components/Elements/Header";
import storage from "@/utils/storage";
import useAuthStore from "../stores/useAuthStore";
import useModalStore from "@/stores/useModalStore";
import { queryClient } from "@/lib/react-query";

const Logout = () => {
  const { setUser } = useAuthStore();
  const { toggleOpen } = useModalStore();

  const logout = () => {
    setUser(null);
    toggleOpen("logout");
    storage.clearToken();
    queryClient.clear();
  };

  return (
    <Modal modal="logout">
      <Header>Confirm Logout</Header>
      <p>Please confirm that you would like to logout</p>
      <Button
        onClick={logout}
        className="w-full border-2 border-black bg-red-400"
      >
        Confirm
      </Button>
    </Modal>
  );
};

export default Logout;
