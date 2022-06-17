import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({name: "популярности", sortProperty: "rating"});

  React.useEffect(() => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId !== 0 ? "category=" + categoryId : "";
    setIsLoading(true);
    fetch(`https://62a4b5af47e6e400639730b6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`).then(res => {
      return res.json();
    }).then(arr => {
      setItems(arr);
      setIsLoading(false);
    });
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
        <Sort sortType={sortType} onChangeSortType={(obj) => setSortType(obj)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
        }
      </div>
    </>
  )
}

export default Home;
