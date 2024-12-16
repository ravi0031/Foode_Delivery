import React, { useContext ,useState} from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import Comparison from '../comparison/comparison ';

const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url,currency,deliveryCharge,discount,setDiscount} = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const navigate = useNavigate();

  const validPromoCodes = {
    'PROMO10': 10, // 10% discount
    'PROMO20': 20  // 20% discount
};
 
const handlePromoSubmit = () => {
  if (validPromoCodes[promoCode]) {
      setDiscount(validPromoCodes[promoCode]);
      setPromoCode(promoCode);
  } else {
      alert('Invalid promo code');
      setDiscount(0);
      setPromoCode('');
  }
};

const calculateDiscountedTotal = () => {
const total = getTotalCartAmount();
return total - (total * discount / 100);
};


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{currency}{item.price}</p>
                <div>{cartItems[item._id]}</div>
                <p>{currency}{item.price*cartItems[item._id]}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount()===0?0:deliveryCharge}</p></div>
            <hr />
            <div className='cart-total-details'>
                       <p>Discount</p>
                       <p>{getTotalCartAmount()===0?0:discount}%</p>
            </div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount()===0?0:calculateDiscountedTotal()+deliveryCharge}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'
              value={promoCode}
              onChange={(e => setPromoCode(e.target.value))}/>
              <button  onClick={handlePromoSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  )
}

export default Cart
