var GrowthPush;(function(global, exports){exports.ajax = function (params, callback) {
  if (typeof params == 'string') params = {url: params}
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , withCredentials = params.withCredentials || false

  var req = getRequest()

  // has no effect in IE
  // has no effect for same-origin requests
  // has no effect in CORS if user has disabled 3rd party cookies

  req.onreadystatechange = function () {
    if (req.readyState == 4)
      callback(req.status, req.responseText, req)
  }

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')
    setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
  }

  req.open(method, params.url, true)
  req.withCredentials = withCredentials

  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)
}

function getRequest() {
  if (global.XMLHttpRequest)
    return new global.XMLHttpRequest;
  else
    try { return new global.ActiveXObject("MSXML2.XMLHTTP.3.0"); } catch(e) {}
  throw new Error('no xmlhttp request able to be created')
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value
}
GrowthPush.nanoajax=exports;}(window, GrowthPush || (GrowthPush = {})));
// Type definitions for service_worker_api
// Project: https://developer.mozilla.org/fr/docs/Web/API/ServiceWorker_API
// Definitions by: Tristan Caron <https://github.com/tristancaron>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
/// <reference path="./es6-promise/es6-promise.d.ts" />
var GrowthPush;
(function (GrowthPush) {
    (function (EnvironmentType) {
        EnvironmentType[EnvironmentType["development"] = 0] = "development";
        EnvironmentType[EnvironmentType["production"] = 1] = "production";
    })(GrowthPush.EnvironmentType || (GrowthPush.EnvironmentType = {}));
    var EnvironmentType = GrowthPush.EnvironmentType;
    var Environment = (function () {
        function Environment() {
        }
        Environment.toString = function (type) {
            switch (type) {
                case GrowthPush.EnvironmentType.development:
                    return 'development';
                case GrowthPush.EnvironmentType.production:
                    return 'production';
            }
            return undefined;
        };
        Environment.valueOf = function (type) {
            switch (type) {
                case 'development':
                    return GrowthPush.EnvironmentType.development;
                case 'production':
                    return GrowthPush.EnvironmentType.production;
            }
            return undefined;
        };
        return Environment;
    })();
    GrowthPush.Environment = Environment;
})(GrowthPush || (GrowthPush = {}));
/// <reference path="./include.ts"/>
var GrowthPush;
(function (GrowthPush) {
    var UserAgent = (function () {
        function UserAgent() {
            this.UA = window.navigator.userAgent.toLowerCase();
        }
        UserAgent.prototype.isViewable = function () {
            var _this = this;
            var is = function (text) {
                return _this.UA.indexOf(text) != -1;
            };
            return (is('android 4.') ||
                is('android 5.') ||
                is('android 6.'));
        };
        return UserAgent;
    })();
    GrowthPush.UserAgent = UserAgent;
})(GrowthPush || (GrowthPush = {}));
/// <reference path="./include.ts"/>
var GrowthPush;
(function (GrowthPush) {
    var Client = (function () {
        function Client(params) {
            if (params == undefined)
                return;
            this.id = params.id;
            this.growthbeatClientId = params.growthbeatClientId;
            this.token = params.token;
            this.applicationId = params.applicationId;
            this.applicationId = params.growthbeatApplicationId;
            this.code = params.code;
            this.os = params.os;
            this.environment = GrowthPush.Environment.valueOf(params.environment);
            this.created = params.created;
        }
        Client.register = function (applicationId, secret, registrationId, os, environment, success, failure) {
            GrowthPush.nanoajax.ajax({
                url: GrowthPush.BASE_URL + '1/clients',
                method: 'POST',
                body: 'applicationId=' + applicationId
                    + '&token=' + registrationId
                    + '&os=' + os
                    + '&environment=' + GrowthPush.Environment.toString(environment)
                    + '&secret=' + secret
            }, function (code, responseText) {
                if (code !== 200)
                    failure('failure');
                if (responseText)
                    success(new GrowthPush.Client(JSON.parse(responseText)));
            });
        };
        Client.update = function (clientId, code, registrationId, environment, success, failure) {
            GrowthPush.nanoajax.ajax({
                url: GrowthPush.BASE_URL + '1/clients/' + clientId,
                method: 'PUT',
                body: 'token=' + registrationId
                    + '&environment=' + GrowthPush.Environment.toString(environment)
                    + '&code=' + code
            }, function (code, responseText) {
                if (code !== 200)
                    failure('failure');
                success(new GrowthPush.Client(JSON.parse(responseText)));
            });
        };
        Client.prototype.getId = function () {
            return this.id;
        };
        Client.prototype.getGrowthbeatClientId = function () {
            return this.growthbeatClientId;
        };
        Client.prototype.getToken = function () {
            return this.token;
        };
        Client.prototype.getApplicationId = function () {
            return this.applicationId;
        };
        Client.prototype.getGrowthbeatApplicationId = function () {
            return this.growthbeatApplicationId;
        };
        Client.prototype.getCode = function () {
            return this.code;
        };
        Client.prototype.getOs = function () {
            return this.os;
        };
        Client.prototype.getEnvironment = function () {
            return this.environment;
        };
        Client.prototype.getCreated = function () {
            return this.created;
        };
        return Client;
    })();
    GrowthPush.Client = Client;
})(GrowthPush || (GrowthPush = {}));
/// <reference path="./include.ts"/>
var GrowthPush;
(function (GrowthPush) {
    var Tag = (function () {
        function Tag(data) {
            if (data == undefined)
                return;
            this.tagId = data.tagId;
            this.clientId = data.clientId;
            this.value = data.value;
        }
        Tag.create = function (clientId, code, name, value, success, failure) {
            GrowthPush.nanoajax.ajax({
                url: GrowthPush.BASE_URL + '1/tags',
                method: 'POST',
                body: 'clientId=' + clientId +
                    '&code=' + code +
                    '&name=' + name +
                    '&value=' + value
            }, function (code, responseText) {
                if (code !== 200)
                    failure('failure');
                if (responseText)
                    success(new GrowthPush.Tag(JSON.parse(responseText)));
            });
        };
        Tag.prototype.getTagId = function () {
            return this.tagId;
        };
        Tag.prototype.setTagId = function (tagId) {
            this.tagId = tagId;
        };
        Tag.prototype.getClientId = function () {
            return this.clientId;
        };
        Tag.prototype.setClientId = function (clientId) {
            this.clientId = clientId;
        };
        Tag.prototype.getValue = function () {
            return this.value;
        };
        Tag.prototype.setValue = function (value) {
            this.value = value;
        };
        return Tag;
    })();
    GrowthPush.Tag = Tag;
})(GrowthPush || (GrowthPush = {}));
/// <reference path="./include.ts"/>
var GrowthPush;
(function (GrowthPush) {
    var Event = (function () {
        function Event(data) {
            if (data == undefined)
                return;
            this.goalId = data.goalId;
            this.timestamp = data.timestamp;
            this.clientId = data.clientId;
            this.value = data.value;
        }
        Event.create = function (clientId, code, name, value, success, failure) {
            GrowthPush.nanoajax.ajax({
                url: GrowthPush.BASE_URL + '1/events',
                method: 'POST',
                body: 'clientId=' + clientId +
                    '&code=' + code +
                    '&name=' + name +
                    '&value=' + value
            }, function (code, responseText) {
                if (code !== 200)
                    failure('failure');
                if (responseText)
                    success(new GrowthPush.Event(JSON.parse(responseText)));
            });
        };
        Event.prototype.getGoalId = function () {
            return this.goalId;
        };
        Event.prototype.setGoalId = function (goalId) {
            this.goalId = goalId;
        };
        Event.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        Event.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        Event.prototype.getClientId = function () {
            return this.clientId;
        };
        Event.prototype.setClientId = function (clientId) {
            this.clientId = clientId;
        };
        Event.prototype.getValue = function () {
            return this.value;
        };
        Event.prototype.setValue = function (value) {
            this.value = value;
        };
        return Event;
    })();
    GrowthPush.Event = Event;
})(GrowthPush || (GrowthPush = {}));
/// <reference path="libs/nanoajax.d.ts"/>
/// <reference path="libs/ServiceWorker.ts" />
/// <reference path="Envrionment.ts"/>
/// <reference path="Useragent.ts"/>
/// <reference path="Client.ts"/>
/// <reference path="Tag.ts"/>
/// <reference path="Event.ts"/>
/// <reference path="main.ts"/>
/// <reference path="./include.ts"/>
var GrowthPush;
(function (GrowthPush) {
    GrowthPush.BASE_URL = 'https://api.growthpush.com/';
    var App = (function () {
        function App(option) {
            this.environment = GrowthPush.EnvironmentType.production;
            this.applicationId = option.applicationId;
            this.secret = option.secret;
            this.environment = GrowthPush.Environment.valueOf(option.environment);
            this.os = 'android';
            this.receiver = option.receiver;
        }
        App.prototype.initialize = function () {
            // if(!new GrowthPush.UserAgent().isViewable())
            // 	return;
            var _this = this;
            if (this.environment == undefined)
                this.environment = GrowthPush.EnvironmentType.production;
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register(this.receiver).then(function (registration) {
                    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                        return;
                    }
                    if (Notification.permission === 'denied') {
                        return;
                    }
                    if (!('PushManager' in window)) {
                        return;
                    }
                    registration.pushManager.getSubscription().then(function (subscription) {
                        console.log(subscription);
                        if (!subscription) {
                            _this.subscribe();
                            return;
                        }
                        _this.registerClient(subscription.subscriptionId);
                    }).catch(function (err) {
                    });
                });
            }
        };
        App.prototype.subscribe = function () {
            var _this = this;
            navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true }).then(function (subscription) {
                    if (!subscription)
                        return;
                    _this.registerClient(subscription.subscriptionId);
                }).catch(function (e) {
                });
            });
        };
        App.prototype.registerClient = function (subscriptionId) {
            var client = new GrowthPush.Client(JSON.parse(localStorage.getItem('growthpush-client')));
            if (!client || !client.getId()) {
                GrowthPush.Client.register(this.applicationId, this.secret, subscriptionId, this.os, this.environment, function (client) {
                    localStorage.setItem('growthpush-client', JSON.stringify(client));
                }, function (error) {
                });
                return;
            }
            if (client.getToken() != subscriptionId || client.getEnvironment() != this.environment) {
                GrowthPush.Client.update(client.getId(), client.getCode(), subscriptionId, this.environment, function (client) {
                    localStorage.setItem('growthpush-client', JSON.stringify(client));
                }, function (error) {
                });
                return;
            }
        };
        App.prototype.tag = function (name, value) {
            var existingTag = new GrowthPush.Tag(JSON.parse(localStorage.getItem('tag-' + name)));
            if (existingTag && existingTag.getValue() == value)
                return;
            var waitClient = setInterval(function () {
                var client = new GrowthPush.Client(JSON.parse(localStorage.getItem('growthpush-client')));
                if (client && client.getId()) {
                    clearInterval(waitClient);
                    GrowthPush.Tag.create(client.getId(), client.getCode(), name, value, function (tag) {
                        localStorage.setItem('tag-' + name, JSON.stringify(tag));
                    }, function (error) {
                    });
                }
            }, 1000);
        };
        App.prototype.trackEvent = function (name, value) {
            var waitClient = setInterval(function () {
                var client = new GrowthPush.Client(JSON.parse(localStorage.getItem('growthpush-client')));
                if (client && client.getId()) {
                    clearInterval(waitClient);
                    GrowthPush.Event.create(client.getId(), client.getCode(), name, value, function (event) {
                    }, function (error) {
                    });
                }
            }, 1000);
        };
        return App;
    })();
    GrowthPush.App = App;
})(GrowthPush || (GrowthPush = {}));
