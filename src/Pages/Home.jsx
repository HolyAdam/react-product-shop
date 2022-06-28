import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import Card from '../Card';
import Slider from '../Slider';

const Home = () => {

    const filterToLowerFn = cards => cards.filter(card => {
        return card.title.toLowerCase().includes(inputVal.toLowerCase())
    })
    
    const [inputVal, setInputVal] = useState('')

    const { loading, cards, addToCard, favorites } = useContext(Context)

    console.log(favorites)

    return (
        <>
            <Slider />
            <div className="items">
            <div className="itemsTop">
              <h2 className="itemsTitle">
                Товары
              </h2>
              <div className="itemsSearch">
                <img src="img/search.svg" alt="Поиск" />
                <input type="text" placeholder='Поиск...' value={inputVal} onChange={e => setInputVal(e.target.value)} /> 
              </div>
            </div>
            <div className="products">
              {
                (loading 
                  ? [...new Array(8)]
                  : filterToLowerFn(cards)
                )
                .map((card, index) => (
                  <Card
                    key={index}
                    {...card}
                    isLoading={loading}
                    onAddToCard={addToCard}
                  />
                ))
              }
            </div>
            </div>
        </>
    );
}

export default Home;
