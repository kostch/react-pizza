import React from "react";
import {useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filter/slice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizza/slice";
import {SearchPizzaParamsType} from "../redux/slices/pizza/types";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/pizzaBlock/Skeleton";
import PizzaBlock from "../components/pizzaBlock";
import Pagination from "../components/Pagination";
import qs from "qs";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../redux/store";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef<boolean>(false);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzaData);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
      currentPage: String(currentPage),
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
      const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParamsType;
      const sort = list.find(obj => obj.sortProperty === params.sortBy);
      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        sort: sort || list[0],
      }));
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
        <Sort sort={sort} />
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
