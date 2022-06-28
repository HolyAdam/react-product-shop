import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { Context } from '../Context';

import Card from '../Card';

const Favorites = () => {

    const { favorites } = useContext(Context)

    return (

        <>
            <h3 style={{
            marginTop: 25,
            marginBottom: 0,
            fontSize: 20
            }}>Избранное</h3>
            <div className="items">
                
                <div className="products">
                {
                    favorites.length 
                    ? favorites.map((card, index) => (
                    <Card
                        key={index}
                        {...card}
                        favorited={true}
                        bottomed={false}
                    />
                    ))
                    : <h3 style={{ fontSize: 24, color: '#dd0909', margin: '15 0' }}>Избранных нет</h3>
                }
                </div>
                <div className="backs" style={{
                    textAlign: 'center'
                }}>
                    <Link to="/" style={{
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        color: '#dd0909',

                    }}>
                        Вернуться к товарам
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Favorites;
