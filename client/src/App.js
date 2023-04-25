import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './App.css'
import Home from './containers/Home'
import Login from './containers/Login';
import Profile from './containers/Profile';
import Product from './containers/Product';
import { Current } from './services/userActions';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import { ProductContext, UserContext } from './services/centralContext';
import Explore from './containers/Explore';
import Cart from './containers/Cart';
import Saved from './containers/Saved';
import History from './containers/History';
function App() {
  const [user, setUser] = useState("")
  const [product, setProduct] = useState("")
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [alert, setAlert] = useState(null)
  const [smallerMenu, setSmallerMenu] = useState(false)
  // If user has logged in, initiate setting local token variable and get his user by Current fetch
  useEffect(() => {
  if (token) {
      console.log(token)
      localStorage.setItem('access', token)
      Current(token, setUser)
      setAlert(true)
    }
  },[token])
  console.log(product)
  // If user is already logged in but user state not propigated, call Current fetch to propigate
    useEffect(()=> {
      if (localStorage.getItem('access')) {
        Current(localStorage.getItem('access'), setUser)
      }
  },[])

  return (
    <div className="">
      <SideNav/>
        <UserContext.Provider value={{user,setUser}}>
          <ProductContext.Provider value={{product,setProduct}}>
      <Routes>
          <Route path="/"  element={<Home  setAlert={setAlert} alert={alert} smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu} setLoading={setLoading}/>}/>
          <Route path="/login"  element={<Login token={token} setToken={setToken} setAlert={setAlert} smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>}/>
          <Route path="/profile" element={<Profile user={user} setUser={setUser} token={token} setToken={setToken} smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>}/>
          <Route path="/explore" element={<Explore smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>}/>
          <Route path="/cart" element={<Cart smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>}/>
          <Route path="/saved" element={<Saved smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu}/>}/>
          <Route path="/history" element={<History smallerMenu={smallerMenu} setSmallerMenu={setSmallerMenu} />}/>
          <Route path="/product/:category/:id" element={<Product loading={loading}/>}/>
      </Routes>
      </ProductContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
