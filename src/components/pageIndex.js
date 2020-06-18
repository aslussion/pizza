import React from 'react';
import { Component } from "react";

const Product = (p) => {
  const id = p.id,
  product = p.product;
  p = p.p;

  const productStyle = {backgroundImage: 'url(../dist/img/tmp/product.jpg)'},
  price = p.calcPrice(product.price,p.coef);

  let btn;
  if(product.inCart)
    btn = <div className="product-button product-button--unact">&#10004; In cart</div>
  else
    btn = <button className="product-button" onClick={p.addToCart} value={id} >To cart</button>

  return(
        <div className="col-md-4 col-xl-3">
          <div className="product j-product">
            <a className="product-img" href="" style={productStyle} ></a>
            <div className="product-inner">
              <div className="product-name"><a className="product-link" href="">{product.name}</a></div>
              <div className="product-text">{product.text}</div>
              <div className="product-nmb">
                <div className="nmb">
                  <div className="nmb-arrow nmb-arrow--minus" onClick={() => {p.cntBtn(id,true,true)}}></div>
                  <input className="nmb-input" value={product.cnt} readOnly="readonly"/>
                  <div className="nmb-arrow nmb-arrow--plus" onClick={() => {p.cntBtn(id,true)}}></div>
                </div>
              </div>
              <div className="product-bottom">
                <div className="product-prices"><span className="price product-price"> <span>{price} </span>{p.currency}</span></div>
                <div className="cartWrapper">{btn}</div>
              </div>
            </div>
          </div>
        </div>
  )
}

const PageIndex = (p) => {
	p = p.p;

	const products = Object.entries(p.products).map(([id, el]) => {
    return <Product key={id} id={id} product={el} p={p}  />;
  });
  return <div className="row catalogList">{products}</div>
}

export default PageIndex
