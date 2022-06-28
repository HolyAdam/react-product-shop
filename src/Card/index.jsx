import { useState, useContext } from "react"
import ContentLoader from "react-content-loader"
import { Context } from "../Context"

const Card = ({ title, weight, price, imgSrc, isLoading, onAddToCard, id, bottomed = true, showWeight = true }) => {

    const { isItemAdded, isFavoriteAdded, addFavorite } = useContext(Context)

    const add = () => {
        onAddToCard({
            productId: id,
            title, 
            price,
            imgSrc
        })
    }

    const onAddFavorite = () => {

        addFavorite({
            productId: id,
            title,
            price,
            imgSrc,
            weight
        })
    }

    return (
        <>
            {
                isLoading
                    ? (
                        <ContentLoader 
                            speed={2}
                            width={242}
                            height={320}
                            viewBox="0 0 150 270"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="16" rx="2" ry="2" width="150" height="155" /> 
                            <rect x="0" y="188" rx="0" ry="0" width="150" height="15" /> 
                            <rect x="0" y="210" rx="0" ry="0" width="147" height="15" /> 
                            <circle cx="136" cy="253" r="14" /> 
                            <circle cx="101" cy="253" r="14" />
                        </ContentLoader>
                    )
                    : (
                        <div className="productsItem">
                            <img width={150} height={150} src={imgSrc} alt="Апельсин" />
                            <div className="productsInfo">
                                <h5 className="productsName">
                                { title }
                                </h5>
                                {
                                    showWeight ? (
                                        <p className="productsWeight">
                                            Масса: { weight } грамм
                                        </p>
                                    ) : null
                                }
                                <div className="productsBottom">
                                <div className="productsPrice">
                                    ₽
                                    <span>{ price }</span>
                                </div>
                                {
                                    bottomed && (
                                        <div className="productsCta">
                                            <button className="productsBtn favoriteBtn" onClick={onAddFavorite}>
                                                <img src={isFavoriteAdded(id) ? "img/checked_favorite.svg" : "img/favoriteProduct.svg"} alt="Добавить в корзину" />
                                            </button>
                                            <button className="productsBtn addBtn" onClick={add}>
                                                <img src={isItemAdded(id) ? "img/checked_cart.svg" : "img/cartProduct.svg"} alt="Добавить в корзину" />
                                            </button>
                                        </div>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Card