import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Tasks from './pages/TaskManager.jsx';
import Home from './pages/Home.jsx';

const App = () => {
  return (
    <Router>
      <div className='container appContainer'>
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/tasks' element={ <Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
