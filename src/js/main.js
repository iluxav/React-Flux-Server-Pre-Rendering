/** @jsx React.DOM */
// var NavLink = require('./components/NavLink');


var APP = require('./components/app');
var React = require('react');
var page = require('page');

var About = React.createClass({
	componentDidMount:function(){
	},
	render:function(){
		   console.log('items', this.props);
		return (<div>
					<h1>Hi there from about page with params {this.props.me}</h1>
					<a href="/about/art">**about art</a>
				</div>);
	}
});

var Art = React.createClass({

	render:function(){
		return (<div>
					<h1>About Art</h1>
					<a href="/about">**about</a>
				</div>);
	}
});

var Posts = React.createClass({

	render:function(){
		return (<div>
					<h1>Posts page!</h1>
					<a href="/about">**about</a>
				</div>);
	}
});

var PageNotFound = React.createClass({

	render:function(){
		return (<div>
					<h1>OPSY!!!, Page not found!</h1>
					<a href="/">**home</a>
				</div>);
	}
});


var NavLink = React.createClass({
	handleClick:function(){
		page(this.props.path);
		 e.preventDefault();
	},
	render:function(){
		return (<a onClick={this.handleClick}>{this.props.text}</a>);
	}
});

var Router = React.createClass({

    getInitialState: function() {
        return {
            component: <div/>
        };
    },
    componentWillMount:function(){
    	 var self=this;
    	this.props.routes.forEach(function(route){
    		page(route.path,function(ctx){
    			self.setState({
    				component:React.createElement(route.component,ctx.params)
    			});
    		})
    	});
    },
    componentDidMount: function() {
        page.start({hashbang :false});
    },
    render: function() {
        return this.state.component;
    }
});
//var firstCall =false;

// var Route = React.createClass({

//    getInitialState:function(){
// 		return {component:null}
//    },
//     componentWillMount:function(){
//     	var self=this;
// 		// page(function(ctx,next){
// 		// 	self.setState({
// 		// 		component:<div/>
// 		// 	});
// 		// 	next();
// 		// })
// 		//this.props.path = this.props.path === '/' ? this.props.path : this.props.path + '*'
// 		page(this.props.path,function(ctx){
// 			self.setState({
// 				component:React.createElement(self.props.component,((self.props && self.props.children) ? self.props.children : <div/>))
// 			});
// 		})
//     },
//     componentDidMount: function() {
    	
//     	if(!firstCall){
//     		 page.start({hashbang :false});
//     		 firstCall=true;
//     	}
       
//     },
//     componentWillUnmount:function(){
// 		this.setState({
// 				component:<div/>
// 		});
//     },
//     render: function() {
//         return this.state.component!==null ? this.state.component : ((this.props && this.props.children) ? this.props.children : <div/>);
//     }
// });

var routes=[
	{
		path:'/',
		component:APP
	},
	{
		path:'/about/:me',
		component:About
	},
	{
		path:'/posts',
		component:Posts
	},
	{
		path:'*',
		component:PageNotFound
	}
];


// var Router = React.createClass({
//     render: function() {
//         return (<div>
// 	        		<Route path="/" component={APP}/>
// 	        		<Route path="/about/" component={About}>
// 	        			<Route path="/about/art" component={Art}/>
// 	        		</Route>
//         		</div>
//         	);
//     }
// });


React.renderComponent(<Router routes={routes}/>, document.getElementById('main'));