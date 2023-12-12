import { Router, Route, Link } from "preact-router";
import CreditCardGenerator from "./components/Generator";
import CreditCardVerification from "./components/Verifier";
import Header from "./components/Header";
import Readme from "./components/Readme";
import { generateUrlPath } from "./utils";

const App = () => {
  return (
    <div id="app">
      <Header />
      <Router>
        <Route path={generateUrlPath("/")} component={CreditCardGenerator} />
        <Route
          path={generateUrlPath("/verify")}
          component={CreditCardVerification}
        />
        <Route path={generateUrlPath("/readme")} component={Readme} />
      </Router>
    </div>
  );
};

export default App;
