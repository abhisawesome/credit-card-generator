import { Router, Route, Link } from "preact-router";
import CreditCardGenerator from "./components/Generator";
import CreditCardVerification from "./components/Verifier";
import Header from "./components/Header";
import Readme from "./components/Readme";
const App = () => {
  return (
    <div id="app">
      <Header />
      <Router>
        <Route path="/" component={CreditCardGenerator} />
        <Route path="/verify" component={CreditCardVerification} />
        <Route path="/readme" component={Readme} />
      </Router>
    </div>
  );
};

export default App;
