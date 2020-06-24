import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Content from './Content'

const CurrencySwitch = (p) => {
  let selectedId;
  const options = p.currencies.map(function(cur,i) {
    if(cur.active)
      selectedId = cur.id;
    return <option key={i} value={cur.id}>{cur.name}</option>
  });

  return(
    <select  
      className='select'
      value={selectedId}
      onChange={p.changeCurrency}
    >{options}</select>
  ) 
}
const HeaderCart = (p) => {
  p = p.p;
  const cartProducts = p.cartProducts,
  products = p.products;
  let cnt=0,
  sum=0,
  price;
  for(let cartProductId in cartProducts){
    if(products[cartProductId]){
      cnt++;
      price = p.calcPrice(products[cartProductId].price,p.coef);
      sum += price * cartProducts[cartProductId];
    }
  }
  const word = (cnt==1) ? 'product' : 'products';

  return( 
        <div className="fcontact text-left">
            <div className="fcontact-icon"><div className="icon-hCart"></div></div>
            <div>
                <div className="fcontact-bold">Cart:</div>
                <div className="fcontact-text"> 
                  <Link to="/cart" onClick={p.clearOrderId} >
                    <span className="cartTop-cnt">{cnt}</span>  <span className="cartTop-word">{word}</span>,  <span className="cartTop-sum">{sum} </span> {p.currency}
                  </Link>
                </div>
            </div>
        </div>
  )
}
const Header = (p) => {
  return( 
          <div className="bin demoHeader">
            <div className='row'>
              <div className='col-6 col-md-4 col-lg-5'><div className='fcontact'><div className='fcontact-text'><Link to="/" onClick={p.clearOrderId} >Continue shopping</Link></div></div></div>
              <div className='col-6 col-md-4 col-lg-2'>Select a currency: <CurrencySwitch currencies={p.currencies} changeCurrency={p.changeCurrency}  /></div>
              <div className='col-md-4 col-lg-5 demoHeader-cart'><HeaderCart p={p} /></div>
            </div>
          </div>
  )
}

class App extends Component {
  constructor() {
        super();
        this.state = {
          currencies:[
            {
              id:0,
              name:'$',
              coef:1,
              active:true,
            },
            {
              id:1,
              name:'€',
              coef:1.1243,
              active:false,
            },
          ],

          products:{
            123:{
              name:'cheese pizza',
              text:'Very tasty',
              price:1000,
              cnt:1,
              inCart:false,
            },
            124:{
              name:'pizza 2',
              price:1560,
              cnt:1,
              inCart:false,
            },
            125:{
              name:'pizza 3',
              price:100,
              cnt:1,
              inCart:false,
            },
            126:{
              name:'pizza 4',
              price:100,
              cnt:1,
              inCart:false,
            },
            127:{
              name:'pizza 5',
              price:100,
              cnt:1,
              inCart:false,
            },
            128:{
              name:'pizza 6',
              price:100,
              cnt:1,
              inCart:false,
            },
            129:{
              name:'pizza 7',
              price:100,
              cnt:1,
              inCart:false,
            },
            130:{
              name:'pizza 8',
              price:100,
              cnt:1,
              inCart:false,
            },
          },

          cartProducts:{},
          //demo cart
          /*cartProducts:{
            125:3,
            124:1,
          },*/

          shippings:[
            {
              id:111,
              name:'shipping 1',
              text:'description',
              price:0,
              active:true,
            },
            {
              id:112,
              name:'shipping 2',
              price:100,
              active:false,
            },
          ],
          contacts:{
            'name':{
              text:'Name',
              req:true,
              val:'',
              type:'',
            },
            'phone':{
              text:'Phone',
              req:true,
              val:'',
              type:'tel',
            },
            'address':{
              text:'Address',
              req:false,
              val:'',
              type:'',
            },
          },
          orderId:false,//for showing after making order page
        };
        
        this.changeCurrency = this.changeCurrency.bind(this);
        this.cntBtn = this.cntBtn.bind(this);
        this.changeCnt = this.changeCnt.bind(this);
        this.changeCntCart = this.changeCntCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.deleteFrCart = this.deleteFrCart.bind(this);
        this.changeShipping = this.changeShipping.bind(this);
        this.changeContact = this.changeContact.bind(this);
        this.orderSubmit = this.orderSubmit.bind(this);
        this.clearOrderId = this.clearOrderId.bind(this);
        
    }

