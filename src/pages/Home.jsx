import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import qs from "qs";
import {useNavigate} from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const {searchValue} = React.useContext(SearchContext);
  const {items, status} = useSelector((state) => state.pizza);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId !== 0 ? "&category=" + categoryId : "";
    const search = searchValue ? "&Search=" + searchValue : "";

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      search,
      currentPage
    }))
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
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error'
          ?
          <div className="content__error-info">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению не удалось получить питсы. Попробуйте повторить попытку позже.
            </p>
          </div>
          :
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzas}
          </div>
      }
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  )
}

export default Home;
