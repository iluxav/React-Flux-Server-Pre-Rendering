(function() {
  var _ref;

  if ((_ref = window.dpm) == null) window.dpm = {};

  dpm.Router = (function() {

    function Router(route, name_space, default_page) {
      this.route_page(route, name_space, default_page);
    }

    Router.prototype.route_page = function(route, name_space, default_page) {
      var action, ctrl, pkg, _ref2, _ref3;
      this.route = route;
      this.name_space = name_space;
      this.default_page = default_page;
      this.route = this.route.replace(/^\/|\/$/g, '');
      if (!this.name_space) this.name_space = window;
      this.segments = this.route.split('/').length;
      if (this.segments > 2) {
        _ref2 = this.route.split('/'), pkg = _ref2[0], ctrl = _ref2[1], action = _ref2[2];
        ctrl = this.humanize(ctrl);
        if (this.name_space[pkg]) this.route_class = this.name_space[pkg][ctrl];
      } else {
        _ref3 = this.route.split('/'), ctrl = _ref3[0], action = _ref3[1];
        ctrl = this.humanize(ctrl);
        this.route_class = this.name_space[ctrl];
      }
      if (this.route_class) {
        this.name_space.page = new this.route_class();
        if (typeof this.name_space.page[action] === 'function') {
          return this.name_space.page[action]();
        }
      } else {
        if (this.default_page) {
          return this.name_space.page = new this.default_page();
        }
      }
    };

    Router.prototype.humanize = function(string) {
      var arr, humanized, word, _i, _len;
      humanized = "";
      arr = string.split('_');
      if (arr.length > 0) {
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          word = arr[_i];
          humanized += this.capitalize(word);
        }
      } else {
        humanized = this.capitalize(string);
      }
      return humanized;
    };

    Router.prototype.capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return Router;

  })();

}).call(this);