    changeCurrency(event) {
      const activeId = event.target.value;
      for(let i=0;i<this.state.currencies.length;i++){
        let status = false;
        if(this.state.currencies[i].id == activeId)
          status = true;
        this.state.currencies[i].active = status;
        this.setState({currencies: this.state.currencies});
      }
    }
    cntBtn(id,isProduct,isMinus){
      let cnt;
      if(isProduct)
        cnt = this.state.products[id].cnt;
      else
        cnt = this.state.cartProducts[id];

      if(isMinus){
        if (cnt>1)
          cnt--;
      }
      else  
        cnt++;//plus

      const p = {id,cnt};

      if(isProduct)
        this.changeCnt(p);
      else
        this.changeCntCart(p);
    }
    changeCnt(p){
        if(this.state.products[p.id] && p.cnt>0){
          this.state.products[p.id].cnt = p.cnt;
          this.setState({products: this.state.products});
        }
    }
    changeCntCart(p){
      if(this.state.cartProducts[p.id] && p.cnt>0){
        this.state.cartProducts[p.id]=p.cnt;
        this.setState({cartProducts: this.state.cartProducts});
      }
    }
    addToCart(event) {
      const id=event.target.value;
      let cnt=this.state.products[id].cnt;
      if(cnt>0){
        if(this.state.cartProducts[id])
          cnt += this.state.cartProducts[id];//this product is already in cart, increase it's number
        this.state.cartProducts[id]=cnt;
        this.state.products[id].inCart=true;
        this.setState({cartProducts: this.state.cartProducts,products: this.state.products});
        this.clearOrderId();
      }
    }
    deleteFrCart(event){
      const id=event.target.value;
      this.state.products[id].cnt=1;
      this.state.products[id].inCart=false;
      delete this.state.cartProducts[id];
      this.setState({cartProducts: this.state.cartProducts,products: this.state.products});
    }
    changeShipping(event){
      const activeId = event.target.value;
      for(let i=0;i<this.state.shippings.length;i++){
        let status = false;
        if(this.state.shippings[i].id == activeId)
          status = true;
        this.state.shippings[i].active = status;
      }
      this.setState({shippings: this.state.shippings});
    } 
    changeContact(event){
      const name = event.target.name;
      this.state.contacts[name].val = event.target.value;
      this.setState({contacts:this.state.contacts});
    }
    orderSubmit(event){
      let reqFilled = true;
      let contacts = {};

      for(let key in this.state.contacts) {
        if(this.state.contacts[key].req && !this.state.contacts[key].val)
          reqFilled = false;//checking all required fields filled
        if(this.state.contacts[key].val)
          contacts[key] = this.state.contacts[key].val;//and saving filled information
      }
      if(reqFilled){
        let data = {};
        data.cart = this.state.cartProducts;
        data.contacts = contacts;
        //saving selected shipping
        for(let i=0;i<this.state.shippings.length;i++){
          if(this.state.shippings[i].active){
            data.shipping = this.state.shippings[i].id;
            break;
          }
        }

        //here saving order to database

        const orderId = 12345;//this is order number from DB

        for (let i in this.state.products) {
          this.state.products[i].cnt = 1;
          this.state.products[i].inCart = false;
        }
        //Don't clearing contacts and shipping. Buyer may not want to change them.
        this.setState({
          orderId:orderId,
          products:this.state.products,
          cartProducts:{},//clearing cart
        });
      }
      else{
        alert('Fill in required fields.');
      }
      
      event.preventDefault();
    }
    clearOrderId(){
      this.setState({orderId:false});
    }
    calcPrice(price,coef){
      return Math.round(price*coef);
    }
      

    render() {
      const { input } = this.state;

      let currency;
      let coef=1;
      for(let i=0;i<this.state.currencies.length;i++){
        if(this.state.currencies[i].active){
          currency = this.state.currencies[i].name;
          coef = this.state.currencies[i].coef;
          break;
        }
      }
      const header = <Header 
          currencies={this.state.currencies}
          changeCurrency={this.changeCurrency} 
          
          currency={currency} 
          coef={coef} 
          calcPrice={this.calcPrice}

          products={this.state.products}  
          cartProducts={this.state.cartProducts}                 
          clearOrderId={this.clearOrderId}

        />;
        
        return (
            <div>
                {header}
                <div className="bin content contentInner">
                  <Content
                    currency={currency} 
                    coef={coef} 
                    calcPrice={this.calcPrice}
                    
                    products={this.state.products} 
                    cartProducts={this.state.cartProducts} 
                    
                    cntBtn={this.cntBtn}
                    addToCart={this.addToCart} 
                    deleteFrCart={this.deleteFrCart} 
                    
                    shippings={this.state.shippings}
                    changeShipping={this.changeShipping}
                    contacts={this.state.contacts}
                    changeContact={this.changeContact}
                    orderSubmit={this.orderSubmit}
                    orderId={this.state.orderId}
                  />
                </div>
            </div>
        );
    }
}

export default App;