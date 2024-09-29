import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Sidebar />

      <div className="main">
        <Header />

        {router}
      </div>
    </>
  );
}

export default App;
