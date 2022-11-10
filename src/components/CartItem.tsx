import React from "react";
import {useDispatch} from "react-redux";
import {addItem, minusItem, removeItem} from "../redux/slices/cart/slice";

type CartItemPropsType = {
  id: string,
  title: string,
  type: string,
  size: number,
  price: number,
  count: number,
  imageUrl: string
}

const CartItem: React.FC<CartItemPropsType> = ({id, title, type, size, price, count, imageUrl}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const onClickPlus = () => {
    dispatch(addItem({id, type, size} as CartItemPropsType));
  }
  const onClickMinus = () => {
    count === 1 ? dispatch(removeItem({id, type, size} as CartItemPropsType)) : dispatch(minusItem({
      id,
      type,
      size
    } as CartItemPropsType));
  }
  const onClickRemove = () => {
    dispatch(removeItem({id, type, size} as CartItemPropsType))
  }
  const onClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.target as Element;
    if (element.className.includes("clear-cart")) {
      onClickRemove();
    }
    if (element.className.includes("pop-up_wrapper") || element.className.includes("close-modal")) {
      setOpenModal(false);
    }
  }

  return (
    <>
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
        </div>
        <div className="cart__item-info">
          <h3>{title}</h3>
          <p>{type}, {size} см.</p>
        </div>
        <div className="cart__item-count">
          <button disabled={count === 1} onClick={onClickMinus}
                  className="button button--outline button--circle cart__item-count-minus">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"/>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"/>
            </svg>
          </button>
          <b>{count}</b>
          <button onClick={onClickPlus} className="button button--outline button--circle cart__item-count-plus">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"/>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"/>
            </svg>
          </button>
        </div>
        <div className="cart__item-price">
          <b>{price * count} ₽</b>
        </div>
        <div className="cart__item-remove">
          <div onClick={() => setOpenModal(true)} className="button button--outline button--circle">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                fill="#EB5A1E"/>
              <path
                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                fill="#EB5A1E"/>
            </svg>
          </div>
        </div>
      </div>
      {
        openModal && (
          <div onClick={(event) => onClickModal(event)} className="pop-up_wrapper">
            <div className="pop-up">
              <p className="pop-up_title">
                Вы действительно хотите удалить эту пиццу?
              </p>
              <div className="pop-up_buttons">
                <button className="button close-modal">Нет</button>
                <button className="button button-back clear-cart">Да</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default CartItem;
