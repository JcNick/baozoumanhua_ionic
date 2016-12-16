'use strict';

/* Controllers */


angular.module('linkenHomeApp.controllers', ['ionic'])
    .controller('HomeCtrl', ['$scope', '$location', '$http', '$ionicModal', '$ionicLoading', '$rootScope','blData', ($scope, $location, $http, $ionicModal, $ionicLoading, $rootScope,blData) => {
        let pageIndex = $scope.pageIndex = 1;
        let pageIndexAll = 1,pagrIndexBaoman = 1,pageIndexQutu = 1,pageIndexVideo = 1,pageIndexText = 1;
        let pageSize = $scope.pageSize = 20;




        $ionicModal.fromTemplateUrl('templates/loginmodal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
             if(window.localStorage.getItem('username')){
                 $ionicLoading.show({
                     template: '尽请期待,火速开发中...'
                 });
                 setTimeout(function () {
                     $ionicLoading.hide();
                 }, 1000);
             }else{
                $rootScope.selfRegisterPath = '/tab/home';
                $("#password").val('');
                $scope.modal.show();
             }
        };

        var barList = [
            {text: '全部', topic_type: ''},
            {text: '暴漫', topic_type: 'baoman'},
            {text: '趣图', topic_type: 'qutu'},
            {text: '视频', topic_type: 'videos'},
            {text: '文字', topic_type: 'text'}
        ];

        $scope.barList = barList;
        $scope.topic_type = '';
        let getTopic = ()=> {
            $ionicLoading.show({
                templateUrl: 'templates/loading.html'
            });
            blData.query('getTopic',{topic_type:$scope.topic_type}).then(function(data){
                $scope.topicList = data.topicList;
                $ionicLoading.hide();
            });
        };

        getTopic();

        /**
         * 下拉加载
         */
        $scope.loadMore = ()=>{
            blData.query('getTopic',{topic_type:$scope.topic_type,pageIndex:pageIndex,pageSize:pageSize}).then(function(data){
                $scope.topicList = $scope.topicList.concat(data.topicList);
                moreIndex();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };

        /**
         * 上拉刷新
         */
        $scope.refreshTopic = ()=>{
            blData.query('getTopic',{topic_type:$scope.topic_type,pageIndex:pageIndex,pageSize:pageSize}).then(function(data){
                $scope.topicList = $scope.topicList.concat(data.topicList);
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.topic = function (topic_type, _this) {
            $scope.topic_type = topic_type;
            getTopic();
        };
        $scope.user = {};
        $scope.login = ()=> {
            loginFun('/tab/home', $scope, $http, $ionicLoading, $location,blData);
        };

        var moreIndex = ()=>{
            if($scope.topic_type == ''){
                pageIndexAll += 1;
                pageIndex = pageIndexAll;
            }else if($scope.topic_type == 'baoman'){
                pagrIndexBaoman += 1;
                pageIndex = pagrIndexBaoman;
            }else if($scope.topic_type == 'qutu'){
                pageIndexQutu += 1;
                pageIndex = pageIndexQutu;
            }else if($scope.topic_type == 'videos'){
                pageIndexVideo += 1;
                pageIndex = pageIndexVideo;
            }else if($scope.topic_type == 'text'){
                pageIndexText += 1;
                pageIndex = pageIndexText;
            }
        };


    }])
    .controller('StoryCtrl', ['$scope', '$location', '$http', '$ionicLoading','blData', ($scope, $location, $http, $ionicLoading,blData) => {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html'
        });

        let getStory = ()=>{
            blData.query('getStory').then(data=>{
                $scope.storyList = data.storyList;
                $ionicLoading.hide();
            });
        };

        getStory();

        $scope.refreshStory = ()=>{
            getStory();
            $scope.$broadcast('scroll.refreshComplete');
        };

    }])
    .controller('StoryDetailsCtrl', ['$scope', '$location', '$http', '$ionicModal', '$stateParams', '$ionicPopup', '$ionicLoading','blData', ($scope, $location, $http, $ionicModal, $stateParams, $ionicPopup, $ionicLoading,blData) => {
        var _id = $stateParams.id;
        $ionicLoading.show({
            templateUrl: 'templates/loading.html'
        });
        blData.query('getStoryDetails',{_id:_id}).then(data=>{
            if (data.success) {
                $scope.story = data.story;
                $ionicLoading.hide();
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '系统异常',
                    template: data.message
                });
            }
        });
    }])
    .controller('registerCtrl', ['$scope', '$location', '$http', '$ionicLoading', '$ionicModal', '$rootScope','blData', ($scope, $location, $http, $ionicLoading, $ionicModal, $rootScope,blData) => {
        $ionicModal.fromTemplateUrl('templates/loginmodal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.registerBack = ()=> {
            let selfRegisterPath = $rootScope.selfRegisterPath;
            $scope.modal.show();
            setTimeout(()=> {
                $location.path(selfRegisterPath);
            }, 500);
        };
        $scope.user = {};

        $scope.userRegister = ()=> {
            let selfRegisterPath = $rootScope.selfRegisterPath;
            if ($scope.checkEmailError.success == false) {
                $ionicLoading.show({
                    template: $scope.checkEmailError.message
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else if ($scope.checkUsernameError.success == false) {
                $ionicLoading.show({
                    template: $scope.checkUsernameError.message
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else if ($scope.checkPasswordError.success == false) {
                $ionicLoading.show({
                    template: $scope.checkPasswordError.message
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else if ($scope.checkPassword1Error.success == false && !$scope.user.password1) {
                $ionicLoading.show({
                    template: $scope.checkPassword1Error.message
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else if ($scope.user.password1 != $scope.user.password) {
                $ionicLoading.show({
                    template: '亲爱的,你2次输入的密码不一致.'
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else {
                blData.postForm('registerUser',$scope.user).then(data=>{
                    if (data.success) {
                        $ionicLoading.show({
                            template: data.message
                        });
                        setTimeout(function () {
                            $ionicLoading.hide();
                            $location.path(selfRegisterPath);
                        }, 1000);
                        window.localStorage.setItem('username', data.user.username);
                        window.localStorage.setItem('_id', data.user._id);
                    } else {
                        $ionicLoading.show({
                            template: data.message
                        });
                        setTimeout(function () {
                            $ionicLoading.hide();
                        }, 1000);
                    }
                });
            }
        };
        $scope.checkEmailError = {success: false, message: '亲爱的,请填个邮箱吧.'};
        $scope.checkEmail = ()=> {
            let error = '';
            let email = $scope.user.email;
            if (email) email = email.trim();
            if (!email) { //can be blank
                error = '亲爱的,请填个邮箱吧.';
                $ionicLoading.show({
                    template: error
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
                $scope.checkEmailError.message = error;
            } else if (!/^\w+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
                error = '亲爱的,你的邮箱格式有误.';
                $ionicLoading.show({
                    template: error
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
                $scope.checkEmailError.message = error;
            } else {
                blData.query('checkEmail',{email:$scope.user.email}).then(data=>{
                    if (!data.success) {
                        $ionicLoading.show({
                            template: data.message
                        });
                        setTimeout(function () {
                            $ionicLoading.hide();
                        }, 1000);
                        $scope.checkEmailError.message = data.message;
                    } else {
                        $scope.checkEmailError.success = true;
                    }
                });
            }
        };
        $scope.checkUsernameError = {success: false, message: '亲爱的,用户名不能为空哟.'};
        $scope.checkUsername = ()=> {
            let error = '';
            let username = $scope.user.username;
            if (username) username = username.trim();
            if (!username) {
                error = '亲爱的,用户名不能为空哟.';
                $ionicLoading.show({
                    template: error
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
                $scope.checkUsernameError.message = error;
            } else if (username.length > 20) {
                error = '亲爱的,用户名最长为20.';
                $ionicLoading.show({
                    template: error
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
                $scope.checkUsernameError.message = error;
            } else {
                blData.query('checkusername',{username:$scope.user.username}).then(data=>{
                    if (!data.success) {
                        $ionicLoading.show({
                            template: data.message
                        });
                        setTimeout(function () {
                            $ionicLoading.hide();
                        }, 1000);
                        $scope.checkUsernameError.message = data.message;
                    } else {
                        $scope.checkUsernameError.success = true;
                    }
                });
            }
        };
        $scope.checkPasswordError = {success: false, message: '亲爱的,密码不能为空哟.'};
        $scope.checkPassword = ()=> {
            let error = '';
            let password = $scope.user.password;
            if (password) password = password.trim();
            if (!password) {
                error = '亲爱的,密码不能为空哟.';
                $ionicLoading.show({
                    template: error
                });
                $scope.checkPasswordError.message = error;
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else if (password.length < 6) {
                error = '亲爱的,密码长度太短啦.';
                $ionicLoading.show({
                    template: error
                });
                $scope.checkPasswordError.message = error;
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else {
                $scope.checkPasswordError.success = true;
            }
        };
        $scope.checkPassword1Error = {success: false, message: '亲爱的,新密码不能为空哟.'};
        $scope.checkPassword1 = ()=> {
            let password1 = $scope.user.password1;
            let error = '';
            if (password1) password1 = password1.trim();
            if (!password1) {
                error = '亲爱的,新密码不能为空哟.';
                $ionicLoading.show({
                    template: error
                });
                $scope.checkPassword1Error.message = error;
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);

            } else if ($scope.user.password1 != $scope.user.password) {
                error = '亲爱的,你2次输入的密码不一致.';
                $ionicLoading.show({
                    template: error
                });
                $scope.checkPassword1Error.message = error;
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            } else {
                $scope.checkPassword1Error.success = true;
            }
        };
    }])
    .controller('myCtrl', ['$scope', '$location', '$http', '$ionicLoading', '$ionicModal', '$rootScope','blData', ($scope, $location, $http, $ionicLoading, $ionicModal, $rootScope,blData) => {
        $ionicModal.fromTemplateUrl('templates/loginmodal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        let username = window.localStorage.getItem('username');
        if (username) {
            $("#my-login").css('display', 'none');
            $("#my-username").css('display', 'block');
        } else {
            $("#my-username").css('display', 'none');
            $("#my-login").css('display', 'block');
        }
        if (username) {
            $scope.loginBtnTitle = '退出';
            $scope.loginBtnClass = 'button button-energized';
        } else {
            $scope.loginBtnTitle = '登录';
            $scope.loginBtnClass = 'button button-balanced';
        }
        $scope.checkAuth = (_path)=> {
            let username = window.localStorage.getItem('username');
            if (!username) {
                $scope.modal.show();
                $rootScope.selfRegisterPath = '/tab/my';
                setTimeout(()=> {
                    $location.path('/tab/my');
                }, 1000);
            } else {
                $location.path(_path);
            }
        };
        $scope.loginOrOut = ()=> {
            let username = window.localStorage.getItem('username');
            if (username) {
                $scope.loginBtnTitle = '退出';
                $scope.loginBtnClass = 'button button-energized';
                window.localStorage.setItem('username', '');
                window.localStorage.setItem('_id', '');
                $scope.modal.show();
                setTimeout(()=> {
                    $("#my-username").css('display', 'none');
                    $("#my-login").css('display', 'block');
                    $location.path('/tab/my');
                }, 1000);
            } else {
                $scope.loginBtnTitle = '登录';
                $scope.loginBtnClass = 'button button-balanced';
                $scope.modal.show();
            }
        };
        $scope.systemBack = ()=> {
            let username = window.localStorage.getItem('username');
            if (username) {
                $("#my-login").css('display', 'none');
                $("#my-username").css('display', 'block');
            } else {
                $("#my-username").css('display', 'none');
                $("#my-login").css('display', 'block');
            }
            $location.path('/tab/my');
        };

        $scope.goSystem = ()=> {
            $rootScope.selfRegisterPath = '/tab/my';
            checkLoginState();
            $location.path('/tab/system');
        };

        var checkLoginState = ()=> {
            let username = window.localStorage.getItem('username');
            if (username) {
                $scope.loginBtnTitle = '退出';
                $scope.loginBtnClass = 'button button-energized';
            } else {
                $scope.loginBtnTitle = '登录';
                $scope.loginBtnClass = 'button button-balanced';
            }
        };
        $scope.user = {};
        $scope.login = ()=> {
            loginFun('/tab/my', $scope, $http, $ionicLoading, $location,blData);
        };

        $scope.loginShow = ()=>{
            $scope.modal.show();
            $rootScope.selfRegisterPath = '/tab/my';
        }

    }]);


var loginFun = function (_path, $scope, $http, $ionicLoading, $location,blData) {
    let username = $scope.user.username;
    let password = $scope.user.password;
    if (!username || !password) {
        $ionicLoading.show({
            template: '用户名或密码为空'
        });
        setTimeout(function () {
            $ionicLoading.hide();
        }, 1000);
    } else {
        blData.postForm('login',{username: username, password: password}).then(data=>{
            if (data.success) {
                $ionicLoading.show({
                    template: data.message
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                    window.localStorage.setItem('username', data.user.username);
                    window.localStorage.setItem('_id', data.user._id);
                    $("#my-login").css('display', 'none');
                    $("#my-username").css('display', 'block');
                    $scope.modal.hide();
                    $location.path(_path);
                }, 1000);
            } else {
                $ionicLoading.show({
                    template: data.message
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            }
        });
    }
};









