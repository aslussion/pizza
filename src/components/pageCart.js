import React from 'react'

import '../styles/cart.min.css';

const Done = (p) => {
  return(
      <div className="row">
        <div className="col-md-8"> 
          <div className="blockBrown blockBrown--cart d-flex align-items-center">
            <div className="blockBrown-pct"><img alt="" src="../dist/img/brownBlock.jpg" /></div>
            <div className="blockBrown-inner">
              <div className="blockBrown-ttl">Thanks for your order!</div>
              <p className="blockBrown-orderNmb">№{p.id}</p>
            </div>
          </div>
        </div>
      </div>
  )
}
const Product = (p) => {
  const id = p.id,
  cartProduct = p.cartProduct,
  product = p.product;
  p = p.p;

  const productStyle = {backgroundImage: 'url(../dist/img/tmp/product.jpg)'},
  price = p.calcPrice(product.price,p.coef);

  return(
    <div className="product j-productCart">
      <a className="product-img" style={productStyle} href=""></a>
      <div className="product-inner">
        <div className="product-name"><a className="product-link" href="">{product.name}</a></div>
        <div className="product-nmbLine">
          <div className="nmb">
            <div className="nmb-arrow nmb-arrow--minus" onClick={() => {p.cntBtn(id,false,true)}}></div>
            <input className="nmb-input" value={cartProduct} readOnly="readonly"/>
            <div className="nmb-arrow nmb-arrow--plus" onClick={() => {p.cntBtn(id)}}></div>
          </div>
        </div>
        <div className="product-bottom">
          <div className="product-prices"><span className="price product-price"> <span className="j-product-price">{price} </span><span> {p.currency}</span></span></div>
          <button className="deleteBtn" value={id} onClick={p.deleteFrCart}>Delete</button>
        </div>
      </div>
    </div>
  ) 
}

const Shipping = (p) => {
  const el = p.el;
  p = p.p;
      
  let text = '';
  if(el.text)
    text = <div className="payment-descr">{el.text}</div>;

  return(
    <div className="col-6 col-xl-4">
      <label className="lblPayment">
        <div className="switch switch--radio switch--payment">
          <input 
            type="radio" 
            name="shipping" 
            required
            value={el.id} 
            checked={el.active}
            onChange={p.changeShipping}
          />
          <div className="switch-span">
            <div className="payment-circle"></div>
            <div className="payment-icon"><img alt="" src="../dist/img/tmp/pay1.png" /></div>
            <div className="payment-text">
              <div className="payment-name">{el.name}</div>
              {text}
            </div>
          </div>
        </div>
      </label>
    </div>
  )  
}
const Contact = (p) => {
  const el = p.el,
  code=p.code;
  p = p.p;

	const type = (el.type) ? el.type : 'text';
	let req = false,
	asterisk = '',
  classes='input';

	if(el.req){
		asterisk = <span className="req">*</span>;
    if(!el.val)
      classes += ' error';
	}

	return(
    <div className="col-lg-4">
			<label htmlFor={code}>{el.text}{asterisk}</label>
      <div className="inputWrap">
        <input 
          className={classes}
          type={type} 
          id={code} 
          name={code} 
          value={el.val}
					onChange={p.changeContact}
        />
      </div>
    </div>
  )
}
const Contacts = (p) => {
	p = p.p;
	const contacts = Object.entries(p.contacts).map(([id, el]) => {
	 return <Contact el={el} code={id} key={id} p={p} />
  });

	return(
    <section>
      <div className="ttl">Contacts</div>
      <div className="row">{contacts}</div>
      <div className="row cartFinalLine">
        <div className="col-md-5 col-xl-4 cartFinalLine-btn">
          <button className="cartButton">Order</button>
        </div>
      </div>
    </section>
  )
}

const Order = (p) => {
  p = p.p;
  const shippings = p.shippings.map(function(el) {
	  return <Shipping el={el} key={el.id} p={p}  />;
	});
  return(
    <div>
			<section className="cartSection">
        <div className="ttl">Shipping</div>
	      <div className="row">{shippings}</div>
      </section>
      <Contacts p={p} />
    </div>
  )   
}

const PageCart = (p) => {
  p = p.p;
  if(p.orderId){
  	return <Done id={p.orderId} />       
  }
  else{
    let cnt=0,
    productsSum=0,
    shippingSum=0,
    totalSum=0,
    cartHasProducts=false;

    //printing products
    //and calcing products sum
    let price;
    const cartProducts = Object.entries(p.cartProducts).map(([id, el]) => {
      if(p.products[id]){
        cartHasProducts = true;
        cnt++;
        price = p.calcPrice(p.products[id].price,p.coef);
        productsSum += price * p.cartProducts[id];
        return <Product key={id} id={id} cartProduct={el} product={p.products[id]} p={p}   />;   
      }
    });

    //shipping sum
    for(let i=0;i<p.shippings.length;i++){
    	if(p.shippings[i].active){
    		shippingSum = p.shippings[i].price;
    		break;
    	}
    }
    shippingSum = p.calcPrice(shippingSum,p.coef);
    
    //total sum
    totalSum = productsSum + shippingSum;

    if(cartHasProducts)
      return (
        <form className="form cartForm row" onSubmit={p.orderSubmit} >
         <div className="col-md-8">
         	<section className='cartSection cartSection--brown'>
         	 <div className="cartProducts"><div className="cartProduct">{cartProducts}</div></div>
         	</section>
         	<Order p={p} />
         </div>
         <div className="col-md-4 col-xl-3 offset-xl-1 cartAsideCol">
            <div className="cartAside"> 
              <div className="cartAside-products">Products: <span>{cnt}</span></div>
              <div className="cartAside-inner">
                <div className="cartAside-prices">
                  <div className="cartAside-priceBlock cartAside-priceBlock--prices">
                  	<span>Products price</span>
                  	<span className="cartAside-priceBlockPrice">
                  		<span>{productsSum} </span>
                  		<span>{p.currency}</span>
                  	</span>
                  </div>
                  <div className="cartAside-priceBlock">
                  	<span className="d-none d-md-block">Shipping price</span>
                  	<span className="d-md-none">Shipping</span>
                  	<span className="cartAside-priceBlockPrice"> 
                  		<span>{shippingSum} </span>
                  		<span>{p.currency}</span>
                  	</span>
                  </div>
                  <div className="cartAside-priceBlock cartAside-priceBlock--total">
                  	<span className="cartAside-priceBlockName d-none d-md-block">Total sum</span>
                  	<span className="cartAside-priceBlockName d-md-none">Total</span>
                  	<span className="cartAside-priceBlockPrice"> 
                  		<span>{totalSum} </span>
                  		<span>{p.currency}</span>
                  	</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    else
  	 return(<div>Your cart is empty.</div>)
  }
}

export default PageCart
