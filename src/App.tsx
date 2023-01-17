import "./App.css";
import { Home } from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store"
import { Navbar } from "./components/Navbar";
import PrimarySearchAppBar from "./components/Navbar/Navbar";

function App() {
  return (
    <Provider store={store}>
      <PrimarySearchAppBar />
      <Home />
    </Provider>
  )
}

export default App;
