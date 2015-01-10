/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var AddToCart = require('../components/app-addtocart.js');
var AppActions = require('../actions/app-actions.js');
var globals = require('../global');
function getCatalog(skip, clb) {
    var obj = {
        items: [],
        total: AppStore.getTotal()
    };
    AppStore.getCatalog(skip, null, function(items) {
        obj.items = items;
        clb(obj);
    });
}

var Catalog =
    React.createClass({
        paging: {
            skip: 0,
            take: 20
        },
        getInitialState: function() {

            return {
                items: [],
                total: 0
            };
        },
        componentWillMount: function() {
            AppStore.addChangeListener(this._onChange);
             var self = this;
            if (globals.isServer && this.props.items) {
              
                self.setState({
                    items: this.props.items
                });
            } else {
                getCatalog(null, function(data) {
                    self.setState(data);
                });
            }
            console.time('startMount');
        },
        _onChange: function() {
            var self = this;
            getCatalog(this.paging.skip, function(data) {
                self.setState(data);
                console.time('update');
            });

        },
        componentDidMount: function() {
            var self = this;
            console.timeEnd('startMount');
        },
        componentWillUpdate: function() {
            console.time('compUpdte');
        },
        componentDidUpdate: function() {
            console.timeEnd('compUpdte');
            console.timeEnd('update');
        },
        goNext: function() {
            this.paging.skip = this.paging.skip + 10;
            var self = this;
            getCatalog(this.paging.skip, function(data) {
                self.setState(data);
            })
        },
        goBack: function() {
            var self = this;
            this.paging.skip = this.paging.skip > 10 ? this.paging.skip - 10 : 0;
            var self = this;
            getCatalog(this.paging.skip, function(data) {
                self.setState(data);
            })

        },
        onTextChange: function() {
            var page = (parseInt(this.refs.text.getDOMNode().value) - 1) * 10;
            if (page <= this.state.total) {
                this.paging.skip = page;
                var self = this;
                getCatalog(this.paging.skip, function(data) {
                    self.setState(data);
                })
            }
        },
        render: function() {
            var items = this.state.items.map(function(item) {
                return React.createElement("tr", null, React.createElement("td", null, item.title), " ", React.createElement("td", null, item.inside), " ", React.createElement("td", null, "$", item.cost), React.createElement("td", null, React.createElement(AddToCart, {
                    item: item
                })))
            })
            return (
                React.createElement("div", null,
                    React.createElement("div", {
                            className: "table-fix"
                        },
                        React.createElement("table", {
                                className: "table table-hover"
                            },
                            items
                        )


                    ),
                    React.createElement("p", {
                            className: "center"
                        },
                        React.createElement("button", {
                            disabled: (this.paging.skip / 10) == 0,
                            onClick: this.goBack
                        }, "< Back"),
                        React.createElement("strong", null, (this.paging.skip / 10) + 1, "  of ", this.state.total),
                        React.createElement("input", {
                            onChange: this.onTextChange,
                            ref: "text"
                        }),
                        React.createElement("button", {
                            onClick: this.goNext
                        }, "Next >")
                    )
                )
            )
        }
    });
module.exports = Catalog;
