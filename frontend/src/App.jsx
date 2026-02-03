import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('/api/test')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="App">
      <h1>🛒 TG Store App</h1>
      <p>Бэкенд статус: {data ? data.status : 'Загрузка...'}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
