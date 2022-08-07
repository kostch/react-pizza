import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

export const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector((state) => state.filter);
  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
   const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };

  React.useEffect(() => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId !== 0 ? "&category=" + categoryId : "";
    const search = searchValue ? "&Search=" + searchValue : "";

    setIsLoading(true);
    fetch(`https://62a4b5af47e6e400639730b6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`).then(res => {
      return res.json();
    }).then(arr => {
      setItems(arr);
      setIsLoading(false);
    });
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </>
  )
}

export default Home;
