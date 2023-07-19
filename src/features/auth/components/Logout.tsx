import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";
import { useLogout } from "../api/logout";
import Header from "@/components/Elements/Header";

const Logout = () => {
  const logout = useLogout();

  return (
    <Modal isLoading={logout.isLoading} modal="logout">
      <Header>Confirm Logout</Header>
      <p>Please confirm that you would like to logout</p>
      <Button
        onClick={() => logout.mutateAsync()}
        className="w-full border-2 border-black bg-red-400"
      >
        Logout
      </Button>
    </Modal>
  );
};

export default Logout;
