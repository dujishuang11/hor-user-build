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

	var EngineController = function () {
	    EngineController.$inject = ['$resource', '$cookies', '$location', '$window'];
	    function EngineController($resource, $cookies, $location, $window) {
	        

	        _classCallCheck(this, EngineController);

	        this._resource = $resource;
	        this._cookies = $cookies;
	        this._location = $location;
	        this._window = $window;
	    }

	    /**
	     * 跳转到index页面
	     */


	    _createClass(EngineController, [{
	        key: 'goIndex',
	        value: function goIndex() {
	            // 临时处理：加访问次数
	            var access = {
	                count: 1
	            };
	            this._cookies.putObject(_constant.HOR_ACCESS_COOKIES_KEY, access);

	            var urls = /(.+\/)(.+.html)/.exec(this._location.absUrl());
	            this._window.location = '' + urls[1];
	        }

	        /**
	         * 返回登录页面
	         */

	    }, {
	        key: 'goLogin',
	        value: function goLogin() {
	            //console.log('goLogin...');
	            var urls = /(.+\/)(.+.html)/.exec(this._location.absUrl());
	            this._window.location = urls[1] + 'login.html';
	        }
	    }]);

	    return EngineController;
	}();

	exports.default = angular.module('horEngineApp', ['ngResource', 'ngCookies']).controller('EngineController', EngineController);

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