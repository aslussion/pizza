import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PageIndex from './pageIndex'
import PageCart from './pageCart'


const Content = (p) => {
  return (
    <Switch>
    	<Route exact path="/" render={props => <PageIndex p={p} />} />
    	<Route path="/cart" render={props => <PageCart p={p} />} />
    </Switch>
  )
}


export default Content
