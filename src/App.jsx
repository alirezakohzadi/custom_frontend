import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import Layout from './componts/Layout/Layout'
import LikeArticle from './componts/LikeArticle/LikeArticle'
import NotFound from './componts/404/NotFound'
import Article from './componts/Article/Article'
import ContactUs from './pages/ContactUs/ContactUs'
import ArticleAll from './pages/ArticleAll/ArticleAll'
import { LoginOrIsLoginPro } from './context/LoginOrIsLogin'
import PrivetRoute from './componts/privetRoute/privetRoute'
import Track from './pages/Track/Track'
import Signup from './componts/Signup/Signup'
import Login from './pages/login/Login'
function App() {


  return (
    <LoginOrIsLoginPro>
      <Layout>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/track' element={<Track />} />
          <Route element={<PrivetRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/articles' element={<ArticleAll />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/articlelike/:id' element={<LikeArticle />} />
        </Routes>
      </Layout>
    </LoginOrIsLoginPro>
  )
}

export default App
