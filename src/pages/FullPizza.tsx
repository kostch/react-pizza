import React from "react";
import axios from "axios";
import {useParams, useNavigate, Link} from "react-router-dom";
import ContentLoader from "react-content-loader"
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItemById} from "../redux/slices/cart/slice";
import "../scss/components/_alert.scss";
import {CartItemType} from "../redux/slices/cart/types";

const typeNames = ['тонкое', 'традиционное'];

const FullPizza: React.FC = () => {
  const dispatch = useDispatch();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>();
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const [{title, price, imageUrl, sizes, types}, setParams] = React.useState<{
    title: string,
    price: number,
    imageUrl: string,
    sizes: Array<number>,
    types: Array<number>,
  }>({
    title: "",
    price: 0,
    imageUrl: "",
    sizes: [],
    types: [],
  });
  const cartItems = useSelector(selectCartItemById(id as string));
  const addedCount = cartItems.reduce((prev:number, current:any) => prev + current.count, 0);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://62a4b5af47e6e400639730b6.mockapi.io/items/${id}`);
        setPizza(data);
        setParams(data);
      } catch (error) {
        setRedirect(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }

    fetchPizza()
  }, []);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize]
    } as CartItemType;
    dispatch(addItem(item));
  }

  if (!pizza) {
    return (
      <>
        <div className="container container--flex">
          <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={580}
            viewBox="0 0 280 580"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <circle cx="134" cy="136" r="125"/>
            <rect x="0" y="279" rx="10" ry="10" width="280" height="23"/>
            <rect x="0" y="321" rx="10" ry="10" width="280" height="48"/>
            <rect x="0" y="381" rx="10" ry="10" width="280" height="88"/>
            <rect x="0" y="501" rx="10" ry="10" width="95" height="30"/>
            <rect x="125" y="492" rx="24" ry="24" width="152" height="45"/>
          </ContentLoader>
        </div>
        {redirect && (
          <div className="pop-up_wrapper">
            <div className="pop-up">
              <p className="pop-up_title">
                Произошла ошибка при загрузке информации о пицце :(
              </p>
              <div className="pop-up_text">
                Вы будете перенаправлены на главную страницу. Если этого не произошло автоматически
                <Link to="/" className="pop-up_link">нажмите здесь.</Link>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="container container--flex">
      <img className="pizza-block__image" src={pizza.imageUrl} alt=""/>
      <h2 className="pizza-block__title">{pizza.title}</h2>
      <p style={{margin: "0 0 20px"}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consequuntur ex, illo laborum nam officiis
        quibusdam. Amet cumque debitis fugiat incidunt laboriosam nisi, nulla porro provident rem tenetur unde
        voluptatem!
      </p>
      <div className="pizza-block__selector" style={{width: "280px"}}>
        <ul>
          {types.map(typeId => <li key={typeId} onClick={() => setActiveType(typeId)}
                                   className={activeType === typeId ? "active" : ""}>{typeNames[typeId]}</li>)}
        </ul>
        <ul>
          {sizes.map((size, i) => <li key={size} onClick={() => setActiveSize(i)}
                                      className={activeSize === i ? "active" : ""}>{size} см.</li>)}
        </ul>
      </div>
      <div className="pizza-block__bottom" style={{width: "280px"}}>
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{addedCount}</i>
        </button>
      </div>
      <Link to={"/"} className="button" style={{marginTop: "30px"}}>Назад</Link>
    </div>
  )
}

export default FullPizza;
