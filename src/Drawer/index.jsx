import React, { useContext, useState } from 'react';
import axios from 'axios'

import { Context } from '../Context';

import styles from './Drawer.module.scss'

const Drawer = ({ onClose, opened, cart, onOverlayClick, onRemoveProduct }) => {

    const { totalPrice, setCart } = useContext(Context)

    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const [telegaLogin, setTelegaLogin] = useState('')

    const onClickOrderBtn = async () => {

        await axios.post('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/orders.json', [...cart])
        
        await axios.post('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/clients.json', {
            clientTelega: telegaLogin,
            zakaz: cart
        })

        const orderNumber = await axios.get('https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/orders.json')
        const data = orderNumber.data || {}

        for (let i = 0; i < cart.length; i++) {
            await axios.delete(`https://saynshop-223-default-rtdb.europe-west1.firebasedatabase.app/cart/${cart[i].id}.json`)
        }

        setOrderId(Object.keys(data).length)
        setIsOrderCompleted(true)
        setTelegaLogin('')

        

        setCart([])
    }

    return (
        <div onClick={e => onOverlayClick(e, styles.Drawer)} className={`${styles.Drawer} ${opened ? styles.activated : ''}`}>
            <div className={styles.DrawerMenu}>
                <h3>Корзина</h3>

                <button onClick={onClose} className={styles.close}>
                    &times;
                </button>

                <div className={styles.DrawerCards}>
                    {
                        cart.length ? (
                            cart.map((item, index) => (
                                <div key={index} className={styles.DrawerCard} onClick={() => onRemoveProduct(item)}>
                                    <div className={styles.CardWrapper}>
                                        <img width={55} height={55} src={item.imgSrc} alt="Скиттлз" />
                                        <div>
                                            <h5>
                                                { item.title }
                                            </h5>
                                            <p>
                                            <strong>Цена: </strong> { item.price } ₽
                                            </p>
                                        </div>
                                        <div className={styles.DrawerCardRemove}>
                                            <button>
                                                <img width={15} height={15} src="img/remove.svg" alt="Удалить" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : isOrderCompleted ? <p>Спасибо за заказ, ваш заказ #{orderId}</p> : <p>Пока в корзине пусто...</p>
                    }
                </div>


                <div className={styles.DrawerBottom}>
                <input type="text" placeholder='@Your Telegram' value={telegaLogin} onChange={e => setTelegaLogin(e.target.value)} style={{
                        maxWidth: '100%',
                        padding: '7px',
                        margin: '10px auto',
                        border: '1px solid red',
                        outline: 'none',
                        display: 'block',
                    }} />
                    <button className={styles.btn} disabled={!cart.length || !(telegaLogin.length >= 3)} onClick={onClickOrderBtn}>
                        Оформить заказ
                    </button>
                    <div className={styles.DrawerInfo}>
                        <div className={styles.dots}>
                            Итого:
                        </div>
                        <div className={styles.total}>
                            {totalPrice} рублей
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
