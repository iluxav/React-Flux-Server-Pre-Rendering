/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var Decrease =
  React.createClass({
    handleClick:function(){
      AppActions.decreaseItem(this.props.index);
    },
   render:function(){
      return React.createElement("button", {onClick: this.handleClick}, "-")
    }
  });
module.exports = Decrease;