import { useState, useEffect, useContext } from 'react'
import Content from './Content'
import { storeContext } from './store'

const gifts = [
  {
    id: 1,
    name: 'CPU',
  },
  {
    id: 2,
    name: 'Ram',
  },
  {
    id: 3,
    name: 'Keyb',
  }
]

function App() {
  const [show, setshow] = useState(false)



  function handleClick() {
    setshow(!show);
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <button onClick={handleClick}>Lấy</button>
      <h1>Hello</h1>
      {show && <Content />}
    </div>
  );
}

export default App;
