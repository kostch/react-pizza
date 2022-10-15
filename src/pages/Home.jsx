import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const fetchPizzas = () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId !== 0 ? "&category=" + categoryId : "";
    const search = searchValue ? "&Search=" + searchValue : "";

    setIsLoading(true);
    axios.get(
      `https://62a4b5af47e6e400639730b6.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      })
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // Если был первый рендер, то проверяем URL-параметр и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  )
}

export default Home;
