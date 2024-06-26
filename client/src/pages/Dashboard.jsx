import AddClientModal from "../components/AddClientModal";
import Clients from "../components/Clients";
import { Header } from "../components/Header";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <AddClientModal />
      <Clients />
    </div>
  );
}
