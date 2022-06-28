import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom'


import Card from '../Card';

const Profile = () => {

    const [orders, setOrders] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        (async () => {

            setLoading(true)
            const resp = await axios.get('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
            
            const data = resp.data || []

            const myOrders = Object.keys(data).reduce((initArr, nextKey) => {
                console.log(data[nextKey])
                return [...initArr, ...data[nextKey]]
            }, 
            []).reverse()
            
            console.log(myOrders.reverse())

            setLoading(false)
            setOrders(myOrders)

        })()
    }, [])

    return (
        <>
        
        <h3 style={{
            marginTop: 25,
            marginBottom: 0,
            fontSize: 20
        }}>Недавно купленные товары</h3>

        <div className="items">
            
            <div className="products">
              {                
                orders.length
                ? orders.map((card, index) => (
                  <Card
                    key={index}
                    {...card}
                    favorited={true}
                    bottomed={false}
                    showWeight={false}
                    // loading={loading}
                  />
                ))
                : loading ? <p>Загрузка...</p> : <p>Здесь пока ничего нет.</p>
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

export default Profile;
