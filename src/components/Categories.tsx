import React from "react";

type CategoriesPropsType = {
    categoryId: number;
    onChangeCategory: (i: number) => void;
};

const categories: Array<string> = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesPropsType> = React.memo(({categoryId, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, i) =>
                        <li key={i} onClick={() => onChangeCategory(i)} className={categoryId === i ? "active" : ""}>
                            {categoryName}
                        </li>
                    )
                }
            </ul>
        </div>
    )
})
export default Categories;
