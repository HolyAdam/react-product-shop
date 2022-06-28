import { useState, useEffect } from 'react';
import axios from 'axios'
import { Routes, Route, Link } from 'react-router-dom'


import Header from './Header';
import Drawer from './Drawer';

import { Context } from './Context';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';

function App() {

  const [cards, setCards] = useState([])
  const [cart, setCart] = useState([])

  const [favorites, setFavorites] = useState([])

  const [loading, setLoading] = useState(true)

  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  // useReducer write! (later)




  const addFavorite = async (obj) => {

    try {

      const currFavorite = favorites.find(favorite => favorite.productId === obj.productId)

      if (currFavorite) {
        setFavorites(prevState => prevState.filter(fav => fav.productId !== obj.productId))
        
        axios.delete(`https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/favorites/${currFavorite.id}.json`)

        return
      }

      const { data } = await axios.post('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/favorites.json', 
      obj)

      setFavorites(prevState => [...prevState, {
        ...obj,
        id: data.name
      }])

    } catch(e) {
      alert('Не удалось добавить в избранное')
    }


  }



  const onOverlayClick = (e, necessaryClass) => {
    if (e.target.classList.contains(necessaryClass)) {
      setIsDrawerVisible(false)
    }
  }

  const addToCard = async (obj) => {
    
    const currItem = cart.find(item => item.productId === obj.productId)

    if (currItem) {
      setCart(prevCart => prevCart.filter(item => item.productId !== currItem.productId))
      await axios.delete(`https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/cart/${currItem.id}.json`)

      return
    }

    const resp = await axios.post('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      ...obj
    })

    setCart(prevCart => [...prevCart, {
      ...obj,
      id: resp.data.name
    }])
  }

  
  const isItemAdded = (id) => {
    return Boolean(cart.find(item => item.productId === id))
  }

  const isFavoriteAdded = (id) => {
    return Boolean(favorites.find(item => item.productId === id))
  }

  const totalPrice = cart.reduce((initSum, nextEl) => {
    return initSum + nextEl.price
  }, 0)


  const removeProductInCart = (product) => {
    setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    axios.delete(`https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/cart/${product.id}.json`)
  }


  useEffect(() => {
    (async () => {
      setLoading(true)

      const products = await axios.get('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/products.json')
      const respCart = await axios.get('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
      const respOfFavorites = await axios.get('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/favorites.json')
      

      const data = respCart.data || []
      const myCart = Object.keys(data).map(key => {
        return {
          ...data[key],
          id: key
        }
      })



      const dataOfFav = respOfFavorites.data || []
      const myFavorites = Object.keys(dataOfFav).map(key => {
        return {
          ...dataOfFav[key],
          id: key
        }
      })

      
      setCards(products.data)
      setCart(myCart)
      setFavorites(myFavorites)

      setLoading(false)

      
      

    })()

  }, [])

  return (
    <Context.Provider value={{
      isItemAdded,
      totalPrice,
      setCart,
      loading,
      cards,
      addToCard,
      favorites,
      addFavorite,
      isFavoriteAdded
    }}>
      <div className="content">

        { 
          <Drawer 
            opened={isDrawerVisible} 
            onOverlayClick={onOverlayClick} 
            cart={cart} 
            onClose={() => setIsDrawerVisible(false)}
            onRemoveProduct={removeProductInCart} 
          /> 
          }

        <div className="container">

          <Header onCartClick={() => setIsDrawerVisible(true)} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<h1 style={{color: '#dd0909'}}>Страница не найдена</h1>} />
            
          </Routes>

        </div>

        <footer className="footer">
          <div className="container">
            <ul className="footer-list">
              <h5>
                Меню
              </h5>
              <li>
                <Link to="/profile">
                    История заказов
                </Link>
              </li>
              <li>
                <Link to="/">
                    Главная
                </Link>
              </li>
              <li>
                <Link to="/favorites">
                  Избранное
                </Link>
              </li>
            </ul>
            <ul className="footer-list">
              <h5>
                Социальные сети 
              </h5>
              <li>
                <a href="https://t.me/xzc223" target="_blank">
                  Телеграм
                </a>
              </li>
              <li>
                <a href="https://vk.com/saddesu98" target="_blank">
                  Вконтакте
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <p>
                saynshop. © 2022
              </p>
            </div>
          </div>
        </footer>
        </div>

    </Context.Provider>
  );
}

export default App;
