/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var RemoveFromCart = require('../components/app-removefromcart.js');
var Increase = require('../components/app-increase.js');
var Decrease = require('../components/app-decrease.js');


function cartItems(){
  return {items: AppStore.getCart()}
}

var Cart =
  React.createClass({
    getInitialState:function(){
      return cartItems();
    },
    componentWillMount:function(){
      AppStore.addChangeListener(this._onChange)
    },
    _onChange:function(){
      this.setState(cartItems())
    },
   render:function(){
      var total=0;
      var items = this.state.items.map(function(item, i){
        var subtotal = item.cost*item.qty;
        total+=subtotal;
        return (
          React.createElement("tr", {key: i}, 
            React.createElement("td", null, React.createElement(RemoveFromCart, {index: i})), 
            React.createElement("td", null, item.title), 
            React.createElement("td", null, item.qty), 
            React.createElement("td", null, 
              React.createElement(Increase, {index: i}), 
              React.createElement(Decrease, {index: i})
            ), 
            React.createElement("td", null, "$", subtotal)
          )
          )
      })
      return (
          React.createElement("table", {className: "table table-hover"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null), 
                React.createElement("th", null, "Item"), 
                React.createElement("th", null, "Qty"), 
                React.createElement("th", null), 
                React.createElement("th", null, "Subtotal")
              )
            ), 
            React.createElement("tbody", null, 
              items
            ), 
            React.createElement("tfoot", null, 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "4", className: "text-right"}, "Total"), 
                React.createElement("td", null, "$", total)
              )
            )
          )
        )
    }
  });
module.exports = Cart;