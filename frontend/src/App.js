import { useRoutes } from 'react-router-dom';
import './App.css';
import ParticlesBg from 'particles-bg';
import routes from './routes/routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <div className='App'>
      {/* <ParticlesBg type="cobweb" bg={true} /> */}
      {/* <h1>MERN JWT Auth Demo</h1> */}
      {routing}
    </div>
  );
}

export default App;
