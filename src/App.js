import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import app from "./firebase.init";
import Forms from "./components/Forms/Forms";
const auth = getAuth(app);
function App() {
  return (
    <div className="App">
      <Forms></Forms>
    </div>
  );
}

export default App;
