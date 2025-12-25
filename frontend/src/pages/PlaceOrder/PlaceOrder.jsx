import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import axios from "axios";
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    srcX: "",
    srcY: "",
   
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data)=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    // food_list.map((item)=>{
    //   if(cartItems[item.id]>0){
    //     let itemInfo = item;
    //     itemInfo['quantity'] = cartItems[item.id];
    //     orderItems.push(itemInfo);
    //   }
    // })

    food_list.forEach((item) => {
      // items from DB use `_id` as identifier
      if (cartItems[item._id] > 0) {
        orderItems.push({
          name: item.name || item.title,
          price: item.price || item.cost,
          quantity: cartItems[item._id],
        });
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2,
    }
    if (orderItems.length === 0) {
      alert('Your cart is empty. Add items before placing an order.');
      return;
    }

    // debug: show items being sent to backend/Stripe
    console.log('Placing order with items:', orderItems, 'amount:', orderData.amount);

    let response = await axios.post(url+"/api/order/place",orderData ,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
        <div className="coordinates">
        <input required name='srcX' onChange={onChangeHandler} value={data.srcX} type="text" placeholder='srcX'/>
        <input required name='srcY' onChange={onChangeHandler} value={data.srcY} type="text" placeholder='srcY'/>
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder








// const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     // food_list.map((item)=>{
//     //   if(cartItems[item.id]>0){
//     //     let itemInfo = item;
//     //     itemInfo['quantity'] = cartItems[item.id];
//     //     orderItems.push(itemInfo);
//     //   }
//     // })

//     food_list.forEach((item) => {
//       // items from DB use `_id` as identifier
//       if (cartItems[item._id] > 0) {
//         orderItems.push({
//           name: item.name || item.title,
//           price: item.price || item.cost,
//           quantity: cartItems[item._id],
//         });
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount()+2,
//     }
//     if (orderItems.length === 0) {
//       alert('Your cart is empty. Add items before placing an order.');
//       return;
//     }

//     let response = await axios.post(url+"/api/order/place",orderData ,{headers:{token}});
//     if(response.data.success){
//       const {session_url} = response.data;
//       window.location.replace(session_url);
//     }
//     else{
//       alert("error");
//     }
//   }