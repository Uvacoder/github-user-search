import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ResultsPage } from './pages/ResultsPage/ResultsPage';
import { InputPage } from './pages/InputPage/InputPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:username">
          <ResultsPage />
        </Route>
        <Route path="/">
          <InputPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
