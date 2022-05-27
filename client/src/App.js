import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter} from 'react-router-dom'
import UserContext from './context';
import { routesHook } from './hooks';
import { useAuth } from './hooks'


function App() {
  
  const {user, login, logout} = useAuth()
  const isLogin = !!user
  const routes = routesHook(isLogin)


  return(
    <UserContext.Provider value={{user, isLogin, login, logout}}>
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        { routes }
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  )
}

export default App
