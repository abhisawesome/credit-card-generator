// App.js
import { h } from 'preact';
import { Router, Route, Link } from 'preact-router';
// import { FaGithub } from 'react-icons/fa'; // Import GitHub icon
import CreditCardForm from './components/Generator';
import CreditCardVerification from './components/Verifier';
import Header from './components/Header';

const App = () => {
  return (
    <div id="app">
      <Header />
      <Router>
        <Route path="/" component={CreditCardForm} />
        <Route path="/verify" component={CreditCardVerification} />
      </Router>
    </div>
  );
};

export default App;
