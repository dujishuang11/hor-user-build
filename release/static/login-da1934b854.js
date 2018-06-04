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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @项目名称: Neunn HOR UI
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Copyright: 2017-2018 www.neunn.com All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 注意：本内容仅限于东网科技有限公司内部传阅，禁止外泄以及用于其他的商业目的
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _constant = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** 登录成功返回信息 */
	var LOGIN_SUCCESS = 'login success.';
	/** 平台首页 */
	var INDEX_PAGE = 'index.html';

	var LoginController = function () {

	    /**
	     * 登录构造函数
	     * @ngInject
	     * @author   wangxin
	     * @date     2017/4/1
	     */
	    function LoginController($resource, $cookies, $location, $window, base64) {
	        

	        _classCallCheck(this, LoginController);

	        this._resource = $resource;
	        this._cookies = $cookies;
	        this._location = $location;
	        this._window = $window;
	        this.horVersionNo = _constant.HOR_VERSION_NO;
	        this._base64 = base64;
	    }

	    _createClass(LoginController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            if (_constant.HOR_K8S_SERVER_URL_NEW == '') {
	                this._window.location = _constant.HOR_K8S_SERVER_URL_NEW + '/' + _constant.HOR_CLUSTERINITIALISE_PAGE;
	            }
	        }
	    }, {
	        key: 'changeName',
	        value: function changeName() {
	            this.serverError = '';
	        }
	    }, {
	        key: 'changePassword',
	        value: function changePassword() {
	            this.serverError = '';
	        }

	        /**
	         * 用户登录
	         *  1. 登录成功，获取token；
	         *  2. 把token，存在key为user的cookies中；
	         * @ngInject
	         * @author   wangxin
	         * @date     2017/4/1
	         */

	    }, {
	        key: 'loginSubmit',
	        value: function loginSubmit() {
	            var _this = this;

	            var UserPasswordBase64Str = this._base64.encode(this.user.password);
	            console.log('base64 encode password...', UserPasswordBase64Str);

	            // let apiUrl = `${backendApi.HOR_K8S_SERVER}/user/login?username=${this.user.name}&password=${this.user.password}`;
	            var apiUrl = _constant.backendApi.HOR_K8S_SERVER + '/user/login?username=' + this.user.name + '&password=' + UserPasswordBase64Str;
	            this._resource(apiUrl).get().$promise.then(function (data) {
	                if (data.message == LOGIN_SUCCESS) {
	                    var userId = data.id;
	                    var message = data.message;
	                    var role = data.role;
	                    var user = {
	                        userName: _this.user.name,
	                        token: data.token,
	                        userRole: role,
	                        userId: userId,
	                        message: message
	                    };
	                    // 存cookies
	                    _this._cookies.putObject(_constant.HOR_USER_COOKIES_KEY, user);
	                    _this._cookies.putObject(_constant.HOR_LICENSE_COOKIES_KEY, true);

	                    // 临时处理：加载访问次数。目的；跳过引擎页面；
	                    // var accessFlag = false;
	                    // let access = this._cookies.getObject(HOR_ACCESS_COOKIES_KEY) || {};
	                    // if (access != null && access.count != null && access.count == 1) {
	                    //     accessFlag = true;
	                    // } else {
	                    //     accessFlag = false;
	                    // }
	                    // 1. 请求用户和引擎绑定的api，查看是否已经绑定k8s引擎，
	                    //      如果绑定过，则跳转到index页面；
	                    //      如果没有绑定，那么跳转到engine页面中，选择编排引擎；
	                    // let apiUserAndEngineUrl = ``;
	                    // this._resource(apiUserAndEngineUrl).get().$promise.then((data) => {
	                    //     if (data.message == '绑定过') {
	                    //         // 页面跳转
	                    //         let urls = /(.+\/)(.+.html)/.exec(this._location.absUrl());
	                    //         this._window.location = `${urls[1]}`;  // 这里我做了修改 去掉了 index.html
	                    //     }
	                    //     // 没有绑定过
	                    //     else {
	                    //         //this._window.location
	                    //     }
	                    // });
	                    // if (accessFlag) {
	                    //     let urls = /(.+\/)(.+.html)/.exec(this._location.absUrl());
	                    //     this._window.location = `${urls[1]}`;
	                    // } else {
	                    //     let urls = /(.+\/)(.+.html)/.exec(this._location.absUrl());
	                    //     this._window.location = `${urls[1]}engine.html`;
	                    // }

	                    var urls = /(.+\/)(.+.html)/.exec(_this._location.absUrl());
	                    _this._window.location = '' + urls[1];
	                } else {
	                    _this.serverError = '用户名或密码错误';
	                }
	            });
	        }
	    }]);

	    return LoginController;
	}();

	exports.default = angular.module('horLoginApp', ['ngResource', 'ngCookies', 'ab-base64']).controller('LoginController', LoginController);
	//.factory('LoginService', LoginService);


	// function LoginService($resource) {
	//     return $resource('http://192.168.250.43:38000/v1/user/login').get(this.userParams).$promise;
	// }

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

/***/ })
/******/ ]);