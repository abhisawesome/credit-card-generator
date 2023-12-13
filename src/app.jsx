import { Router, Route,  } from "preact-router";
import CreditCardGenerator from "./components/Generator";
import CreditCardVerification from "./components/Verifier";
import Header from "./components/Header";
import Readme from "./components/Readme";
import { generateUrlPath } from "./utils";
import { createHashHistory } from 'history';






const App = () => {
  const history = createHashHistory();
  return (
    <div id="app">
      <Header />
      <Router history={history}>
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
