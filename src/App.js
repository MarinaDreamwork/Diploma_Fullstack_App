import Header from "./components/Header/header";
import InputSearch from "./components/inputSearch";
import Footer from "./components/Footer/footer";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Card from "./components/pages/card";
import { BookProvider } from "./hooks/useBooks";
import Login from "./components/pages/login";

const App = () => {

   return (
    <div className='container-wrapper'>   
      <BookProvider> 
        <Header />
        <InputSearch />
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/login' component={Login} />
          <Route path='/:cardId' component={Card} />
        </Switch>
        <Footer />
      </BookProvider>
    </div>
   )
}

export default App;