/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _constant = __webpack_require__(1);

	var _etcdnodesetting_controller = __webpack_require__(2);

	var _etcdnodesetting_controller2 = _interopRequireDefault(_etcdnodesetting_controller);

	var _clustermastersetting_controller = __webpack_require__(3);

	var _clustermastersetting_controller2 = _interopRequireDefault(_clustermastersetting_controller);

	var _clusternodesetting_controller = __webpack_require__(4);

	var _clusternodesetting_controller2 = _interopRequireDefault(_clusternodesetting_controller);

	var _filereader_directive = __webpack_require__(5);

	var _filereader_directive2 = _interopRequireDefault(_filereader_directive);

	var _upload_directive = __webpack_require__(6);

	var _upload_directive2 = _interopRequireDefault(_upload_directive);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// class ClusterinitialiseController {

	//     constructor($resource, $cookies, $location, $window) {
	//         
	//         this._resource = $resource;
	//         this._cookies = $cookies;
	//         this._location = $location;
	//         this._window = $window;
	//     }
	// }


	/**
	 * @项目名称: Neunn HOR UI
	 * @Copyright: 2017-2018 www.neunn.com All rights reserved.
	 * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	 */

	exports.default = angular.module('horClusterinitialiseApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngResource', 'ngSanitize', 'ngCookies', 'ui.router', 'ab-base64']).config(function ($stateProvider) {
	    $stateProvider.state('index', {
	        url: '/index',
	        views: {
	            '': {
	                controller: function controller($mdDialog, $window) {
	                    if (!(_constant.HOR_K8S_SERVER_URL_NEW == '')) {
	                        $mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Cluster Initialise Error').textContent('Cluster already has been initialised').ok('Yes')).then(function (d) {
	                            console.log(d);
	                            $window.location = _constant.HOR_K8S_SERVER_URL_NEW + '/' + _constant.HOR_LOGIN_PAGE;
	                        });
	                    }
	                },
	                templateUrl: 'clusterinitialise/start_page.html'
	            }
	        }
	    }).state('etcdNodeSetting', {
	        url: '/1',
	        views: {
	            '': {
	                controller: _etcdnodesetting_controller2.default,
	                controllerAs: '$ctrl',
	                templateUrl: 'clusterinitialise/etcdnodesetting.html'
	            }
	        }
	    }).state('clusterMasterSetting', {
	        url: '/2',
	        views: {
	            '': {
	                controller: _clustermastersetting_controller2.default,
	                controllerAs: '$ctrl',
	                templateUrl: 'clusterinitialise/clustermastersetting.html'
	            }
	        }
	    }).state('clusterNodeSetting', {
	        url: '/3',
	        views: {
	            '': {
	                controller: _clusternodesetting_controller2.default,
	                controllerAs: '$ctrl',
	                templateUrl: 'clusterinitialise/clusternodesetting.html'
	            }
	        }
	    });
	}).config(function ($httpProvider) {
	    // $httpProvider.interceptors.push(requestInterceptor);
	    $httpProvider.interceptors.push(responseInterceptor);
	}).config(function ($urlRouterProvider) {
	    $urlRouterProvider.otherwise('/index');
	}).directive('horFileReader', _filereader_directive2.default).directive('horUpload', _upload_directive2.default).factory('horClusterInitialiseEvtConnect', function () {
	    var serviceInstance = {};

	    serviceInstance.startClusterInitialiseEvtConnect = startClusterInitialiseEvtConnect;

	    function genStartEvtConnect(url, callback, eofCallback) {
	        var evtSourceObj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	        var serverResponseData = void 0;

	        evtSourceObj.socket = new EventSource(url);

	        evtSourceObj.socket.onopen = function (evt) {
	            evtSourceObj.isConnected = true;
	            // console.info('Add cluster node info...connection...open...');
	        };

	        evtSourceObj.socket.onmessage = function (message) {
	            serverResponseData = message.data;
	            callback(serverResponseData);
	        };

	        evtSourceObj.socket.onerror = function (evt) {
	            evtSourceObj.isConnected = false;
	            // console.info('Add cluster node info...connection...error...');
	            eofCallback(evt);
	        };

	        evtSourceObj.socket.onclose = function (evt) {
	            evtSourceObj.isConnected = false;
	            // console.info('Add cluster node info...connection...closed...');
	        };

	        return evtSourceObj;
	    }

	    function startClusterInitialiseEvtConnect(callback, eofCallback) {
	        var url = _constant.backendApi.HOR_K8S_SERVER_CONFIG + '/config/init';

	        var evtSourceObj = {};
	        evtSourceObj.isConnected = false;

	        if (!evtSourceObj.isConnected) {
	            evtSourceObj = genStartEvtConnect(url, callback, eofCallback, evtSourceObj);
	        } else {
	            return;
	        }

	        return evtSourceObj;
	    }

	    return serviceInstance;
	});


	function responseInterceptor($q, $location, $window, $injector) {
	    return {
	        'response': function response(res) {
	            var $mdToast = $injector.get('$mdToast');
	            var $cookies = $injector.get('$cookies');
	            var licenseValue = $cookies.getObject(_constant.HOR_LICENSE_COOKIES_KEY);
	            var licenseData = res.headers('license');
	            if (licenseData && licenseValue) {
	                $cookies.putObject(_constant.HOR_LICENSE_COOKIES_KEY, false);
	                $mdToast.show($mdToast.simple().textContent(licenseData).position('w300 danger').hideDelay(3000));
	            }

	            return res;
	        },
	        'responseError': function responseError(resErr) {
	            if (resErr.status === 406) {
	                var deferred = $q.defer();
	                deferred.reject(resErr);
	                var $mdDialog = $injector.get('$mdDialog');
	                var errStr = resErr.data.Error.toString();

	                $mdDialog.show($mdDialog.alert().clickOutsideToClose(true).title('System Information').textContent('Error message:' + errStr).ok('close'));
	                return {
	                    'request': function request(config) {
	                        return $q.reject("reason"); // 不让请求继续执行，调用$q服务的reject()方法，返回拒绝的promise，相当拒绝请求
	                    }
	                };
	            }

	            if (resErr.status === 403) {
	                var _$mdDialog = $injector.get('$mdDialog');
	                var $http = $injector.get('$http');
	                var $state = $injector.get('$state');

	                _$mdDialog.show({
	                    controller: function DialogController($mdDialog) {
	                        this.obj = {
	                            name: ''
	                        };
	                        this.onLoad = function (instance) {
	                            instance.expandAll();
	                        };

	                        this.answer = function (licenseName) {
	                            var obj = {
	                                param: licenseName.toString()
	                            };
	                            $mdDialog.hide(obj);
	                        };

	                        // this.cancel = function() {
	                        //     $mdDialog.cancel();
	                        //     let deferred = $q.defer();
	                        //     let url = $location.absUrl();
	                        //     let index = url.search(/\/([^/]+html|#)/);
	                        //     $window.location = `${url.slice(0, index)}/${HOR_LOGIN_PAGE}`;
	                        //     deferred.reject(resErr);
	                        //     return deferred;
	                        // }
	                    },
	                    controllerAs: '$ctrl',
	                    templateUrl: 'clusterinitialise/binding_template.html',
	                    parent: angular.element(document.body),
	                    targetEvent: event,
	                    clickOutsideToClose: false,
	                    resolve: {}
	                }).then(function (obj) {
	                    return $http({
	                        url: _constant.backendApi.HOR_K8S_SERVER_CONFIG + '/license/license-secret',
	                        method: 'POST',
	                        data: obj.param
	                    });
	                }).then(function (data) {
	                    $state.go('.', {}, {
	                        reload: true });
	                }, function (reason) {});

	                return {
	                    'request': function request(config) {
	                        return $q.reject("reason"); // 不让请求继续执行，调用$q服务的reject()方法，返回拒绝的promise，相当拒绝请求
	                    }
	                };
	            }
	        }
	    };
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @项目名称: Neunn HOR UI
	 * @Copyright: 2017-2018 www.neunn.com All rights reserved.
	 * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	 */

	/**
	 * login page name
	 * @type {String}
	 */
	var HOR_LOGIN_PAGE = exports.HOR_LOGIN_PAGE = 'login.html';

	var HOR_CLUSTERINITIALISE_PAGE = exports.HOR_CLUSTERINITIALISE_PAGE = 'clusterinitialise.html';

	// 新版本API
	var HOR_K8S_SERVER_URL_NEW = exports.HOR_K8S_SERVER_URL_NEW = HOR_K8S_SERVER_URL_GLOBAL_NEW;

	// PROMETHEUS接口地址
	var HOR_K8S_PROMETHEUS_URL = exports.HOR_K8S_PROMETHEUS_URL = HOR_K8S_PROMETHEUS_URL_GLOBAL;

	// 集群初始化接口访问地址
	var HOR_K8S_SERVER_CONFIG_URL = exports.HOR_K8S_SERVER_CONFIG_URL = HOR_K8S_SERVER_CONFIG_URL_GLOBAL;

	/**
	 * K8S Service api port
	 */
	var HOR_k8S_SERVER_PORT = exports.HOR_k8S_SERVER_PORT = HOR_k8S_SERVER_PORT_GLOBAL;

	var HOR_K8S_SERVER_HELM_PORT = exports.HOR_K8S_SERVER_HELM_PORT = HOR_K8S_SERVER_HELM_PORT_GLOBAL;

	var HOR_K8S_SERVER_LOG_PORT = exports.HOR_K8S_SERVER_LOG_PORT = HOR_K8S_SERVER_LOG_PORT_GLOBAL;

	var HOR_K8S_SERVER_BROKER_PORT = exports.HOR_K8S_SERVER_BROKER_PORT = HOR_K8S_SERVER_BROKER_PORT_GLOBAL;

	var HOR_K8S_EXTENSION_PORT = exports.HOR_K8S_EXTENSION_PORT = HOR_K8S_EXTENSION_PORT_GLOBAL;

	var HOR_K8S_PROMETHEUS_PORT = exports.HOR_K8S_PROMETHEUS_PORT = HOR_K8S_PROMETHEUS_PORT_GLOBAL;

	var HOR_K8S_CALICO_PORT = exports.HOR_K8S_CALICO_PORT = HOR_K8S_CALICO_PORT_GLOBAL;

	var HOR_K8S_SERVER_TRAEFIK_PORT = exports.HOR_K8S_SERVER_TRAEFIK_PORT = HOR_K8S_SERVER_TRAEFIK_PORT_GLOBAL;

	//license
	var HOR_K8S_SERVER_LICENSE_PORT = exports.HOR_K8S_SERVER_LICENSE_PORT = HOR_K8S_SERVER_LICENSE_PORT_GLOBAL;
	//镜像仓库
	var HOR_K8S_SERVER_IMAGE_PORT = exports.HOR_K8S_SERVER_IMAGE_PORT = HOR_K8S_SERVER_IMAGE_PORT_GLOBAL;
	var REGISTRY_ADDRESS = exports.REGISTRY_ADDRESS = HOR_K8S_REGISTRY_ADDRESS_GLOBAL;
	/**
	 * K8S Service api version
	 * @type {String}
	 */
	var HOR_k8S_SERVER_VERSION = exports.HOR_k8S_SERVER_VERSION = HOR_k8S_SERVER_VERSION_GLOBAL;

	var HOR_k8S_SERVER_BROKER_VERSION = exports.HOR_k8S_SERVER_BROKER_VERSION = HOR_k8S_SERVER_BROKER_VERSION_GLOBAL;

	//CICD
	var HOR_K8S_CICD_URL = exports.HOR_K8S_CICD_URL = HOR_K8S_CICD_URL_GLOBAL_NEW;
	var HOR_K8S_CICD_PORT = exports.HOR_K8S_CICD_PORT = HOR_K8S_CICD_PORT_GLOBAL;
	var HOR_K8S_CICD_WS = exports.HOR_K8S_CICD_WS = HOR_K8S_CICD_URL_WS;
	var HOR_K8S_CICD_BADGES_PORT = exports.HOR_K8S_CICD_BADGES_PORT = HOR_K8S_CICD_PORT_BADGES;
	var HOR_K8S_CICD_URL_BADGES = exports.HOR_K8S_CICD_URL_BADGES = HOR_K8S_CICD_URL_BADGES_NEW;

	var HOR_K8S_CICD_TOKEN = exports.HOR_K8S_CICD_TOKEN = HOR_K8S_CICD_TOKEN_GLOBAL;

	/**
	 * user cookies key
	 * @type {String}
	 */
	var HOR_USER_COOKIES_KEY = exports.HOR_USER_COOKIES_KEY = 'horuser';
	var HOR_ACCESS_COOKIES_KEY = exports.HOR_ACCESS_COOKIES_KEY = 'access';
	var HOR_LICENSE_COOKIES_KEY = exports.HOR_LICENSE_COOKIES_KEY = 'license';

	/**
	 * HOR version
	 * @type {String}
	 */
	var HOR_VERSION_NO = exports.HOR_VERSION_NO = HOR_VERSION_NO_GLOBAL;
	var HOR_VERSION = exports.HOR_VERSION = '\u79FB\u52A8PaaS ' + HOR_VERSION_NO;

	/**
	 * K8S Service api
	 * @type {Object}
	 */
	var backendApi = exports.backendApi = {
	    HOR_K8S_SERVER: HOR_K8S_SERVER_URL_NEW + ':' + HOR_k8S_SERVER_PORT + HOR_k8S_SERVER_VERSION,
	    HOR_K8S_SERVER_HELM: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_SERVER_HELM_PORT + HOR_k8S_SERVER_VERSION,

	    //服务管理
	    HOR_K8S_SERVER_BROKER: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_SERVER_BROKER_PORT + HOR_k8S_SERVER_BROKER_VERSION,

	    //监控管理
	    HOR_K8S_PROMETHEUS: HOR_K8S_PROMETHEUS_URL + ':' + HOR_K8S_PROMETHEUS_PORT + HOR_k8S_SERVER_VERSION,

	    //日志管理
	    HOR_K8S_LOGS: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_SERVER_LOG_PORT + HOR_k8S_SERVER_VERSION_GLOBAL,

	    //EXTENSION 管理接口
	    HOR_K8S_EXTENSION: HOR_K8S_SERVER_URL_NEW + ':' + HOR_k8S_SERVER_PORT + HOR_k8S_SERVER_VERSION_GLOBAL,

	    HOR_K8S_EXTENSION_URL: HOR_K8S_SERVER_URL_NEW + ':' + HOR_k8S_SERVER_PORT,

	    //告警控制
	    HOR_K8S_ALARM: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_PROMETHEUS_PORT + HOR_k8S_SERVER_VERSION,

	    //CICD
	    HOR_K8S_CICD: HOR_K8S_CICD_URL + ':' + HOR_K8S_CICD_PORT + HOR_k8S_SERVER_VERSION,
	    HOR_K8S_CICD_BADGES: HOR_K8S_CICD_URL_BADGES + ':' + HOR_K8S_CICD_BADGES_PORT + HOR_k8S_SERVER_VERSION,
	    //CICD数据监控
	    HOR_K8S_CICD_FOLLOW: HOR_K8S_CICD_WS + ':' + HOR_K8S_CICD_PORT + HOR_k8S_SERVER_VERSION,

	    //负载均衡
	    HOR_K8S_TRAEFIKS: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_SERVER_TRAEFIK_PORT + HOR_k8S_SERVER_VERSION,

	    //license
	    HOR_K8S_LICENSE: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_SERVER_LICENSE_PORT + HOR_k8S_SERVER_VERSION,

	    // 拓扑图
	    HOR_K8S_CALICO: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_CALICO_PORT + HOR_k8S_SERVER_VERSION,

	    // 集群初始化、添加节点、销毁集群
	    HOR_K8S_SERVER_CONFIG: HOR_K8S_SERVER_CONFIG_URL + ':' + HOR_k8S_SERVER_PORT + HOR_k8S_SERVER_VERSION,
	    //镜像仓库
	    HOR_K8S_IMAGE: HOR_K8S_SERVER_URL_NEW + ':' + HOR_K8S_SERVER_IMAGE_PORT + HOR_k8S_SERVER_VERSION
	};

	/** hor kind name */
	var HOR_KIND_NAME = exports.HOR_KIND_NAME = ['kind: Service', 'kind: ConfigMap', 'kind: PersistentVolume', 'kind: PersistentVolumeClaim', 'kind: StatefulSet', 'kind: DaemonSet', 'kind: Deployment', 'kind: Ingress', 'kind: Job', 'kind: Namespace', 'kind: Pod', 'kind: ReplicaSet', 'kind: ReplicationController', 'kind: Secret', 'kind: Node', 'kind: HorizontalPodAutoscaler'];

	/** hor kind name and state */
	var HOR_KIND_NAME_STATE = exports.HOR_KIND_NAME_STATE = [{
	    name: 'Service',
	    state: 'service'
	}, {
	    name: 'ConfigMap',
	    state: 'configmaps'
	}, {
	    name: 'PersistentVolume',
	    state: 'persistentvolume'
	}, {
	    name: 'PersistentVolumeClaim',
	    state: 'persistentvolumeclaim'
	}, {
	    name: 'StatefulSet',
	    state: 'statefulset'
	}, {
	    name: 'DaemonSet',
	    state: 'daemonset'
	}, {
	    name: 'Deployment',
	    state: 'deployment'
	}, {
	    name: 'Ingress',
	    state: 'ingress'
	}, {
	    name: 'Job',
	    state: 'job'
	}, {
	    name: 'Namespace',
	    state: 'namespace'
	}, {
	    name: 'Pod',
	    state: 'pod'
	}, {
	    name: 'ReplicaSet',
	    state: 'replicaset'
	}, {
	    name: 'ReplicationController',
	    state: 'replicationcontrollers'
	}, {
	    name: 'Secret',
	    state: 'secret'
	}, {
	    name: 'Node',
	    state: 'node'
	}, {
	    name: 'HorizontalPodAutoscaler',
	    state: 'horizontalpodautoscalser'
	}];

	var HOR_KIND_DETAIL_STATE = exports.HOR_KIND_DETAIL_STATE = [{
	    name: 'ReplicaSet',
	    state: 'replicasetdetail'
	}, {
	    name: 'ReplicationController',
	    state: 'replicationcontrollerdetail'
	}, {
	    name: 'DaemonSet',
	    state: 'daemonsetdetail'
	}, {
	    name: 'StatefulSet',
	    state: 'statefulsetdetail'
	}, {
	    name: 'Pod',
	    state: 'poddetail'
	}, {
	    name: 'Service',
	    state: 'servicedetail'
	}, {
	    name: 'Secret',
	    state: 'secretdetail'
	}, {
	    name: 'Deployment',
	    state: 'deploymentdetail'
	}, {

	    name: 'HorizontalPodAutoscaler',
	    state: 'horizontalpodautoscalserdetail'

	}, {

	    name: 'PersistentVolume',
	    state: 'persistentvolumedetail'

	}, {

	    name: 'PersistentVolumeClaim',
	    state: 'persistentvolumeclaimdetail'

	}];

	var CHART_TYPE_TAG = exports.CHART_TYPE_TAG = [{
	    key: 'database',
	    label: 'Database',
	    check: false
	}, {
	    key: 'cache',
	    label: 'Cache',
	    check: false
	}, {
	    key: 'message queue',
	    label: 'MessageQueue',
	    check: false
	}, {
	    key: 'cluster',
	    label: 'Cluster',
	    check: false
	}, {
	    key: 'servicebroker',
	    label: 'Service Broker',
	    check: false
	}, {
	    key: 'middleware',
	    label: 'Middleware',
	    check: false
	}, {
	    key: 'storage',
	    label: 'Storage',
	    check: false
	}, {
	    key: 'keyvalue',
	    label: 'Key/Value',
	    check: false
	}];

	var README_REGEX_STR = exports.README_REGEX_STR = '{i18n{.*}i18n}';
	var README_REGEX_PREFIX = exports.README_REGEX_PREFIX = '{i18n{';
	var README_REGEX_SUFFIX = exports.README_REGEX_SUFFIX = '}i18n}';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @项目名称: Neunn HOR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date: 2018/2/3
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author: tianh@neunn.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Copyright: 2016-2018 www.neunn.com All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _constant = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EtcdNodeSettingController = function () {
	    function EtcdNodeSettingController($http, $rootScope, $mdDialog, $state, base64) {
	        _classCallCheck(this, EtcdNodeSettingController);

	        this._http = $http;

	        this._state = $state;

	        this._base64 = base64;

	        this._dialog = $mdDialog;

	        this.etcdObjArr = [{
	            hostName: '',
	            hostIp: '',
	            userName: '',
	            userPassword: '',
	            testConnectionRunning: false,
	            testConnectionResultSuccess: false,
	            testConnectionResultError: false
	        }];

	        this._rootScope = $rootScope;

	        // this.testConnectionRunning = false;
	        // this.testConnectionResultSuccess = false;
	        // this.testConnectionResultError = false;

	        this.continueDisabled = true;
	    }

	    _createClass(EtcdNodeSettingController, [{
	        key: 'addNode',
	        value: function addNode() {
	            var obj = {
	                hostName: '',
	                hostIp: '',
	                userName: '',
	                userPassword: ''
	            };

	            this.etcdObjArr.push(obj);
	            this.continueDisabled = true;
	        }
	    }, {
	        key: 'deleteNode',
	        value: function deleteNode(index) {
	            this.etcdObjArr.splice(index, 1);
	        }
	    }, {
	        key: 'nextStep',
	        value: function nextStep() {
	            var _this = this;

	            var etcdSettingsObj = {
	                group: 'etcd-machine',
	                hosts: []
	            };

	            this.etcdObjArr.forEach(function (e) {
	                var base64Str = '',
	                    cipherCodeName = '';

	                if (e.cipherCode) {
	                    base64Str = _this._base64.encode(e.cipherCode.content);
	                    cipherCodeName = e.cipherCode.name;
	                }

	                var sshPort = '';

	                if (e.sshPort) {
	                    sshPort = e.sshPort.toString();
	                }

	                var o = {
	                    config: {
	                        ansible_ssh_private_key_file: base64Str,
	                        ansible_ssh_private_key_file_name: cipherCodeName,
	                        ansible_ssh_user: e.userName,
	                        ansible_ssh_host: e.hostIp,
	                        ansible_ssh_pass: e.userPassword,
	                        ansible_ssh_port: sshPort
	                    },
	                    host: e.hostName
	                };
	                etcdSettingsObj.hosts.push(o);
	            });

	            this._rootScope.etcdSettingsObj = etcdSettingsObj;
	            this._state.go('clusterMasterSetting', {}, { reload: true });
	        }
	    }, {
	        key: 'inputChanged',
	        value: function inputChanged(index) {
	            this.continueDisabled = true;
	            this.etcdObjArr[index].testConnectionResultSuccess = false;
	            this.etcdObjArr[index].testConnectionResultError = false;
	        }
	    }, {
	        key: 'connectionTest',
	        value: function connectionTest(etcdObj, index) {
	            var self = this;
	            self.etcdObjArr[index].testConnectionRunning = true;

	            var url = _constant.backendApi.HOR_K8S_SERVER_CONFIG + '/config/ping';

	            var base64Str = '',
	                cipherCodeName = '';

	            if (etcdObj.cipherCode) {
	                base64Str = this._base64.encode(etcdObj.cipherCode.content);
	                cipherCodeName = etcdObj.cipherCode.name;
	            }

	            var sshPort = '';

	            if (etcdObj.sshPort) {
	                sshPort = etcdObj.sshPort.toString();
	            }

	            var etcdSettings = {
	                config: {
	                    ansible_ssh_private_key_file: base64Str,
	                    ansible_ssh_private_key_file_name: cipherCodeName,
	                    ansible_ssh_user: etcdObj.userName,
	                    ansible_ssh_host: etcdObj.hostIp,
	                    ansible_ssh_pass: etcdObj.userPassword,
	                    ansible_ssh_port: sshPort
	                },
	                host: etcdObj.hostName
	            };

	            return this._http({
	                url: url,
	                method: 'POST',
	                data: etcdSettings
	            }).then(function (data) {
	                console.log(data);
	                if (data && data.status == 200 && data.data.ping == 'success') {
	                    self.etcdObjArr[index].testConnectionRunning = false;
	                    self.etcdObjArr[index].testConnectionResultSuccess = true;
	                    self.etcdObjArr[index].testConnectionResultError = false;
	                    self.continueDisabled = false;
	                    self.etcdObjArr.forEach(function (e) {
	                        if (!e.testConnectionResultSuccess) {
	                            self.continueDisabled = true;
	                        }
	                    });
	                }

	                if (data == undefined) {
	                    self.etcdObjArr[index].testConnectionRunning = false;
	                    self.etcdObjArr[index].testConnectionResultSuccess = false;
	                    self.etcdObjArr[index].testConnectionResultError = true;
	                }
	            }, function (reason) {
	                console.info(reason);
	                if (reason.status == 500) {
	                    self._dialog.show(self._dialog.alert().clickOutsideToClose(true).title('Connection Test Error').textContent(reason.data.Error).ok('Yes')).then(function (d) {});
	                }

	                self.etcdObjArr[index].testConnectionRunning = false;
	                self.etcdObjArr[index].testConnectionResultSuccess = false;
	                self.etcdObjArr[index].testConnectionResultError = true;
	            });
	        }
	    }]);

	    return EtcdNodeSettingController;
	}();

	// {
	//   "group": "etcd-machine",
	//   "hosts": [
	//     {
	//       "config": {
	//         "ansible_ssh_private_key_file": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcWdJQkFBS0NBUUVBMWh0YkpHN0dMTmgyYVFXb0dIbktQMDBQRmkrVWZDS2tlOFBDZWU3bkJNUnFlbUpMCjgwZ0V3cGZTaThQcE1UYWxaUUVxcVRTdG94NHdQSW1ZMTFHZmR0TVZCai94ZklWMVJOQm92WmR2Q2kxc29FZGwKYXB0bWpVWGZocFRxTGN5SllTME5lYkgzblErTHNHdld6Z3Vpb2RZTks2WFBGSWR6MHY1N2F4NUtCTkV3Z2M4RwprWWtmNnA3dUplYUJ3K0R1VjZFRzY5YjAzbzZhekMyVzBxUEhRb3R4ZEMvMVZhN0Q2T3JFL01CWG9NQjZrTlRICkQ2WjdRY05VbnlTd2M0UnczY3BDbFpYWk1CcC9tanA5cWlkYURCYXJiY2ozSUhDMnR3bEJST29RS1lnZXlWVzkKSFllOFBucmhWMWNDbEFxQURjOGZKM0ZHQzBTMlVhYjd0U1Rxa3dJREFRQUJBb0lCQVFERUZ1M1VZamZTSHJYagozYkJrS2piVzNzWndkVWN5b2ErdlFreTh5OVo5QVQ3YnMyY0grdStSSU9kTjVqR09SeFFYZTRnTXpCZ3pDcFQyCi9MWWtqYmJVWnVJY2hUZXY2YkxMUVd5TUowTWxPUkVCZ2lJYUR4VlBVYTAwWHZKUzI3NytadnF1ZUJYbG5MVTgKOEtjY3NuOVNaTzVQQ1Y2czJKbDFwbWgyWkprNTZvZjRxdGY4NjJJd1F2WlJNM2pFbFRVaTlrVGhpd0Z3emZoQgpxQ0hneXBwTnRrc0k0UjlPMWpSTlQyY0NoeFFVVnV4K043MWVjMjR5WU1scUtlMVRDZ1FkZm5nTjN6K28zUnBMCjltTElBV1hlNTZnc0RLdXRvMlRtdDJ2UzZlN2VWTXhjelNvcy9RY3dDTUhQUEpMbFZ4TmlqeHcyTFltTTZJYzYKeGlVSHFwZ2hBb0lBZ1FEbk11SWJiWkgwL281eEN4V3JWNXJvcEVheXlsdWNLdG1aOWZQNVFKYTFsTGJYR0ZpNgpVb0dDa0luUTZGLzhjb083VDE3R0tQbFNyR0dlRmZydDdJZHFJY2xnQzZiNVFmeHd4bXZOQ2VwZk1JQnloZkNvCmZTc1NLSXIwSm5Bb2twdXUwS3pqUEtMVXNpYkNhOVM1SVhIR01DK0VLOU81alQzWXJ1b1czQm1XS3dLQ0FJRUEKN1JNWmd2cXFPSEdyQ1ZjenRob05ETnRSdzlXcWRHSWdiWnRvV3IvZFh6djcyeFM1UjdqN3JtNTdVOVRhQUxxUwphOEhXN093cW5BZzZhazVLV3lEcEJKNzVBVU5kbmFpVGIrZTBsOGFaQjZiYTV5VVdsbDN4UnRvUjBnQk1IN3YyCmtYejdiWWIwZnpnZVgyUXF4RFRKYmkveVJMSEE0Yzg3Nmg1TThjRTg4VGtDZ2dDQkFLajFZSlFXMFBHd0RqekMKa3dWeXNqeU53VFRyK1dMNVZhalVPNFhPRTlXRFp0TnVjWGxJem1peVpHVU5UUWhhVDdiVlhEZUl2aHdTNmd2egptRHZEL1hvc1V0UWo3OVI4eXBWSURJUDlXUkJUaTZzbUF5ZSt3WGsxczhhVlNLWDk3bFFsSUJPNHZtNmQrd0ZlCmVFa0xEZkIrU2x0WEJCVzRDSmlQeTNjRlJwV2RBb0lBZ1FEYzBIZG9xZlUyVVpsUFArdW9aNmRVSEV1U0xrZHYKMDU0RXVVVi9rVW10MUg4SFZjd2xZOFQ0ZVd0aGI5WUY2OEZKb09pQkVJKzNlV3AvYmFDUU5KMFZjc1RYU2xtOQo2VEE2Z1FTU2dhWXpuRlEwQ3pWNHBOT0FmTWt3WXBxRXpGd2lzdGkwOFloMW5sMmIxLzZGZGUxUU5sUmZhM2tPCldpbWlMTXJhT25SNjhRS0NBSUF3RkgwdldHTUZHL2E2SWo2Si9rQmdQbHZ3WW5NejE5MUFQb1NFVHVrZ3ZZVWYKQmkxWVRWS2x5TDc4QkUrYmhtNXN4eDZvSlBrT0FjdFZ1dm9MUTJSU09nSUhjQVRhTlNZdHRvTDR2YndkdnRnTgp3bG5FWUpha0FRbVp2SXdKcjIrTWRtSTRXUWc4bVJ3eW8rc0ZEZytmZlNudThtOXdZUjRqRko3b052clE1UT09Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==",
	//         "ansible_ssh_private_key_file_name": "admin.pem",
	//         "ansible_ssh_user": "centos",
	//         "ansible_ssh_host": "",
	//         "ansible_ssh_pass": "",
	//         "ansible_ssh_port": 22
	//       },
	//       "host": "10.25.0.148"
	//     },
	//     {
	//       "config": {
	//         "ansible_ssh_private_key_file": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcWdJQkFBS0NBUUVBMWh0YkpHN0dMTmgyYVFXb0dIbktQMDBQRmkrVWZDS2tlOFBDZWU3bkJNUnFlbUpMCjgwZ0V3cGZTaThQcE1UYWxaUUVxcVRTdG94NHdQSW1ZMTFHZmR0TVZCai94ZklWMVJOQm92WmR2Q2kxc29FZGwKYXB0bWpVWGZocFRxTGN5SllTME5lYkgzblErTHNHdld6Z3Vpb2RZTks2WFBGSWR6MHY1N2F4NUtCTkV3Z2M4RwprWWtmNnA3dUplYUJ3K0R1VjZFRzY5YjAzbzZhekMyVzBxUEhRb3R4ZEMvMVZhN0Q2T3JFL01CWG9NQjZrTlRICkQ2WjdRY05VbnlTd2M0UnczY3BDbFpYWk1CcC9tanA5cWlkYURCYXJiY2ozSUhDMnR3bEJST29RS1lnZXlWVzkKSFllOFBucmhWMWNDbEFxQURjOGZKM0ZHQzBTMlVhYjd0U1Rxa3dJREFRQUJBb0lCQVFERUZ1M1VZamZTSHJYagozYkJrS2piVzNzWndkVWN5b2ErdlFreTh5OVo5QVQ3YnMyY0grdStSSU9kTjVqR09SeFFYZTRnTXpCZ3pDcFQyCi9MWWtqYmJVWnVJY2hUZXY2YkxMUVd5TUowTWxPUkVCZ2lJYUR4VlBVYTAwWHZKUzI3NytadnF1ZUJYbG5MVTgKOEtjY3NuOVNaTzVQQ1Y2czJKbDFwbWgyWkprNTZvZjRxdGY4NjJJd1F2WlJNM2pFbFRVaTlrVGhpd0Z3emZoQgpxQ0hneXBwTnRrc0k0UjlPMWpSTlQyY0NoeFFVVnV4K043MWVjMjR5WU1scUtlMVRDZ1FkZm5nTjN6K28zUnBMCjltTElBV1hlNTZnc0RLdXRvMlRtdDJ2UzZlN2VWTXhjelNvcy9RY3dDTUhQUEpMbFZ4TmlqeHcyTFltTTZJYzYKeGlVSHFwZ2hBb0lBZ1FEbk11SWJiWkgwL281eEN4V3JWNXJvcEVheXlsdWNLdG1aOWZQNVFKYTFsTGJYR0ZpNgpVb0dDa0luUTZGLzhjb083VDE3R0tQbFNyR0dlRmZydDdJZHFJY2xnQzZiNVFmeHd4bXZOQ2VwZk1JQnloZkNvCmZTc1NLSXIwSm5Bb2twdXUwS3pqUEtMVXNpYkNhOVM1SVhIR01DK0VLOU81alQzWXJ1b1czQm1XS3dLQ0FJRUEKN1JNWmd2cXFPSEdyQ1ZjenRob05ETnRSdzlXcWRHSWdiWnRvV3IvZFh6djcyeFM1UjdqN3JtNTdVOVRhQUxxUwphOEhXN093cW5BZzZhazVLV3lEcEJKNzVBVU5kbmFpVGIrZTBsOGFaQjZiYTV5VVdsbDN4UnRvUjBnQk1IN3YyCmtYejdiWWIwZnpnZVgyUXF4RFRKYmkveVJMSEE0Yzg3Nmg1TThjRTg4VGtDZ2dDQkFLajFZSlFXMFBHd0RqekMKa3dWeXNqeU53VFRyK1dMNVZhalVPNFhPRTlXRFp0TnVjWGxJem1peVpHVU5UUWhhVDdiVlhEZUl2aHdTNmd2egptRHZEL1hvc1V0UWo3OVI4eXBWSURJUDlXUkJUaTZzbUF5ZSt3WGsxczhhVlNLWDk3bFFsSUJPNHZtNmQrd0ZlCmVFa0xEZkIrU2x0WEJCVzRDSmlQeTNjRlJwV2RBb0lBZ1FEYzBIZG9xZlUyVVpsUFArdW9aNmRVSEV1U0xrZHYKMDU0RXVVVi9rVW10MUg4SFZjd2xZOFQ0ZVd0aGI5WUY2OEZKb09pQkVJKzNlV3AvYmFDUU5KMFZjc1RYU2xtOQo2VEE2Z1FTU2dhWXpuRlEwQ3pWNHBOT0FmTWt3WXBxRXpGd2lzdGkwOFloMW5sMmIxLzZGZGUxUU5sUmZhM2tPCldpbWlMTXJhT25SNjhRS0NBSUF3RkgwdldHTUZHL2E2SWo2Si9rQmdQbHZ3WW5NejE5MUFQb1NFVHVrZ3ZZVWYKQmkxWVRWS2x5TDc4QkUrYmhtNXN4eDZvSlBrT0FjdFZ1dm9MUTJSU09nSUhjQVRhTlNZdHRvTDR2YndkdnRnTgp3bG5FWUpha0FRbVp2SXdKcjIrTWRtSTRXUWc4bVJ3eW8rc0ZEZytmZlNudThtOXdZUjRqRko3b052clE1UT09Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==",
	//         "ansible_ssh_private_key_file_name": "admin.pem",
	//         "ansible_ssh_user": "centos"
	//       },
	//       "host": "10.25.0.158"
	//     }
	//   ]
	// }
	// 
	// 
	// 初始化集群可以使用的服务器，用户名centos，秘钥是附件的文件。

	// 10.25.0.148
	// 10.25.0.158 


	exports.default = EtcdNodeSettingController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @项目名称: Neunn HOR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date: 2018/2/3
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author: tianh@neunn.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Copyright: 2016-2018 www.neunn.com All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _constant = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClusterMasterSettingController = function () {
	    function ClusterMasterSettingController($http, $rootScope, $mdDialog, $state, base64) {
	        _classCallCheck(this, ClusterMasterSettingController);

	        this._http = $http;

	        this._state = $state;

	        this._base64 = base64;

	        this._dialog = $mdDialog;

	        this.clusterMasterObjArr = [{
	            hostName: '',
	            hostIp: '',
	            userName: '',
	            userPassword: ''
	        }];

	        this._rootScope = $rootScope;

	        this.testConnectionRunning = false;
	        this.testConnectionResultSuccess = false;
	        this.testConnectionResultError = false;

	        this.continueDisabled = true;
	    }

	    _createClass(ClusterMasterSettingController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            var _this = this;

	            if (!this._rootScope.etcdSettingsObj) {
	                this._dialog.show(this._dialog.alert().clickOutsideToClose(true).title('Cluster initialise data error').textContent('Will go to the first page of cluster initialise steps').ok('Yes')).then(function (d) {
	                    console.log(d);
	                    _this._state.go('etcdNodeSetting', {}, { reload: true });
	                });
	            }
	        }
	    }, {
	        key: 'addNode',
	        value: function addNode() {
	            var obj = {
	                hostName: '',
	                hostIp: '',
	                userName: '',
	                userPassword: ''
	            };

	            this.clusterMasterObjArr.push(obj);
	        }
	    }, {
	        key: 'deleteNode',
	        value: function deleteNode(index) {
	            this.clusterMasterObjArr.splice(index, 1);
	        }
	    }, {
	        key: 'nextStep',
	        value: function nextStep() {
	            var _this2 = this;

	            var clusterMasterSettingObj = {
	                group: 'master-machine',
	                hosts: []
	            };

	            this.clusterMasterObjArr.forEach(function (e) {
	                var base64Str = '',
	                    cipherCodeName = '';

	                if (e.cipherCode) {
	                    base64Str = _this2._base64.encode(e.cipherCode.content);
	                    cipherCodeName = e.cipherCode.name;
	                }

	                var sshPort = '';

	                if (e.sshPort) {
	                    sshPort = e.sshPort.toString();
	                }

	                var o = {
	                    config: {
	                        ansible_ssh_private_key_file: base64Str,
	                        ansible_ssh_private_key_file_name: cipherCodeName,
	                        ansible_ssh_user: e.userName,
	                        ansible_ssh_host: e.hostIp,
	                        ansible_ssh_pass: e.userPassword,
	                        ansible_ssh_port: sshPort
	                    },
	                    host: e.hostName
	                };
	                clusterMasterSettingObj.hosts.push(o);
	            });

	            console.log(clusterMasterSettingObj);

	            this._rootScope.clusterMasterSettingObj = clusterMasterSettingObj;
	            this._state.go('clusterNodeSetting', {}, { reload: true });
	        }
	    }, {
	        key: 'inputChanged',
	        value: function inputChanged() {
	            this.testConnectionResultSuccess = false;
	            this.testConnectionResultError = false;
	            this.continueDisabled = true;
	        }
	    }, {
	        key: 'connectionTest',
	        value: function connectionTest(clusterMasterObj) {
	            var _this3 = this;

	            this.testConnectionRunning = true;

	            var url = _constant.backendApi.HOR_K8S_SERVER_CONFIG + '/config/ping';

	            var base64Str = '',
	                cipherCodeName = '';

	            if (clusterMasterObj.cipherCode) {
	                base64Str = this._base64.encode(clusterMasterObj.cipherCode.content);
	                cipherCodeName = clusterMasterObj.cipherCode.name;
	            }

	            var sshPort = '';

	            if (clusterMasterObj.sshPort) {
	                sshPort = clusterMasterObj.sshPort.toString();
	            }

	            var etcdSettings = {
	                config: {
	                    ansible_ssh_private_key_file: base64Str,
	                    ansible_ssh_private_key_file_name: cipherCodeName,
	                    ansible_ssh_user: clusterMasterObj.userName,
	                    ansible_ssh_host: clusterMasterObj.hostIp,
	                    ansible_ssh_pass: clusterMasterObj.userPassword,
	                    ansible_ssh_port: sshPort
	                },
	                host: clusterMasterObj.hostName
	            };

	            // JSON.stringify(etcdSettings)

	            return this._http({
	                url: url,
	                method: 'POST',
	                data: etcdSettings
	            }).then(function (data) {
	                if (data && data.status == 200 && data.data.ping == 'success') {
	                    _this3.testConnectionRunning = false;
	                    _this3.testConnectionResultSuccess = true;
	                    _this3.testConnectionResultError = false;
	                    _this3.continueDisabled = false;
	                }

	                if (data == undefined) {
	                    _this3.testConnectionRunning = false;
	                    _this3.testConnectionResultSuccess = false;
	                    _this3.testConnectionResultError = true;
	                    _this3.continueDisabled = true;
	                }
	            }, function (reason) {
	                console.info(reason);
	                if (reason.status == 500) {
	                    self._dialog.show(self._dialog.alert().clickOutsideToClose(true).title('Connection Test Error').textContent(reason.data.Error).ok('Yes')).then(function (d) {});
	                }

	                _this3.testConnectionRunning = false;
	                _this3.testConnectionResultSuccess = false;
	                _this3.testConnectionResultError = true;
	                _this3.continueDisabled = true;
	            });
	        }
	    }]);

	    return ClusterMasterSettingController;
	}();

	exports.default = ClusterMasterSettingController;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @项目名称: Neunn HOR
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date: 2018/2/3
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author: tianh@neunn.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Copyright: 2016-2018 www.neunn.com All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _constant = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClusterNodeSettingController = function () {
	    function ClusterNodeSettingController($http, $rootScope, $state, $mdDialog, $window, $location, base64, horClusterInitialiseEvtConnect) {
	        _classCallCheck(this, ClusterNodeSettingController);

	        this._http = $http;

	        this._state = $state;

	        this._base64 = base64;

	        this._dialog = $mdDialog;

	        this._window = $window;

	        this._location = $location;

	        this._horClusterInitialiseEvtConnect = horClusterInitialiseEvtConnect;

	        this.clusterNodeObjArr = [{
	            hostName: '',
	            hostIp: '',
	            userName: '',
	            userPassword: '',
	            testConnectionRunning: false,
	            testConnectionResultSuccess: false,
	            testConnectionResultError: false
	        }];

	        this._rootScope = $rootScope;

	        this.continueDisabled = true;
	    }

	    _createClass(ClusterNodeSettingController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            var _this = this;

	            if (!this._rootScope.etcdSettingsObj || !this._rootScope.clusterMasterSettingObj) {
	                this._dialog.show(this._dialog.alert().clickOutsideToClose(true).title('Cluster initialise data error').textContent('Will go to the first page of cluster initialise steps').ok('Yes')).then(function (d) {
	                    console.log(d);
	                    _this._state.go('etcdNodeSetting', {}, { reload: true });
	                });
	            }
	        }
	    }, {
	        key: 'addNode',
	        value: function addNode() {
	            var obj = {
	                hostName: '',
	                hostIp: '',
	                userName: '',
	                userPassword: ''
	            };

	            this.clusterNodeObjArr.push(obj);
	            this.continueDisabled = true;
	        }
	    }, {
	        key: 'deleteNode',
	        value: function deleteNode(index) {
	            this.clusterNodeObjArr.splice(index, 1);
	        }
	    }, {
	        key: 'createCluster',
	        value: function createCluster() {
	            var _this2 = this;

	            var self = this;

	            var clusterNodeSettingObj = {
	                group: 'node-machine',
	                hosts: []
	            };

	            self.clusterNodeObjArr.forEach(function (e) {
	                var base64Str = '',
	                    cipherCodeName = '';

	                if (e.cipherCode) {
	                    base64Str = _this2._base64.encode(e.cipherCode.content);
	                    cipherCodeName = e.cipherCode.name;
	                }

	                var sshPort = '';

	                if (e.sshPort) {
	                    sshPort = e.sshPort.toString();
	                }

	                var o = {
	                    config: {
	                        ansible_ssh_private_key_file: base64Str,
	                        ansible_ssh_private_key_file_name: cipherCodeName,
	                        ansible_ssh_user: e.userName,
	                        ansible_ssh_host: e.hostIp,
	                        ansible_ssh_pass: e.userPassword,
	                        ansible_ssh_port: sshPort
	                    },
	                    host: e.hostName
	                };
	                clusterNodeSettingObj.hosts.push(o);
	            });

	            if (self._rootScope.etcdSettingsObj && self._rootScope.clusterMasterSettingObj) {
	                var params = [self._rootScope.etcdSettingsObj, self._rootScope.clusterMasterSettingObj, clusterNodeSettingObj];

	                self._dialog.show({
	                    controller: function DialogController($mdDialog, $scope, base64) {
	                        var _this4 = this;

	                        var url = _constant.backendApi.HOR_K8S_SERVER_CONFIG + '/config/init';

	                        this._scope = $scope;
	                        this._base64 = base64;
	                        this.logArr = [];
	                        this.processState = true;
	                        this.closeBtnDisabled = true;

	                        this.showProcessVisable = false;

	                        this.hide = function () {
	                            $mdDialog.cancel();
	                        };

	                        this.processToggle = function () {
	                            this.showProcessVisable = !this.showProcessVisable;
	                        };

	                        this.infoCb = function (data) {
	                            var _this3 = this;

	                            this._scope.$apply(function () {
	                                if (data != '') {
	                                    var decodeData = _this3._base64.decode(data);
	                                    _this3.logArr.push(decodeData);
	                                }
	                            });
	                        };

	                        this.infoEofCb = function (evt) {
	                            if (evt.data == 'eof') {
	                                this.processState = false;
	                                this.closeBtnDisabled = false;
	                            }
	                        };

	                        self._http({
	                            url: url,
	                            method: 'POST',
	                            data: params
	                        }).then(function (data) {
	                            console.log(data);
	                            self._horClusterInitialiseEvtConnect.startClusterInitialiseEvtConnect(_this4.infoCb.bind(_this4), _this4.infoEofCb.bind(_this4));
	                        }, function (reason) {
	                            console.log(reason);
	                        });
	                    },
	                    controllerAs: '$ctrl',
	                    templateUrl: 'clusterinitialise/dialog_template.html',
	                    parent: angular.element(document.body),
	                    targetEvent: event,
	                    clickOutsideToClose: false
	                    // locals: {
	                    //     'nodeData': nodeObj
	                    // }
	                }).then(function (data) {
	                    console.log(data);
	                }, function (reason) {
	                    console.log(reason);
	                    if (_constant.HOR_K8S_SERVER_URL_NEW == '') {
	                        var url = self._location.absUrl();
	                        var index = url.search(/\/([^/]+html|#)/);
	                        self._window.location = url.slice(0, index) + '/' + _constant.HOR_LOGIN_PAGE;
	                    } else {
	                        self._window.location = _constant.HOR_K8S_SERVER_URL_NEW + '/' + _constant.HOR_LOGIN_PAGE;
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'inputChanged',
	        value: function inputChanged(index) {
	            this.continueDisabled = true;
	            this.clusterNodeObjArr[index].testConnectionResultSuccess = false;
	            this.clusterNodeObjArr[index].testConnectionResultError = false;
	        }
	    }, {
	        key: 'connectionTest',
	        value: function connectionTest(clusterNodeObj, index) {
	            var self = this;
	            self.clusterNodeObjArr[index].testConnectionRunning = true;

	            var url = _constant.backendApi.HOR_K8S_SERVER_CONFIG + '/config/ping';

	            var base64Str = '',
	                cipherCodeName = '';

	            if (clusterNodeObj.cipherCode) {
	                base64Str = this._base64.encode(clusterNodeObj.cipherCode.content);
	                cipherCodeName = clusterNodeObj.cipherCode.name;
	            }

	            var sshPort = '';

	            if (clusterNodeObj.sshPort) {
	                sshPort = clusterNodeObj.sshPort.toString();
	            }

	            var clusterNodeSettingObj = {
	                config: {
	                    ansible_ssh_private_key_file: base64Str,
	                    ansible_ssh_private_key_file_name: cipherCodeName,
	                    ansible_ssh_user: clusterNodeObj.userName,
	                    ansible_ssh_host: clusterNodeObj.hostIp,
	                    ansible_ssh_pass: clusterNodeObj.userPassword,
	                    ansible_ssh_port: sshPort
	                },
	                host: clusterNodeObj.hostName
	            };

	            // JSON.stringify(clusterNodeSettingObj)

	            return this._http({
	                url: url,
	                method: 'POST',
	                data: clusterNodeSettingObj
	            }).then(function (data) {
	                if (data && data.status == 200 && data.data.ping == 'success') {
	                    self.clusterNodeObjArr[index].testConnectionRunning = false;
	                    self.clusterNodeObjArr[index].testConnectionResultSuccess = true;
	                    self.clusterNodeObjArr[index].testConnectionResultError = false;
	                    self.continueDisabled = false;
	                    self.clusterNodeObjArr.forEach(function (e) {
	                        if (!e.testConnectionResultSuccess) {
	                            self.continueDisabled = true;
	                        }
	                    });
	                }

	                if (data == undefined) {
	                    self.clusterNodeObjArr[index].testConnectionRunning = false;
	                    self.clusterNodeObjArr[index].testConnectionResultSuccess = false;
	                    self.clusterNodeObjArr[index].testConnectionResultError = true;
	                }
	            }, function (reason) {
	                console.info(reason);
	                if (reason.status == 500) {
	                    self._dialog.show(self._dialog.alert().clickOutsideToClose(true).title('Connection Test Error').textContent(reason.data.Error).ok('Yes')).then(function (d) {});
	                }

	                self.clusterNodeObjArr[index].testConnectionRunning = false;
	                self.clusterNodeObjArr[index].testConnectionResultSuccess = false;
	                self.clusterNodeObjArr[index].testConnectionResultError = true;
	            });
	        }
	    }]);

	    return ClusterNodeSettingController;
	}();

	exports.default = ClusterNodeSettingController;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = fileReaderDirective;
	/**
	 * @项目名称: Neunn HOR
	 * @Date: 2017/4/20
	 * @author: cuijx@neunn.com
	 * @Copyright: 2016-2017 www.neunn.com All rights reserved.
	 * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	 */
	function fileReaderDirective($log) {
	    

	    return {
	        restrict: 'A',
	        require: ['^horUpload', 'ngModel'],
	        link: function link(scope, element, attrs, ctrls) {
	            /** @type {./upload_controller.UploadController} */
	            var uploadController = ctrls[0];
	            uploadController.registerBrowseFileFunction(function () {
	                return element[0].click();
	            });

	            element.bind('change', function (changeEvent) {
	                /** @type {?File} */
	                var file = changeEvent.target.files[0];
	                if (!file) {
	                    $log.error('Error invalid file: ', file);
	                    return;
	                }
	                var reader = new FileReader();
	                reader.onload = function (event) {
	                    /** @type {!angular.NgModelController} */
	                    var ngModelController = ctrls[1];
	                    ngModelController.$setViewValue({ name: file.name, content: event.target.result });
	                    //console.log('file content,', event.target.result);
	                };
	                reader.onerror = function (error) {
	                    return $log.error('Error reading file:', error);
	                };
	                reader.readAsText(file);
	            });
	        }
	    };
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = uploadDirective;

	var _upload_controller = __webpack_require__(7);

	function uploadDirective() {
	    return {
	        scope: {},
	        bindToController: {
	            'file': '=',
	            'form': '='
	        },
	        controller: _upload_controller.UploadController,
	        controllerAs: '$ctrl',
	        templateUrl: 'clusterinitialise/upload.html'
	    };
	} /**
	   * @项目名称: Neunn HOR
	   * @Date: 2017/4/20
	   * @author: cuijx@neunn.com
	   * @Copyright: 2016-2017 www.neunn.com All rights reserved.
	   * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	   */

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @项目名称: Neunn HOR
	 * @Date: 2017/4/20
	 * @author: cuijx@neunn.com
	 * @Copyright: 2016-2017 www.neunn.com All rights reserved.
	 * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	 */
	var UploadController = exports.UploadController = function () {
	    function UploadController($scope) {
	        _classCallCheck(this, UploadController);

	        this.isBrowseFileFuncRegistered_ = false;

	        this.browseFileFunc_;

	        this.form;

	        //当前位置刷新锁定
	        this._scope = $scope;
	        this._scope.$emit('currentNav', { mainNav: 'Establish' });
	    }

	    _createClass(UploadController, [{
	        key: 'registerBrowseFileFunction',
	        value: function registerBrowseFileFunction(func) {
	            if (this.isBrowseFileFuncRegistered_) {
	                return;
	            }
	            this.browseFileFunc_ = func;
	            this.isBrowseFileFuncRegistered_ = true;
	        }
	    }, {
	        key: 'browseFile',
	        value: function browseFile() {
	            if (this.browseFileFunc_) {
	                this.browseFileFunc_();
	            }
	        }
	    }, {
	        key: 'isFileNameError',
	        value: function isFileNameError() {
	            /** @type {!angular.NgModelController} */
	            var fileName = this.form['fileName'];
	            return this.form.$submitted && fileName.$invalid;
	        }
	    }]);

	    return UploadController;
	}();

/***/ })
/******/ ]);