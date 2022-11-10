import {Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import FullPizza from "./pages/FullPizza";
import React, {Suspense} from "react";
const Cart = React.lazy(() => import("./pages/Cart"));

function App() {
  return (
    <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Suspense fallback={<Loading/>}><Cart/></Suspense>}/>
              <Route path="/pizza/:id" element={<FullPizza/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
