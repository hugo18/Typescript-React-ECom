import Sidebar  from './components/Sidebar'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <div className='flex h-screen'>
          <Sidebar/>
        </div>
      </Router>
     
    </>
  )
}

export default App
