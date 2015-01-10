/** @jsx React.DOM */

var React = require('react');

var AppActions = require('../actions/app-actions.js');
var Cart = require('../components/app-cart.js');
var Catalog = require('../components/app-catalog.js');

var APP = React.createClass({
   
    componentWillMount: function() {
        this.setState({
            items: this.props.items
        });
    },
    componentDidMount:function(){

    },
    handleClick: function() {
        AppActions.addItem('this is the item');
    },
    render: function() {
        console.log('items', this.props);
        return React.createElement("div", null,
            React.createElement("p", null,
                React.createElement("a", {href:'/about/it works'},'Link to about page with :me parameter "it works!"')),
            React.createElement("h1", null),
            React.createElement(Catalog, {items: this.state.items}),
            React.createElement(Cart, null)
        )
    }
});
module.exports = APP;
