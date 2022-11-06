import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ContentLoader from "react-content-loader"
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItemById} from "../redux/slices/cartSlice";

const typeNames = ['тонкое', 'традиционное'];

const FullPizza = () => {
  const dispatch = useDispatch();
  const [pizza, setPizza] = React.useState();
  const {id} = useParams();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [{title, price, imageUrl, sizes, types}, setParams] = React.useState(0);
  const cartItems = useSelector(selectCartItemById(id));
  const addedCount = cartItems.reduce((prev, current) => prev + current.count, 0);

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://62a4b5af47e6e400639730b6.mockapi.io/items/${id}`);
        setPizza(data);
        setParams(data)
      } catch (error) {
        console.log(error)
        alert("Ошибка при получении пиццы :(")
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
    };
    dispatch(addItem(item));
  }

  if (!pizza) {
    return (
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
    </div>
  )
}

export default FullPizza;
