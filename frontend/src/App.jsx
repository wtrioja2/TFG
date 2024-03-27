import React from 'react';
import Login from './components/Login'

function App() {

  const [user, setUser] = useState(null);

  return (

      <div>
        <Login setUser={setUser}/>
      </div>
  );
} 

export default App;

