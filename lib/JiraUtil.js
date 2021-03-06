"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JiraUtil = function () {
  //Set util options
  function JiraUtil() {
    var util = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, JiraUtil);

    this.util = util;
  }

  _createClass(JiraUtil, [{
    key: "promptSchema",
    value: function promptSchema() {
      return {
        properties: {
          username: {
            required: true
          },
          password: {
            hidden: true,
            required: true
          },
          projectKey: {
            required: true,
            description: "Jira Project Key (prefixes all issues in project)"
          },
          jiraBaseUri: {
            required: true,
            description: "Jira Base URI (e.g. https://jira.govready.com)"
          },
          path: {
            required: true,
            description: "Path to Issue-Pack File(s) (e.g. examples/example-pack.yml)"
          }
        }
      };
    }
  }, {
    key: "parse",
    value: function parse(args) {
      var util = this.util;
      var options = {
        path: [],
        logger: console,
        json_response: ""
      };
      args.forEach(function (arg) {
        if (util.startsWith(arg, "-t=")) {
          options.tool = arg.split('=', 2)[1];
        } else if (util.startsWith(arg, "-u=")) {
          options.username = arg.split('=', 2)[1];
        } else if (util.startsWith(arg, "-p=")) {
          options.password = arg.split('=', 2)[1];
        } else if (util.startsWith(arg, "-k=")) {
          options.projectKey = arg.split('=', 2)[1];
        } else if (util.startsWith(arg, "-b=")) {
          options.jiraBaseUri = arg.split('=', 2)[1];
        } else if (arg == "--json") {
          options.json_response = {
            log: []
          };
          options.logger = { log: function log(msg) {
              options.json_response.log.push(_chalk2.default.stripColor(msg));
            } };
        } else {
          options.path.push(arg);
        }
      });

      options.path = options.path.join(' ');

      return options;
    }

    //Validate input arguments

  }, {
    key: "validate",
    value: function validate(args) {
      var error = false;

      var tool = args.tool;
      var username = args.username;
      var password = args.password;
      var projectKey = args.projectKey;
      var jiraBaseUri = args.jiraBaseUri;
      var path = args.path;

      if (!tool || tool.toUpperCase() !== 'JIRA') {
        error = true;
      }

      if (username === undefined || username === true) {
        error = true;
      }

      if (password === undefined || password === true) {
        error = true;
      }

      if (projectKey === undefined || projectKey === true) {
        error = true;
      }

      if (jiraBaseUri === undefined || jiraBaseUri === true) {
        error = true;
      }

      if (path.length === 0) {
        error = true;
      }

      return !error;
    }

    //Print script usage

  }, {
    key: "usage",
    value: function usage() {
      var message = "usage: issue-pack -t=jira -u=username -p=password -k=projectKey -b=baseUri [--json] pack1.yml [pack2.yml] [pack3.yml] ...";

      return message;
    }
  }]);

  return JiraUtil;
}();

exports.default = JiraUtil;