import MainContent from './components/MainContent'
import Sidebar  from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <div className='flex h-screen'>
          <Sidebar/>
        <div className='rounded w-full flex justify-between felx-wrap'>
          <Routes>
            <Route path="/" element={<MainContent/>}/>
          </Routes>
        </div>
        </div>
      </Router>
     
    </>
  )
}

export default App
