import React from "react";
import {logDOM} from "@testing-library/react";

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((value, i) =>
            <li onClick={() => onClickCategory(i)} className={activeIndex === i ? "active" : ""}>
              {value}
            </li>
          )
        }
      </ul>
    </div>
  )
}
export default Categories;
