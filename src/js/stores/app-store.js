var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var remote = require('../../../src/js/remote')();
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";
var globals = require('../../../src/js/global');


// CATALOG SERVICE THAT SHOULD HANDLE THE CRUD OPERATION 
var _catalog = [];
remote.get(function(data) {
    _catalog = data;
});

var _cartItems = [];


function _removeItem(index) {
    var item = _cartItems[index];
    item.inCart = false;
    _cartItems.splice(index, 1);
    _markAsInCart(item);
}

function _increaseItem(index) {
    _cartItems[index].qty++;
}

function _decreaseItem(index) {
    if (_cartItems[index].qty > 1) {
        _cartItems[index].qty--;
    } else {
        _removeItem(index);
    }
}

function _markAsInCart(item, add) {

    console.time('LOOP');
    for (var i = _catalog.length - 1; i >= 0; i--) {
        if (item && _catalog[i].id == item.id) {
            _catalog[i].inside = add ? 'in Cart' : '***';
        }
    };
    console.timeEnd('LOOP');
}

function _addItem(item) {
    console.time('_addItem');
    if (!item.inCart) {
        _markAsInCart(item, true);
        item['qty'] = 1;
        item['inCart'] = true;
        _cartItems.push(item);
    } else {
        _cartItems.forEach(function(cartItem, i) {
            if (cartItem.id === item.id) {
                _increaseItem(i);
            }
        });
    }
    console.timeEnd('_addItem');
}

//END OF - CATALOG SERVICE THAT SHOULD HANDLE THE CRUD OPERATION 


//STORE
var AppStore = merge(EventEmitter.prototype, {

    // PUBLIC INTERFACE EXPOSED TO COMPONENTS
    emitChange: function() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getCart: function() {
        return _cartItems
    },

    getCatalog: function(skip, take,clb) {
        skip = skip || 0;
        take = take || 10;
        if (!_catalog) {
            return null;
        }
        clb(_catalog.slice(skip, skip + take));
    },

    getTotal: function() {
        if (!_catalog)
            return 0;
        return _catalog.length;
    },

    //END OF -  PUBLIC INTERFACE EXPOSED TO COMPONENTS


    // ACTION COMMMAND HANDLER
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action; // this is our action from handleViewAction
        switch (action.actionType) {
            case AppConstants.ADD_ITEM:
                _addItem(payload.action.item);
                break;

            case AppConstants.REMOVE_ITEM:
                _removeItem(payload.action.index);
                break;

            case AppConstants.INCREASE_ITEM:
                _increaseItem(payload.action.index);
                break;

            case AppConstants.DECREASE_ITEM:
                _decreaseItem(payload.action.index);
                break;
            case AppConstants.LOAD_PAGED_ITEMS:
                AppStore.getCatalog(payload.action.paging.skip);
                break;
        }


        // !!!! ALWAYS BROADCAST ANY CHANGE TO ALL SUBSCRIBED COMPONENTS
        AppStore.emitChange();

        return true;
    })
})

module.exports = AppStore;
