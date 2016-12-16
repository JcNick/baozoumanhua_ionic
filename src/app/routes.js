'use strict';
angular.module('ionicApp.routes', ['linkenHomeApp.controllers'])
    .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tabs.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })
            .state('tabs.chat', {
                url: "/chat",
                views: {
                    'chat-tab': {
                        templateUrl: "templates/chat.html"
                    }
                }
            })
            .state('tabs.story', {
                url: "/story",
                views: {
                    'story-tab': {
                        templateUrl: "templates/story.html",
                        controller: "StoryCtrl"
                    }
                }
            })
            .state('tabs.storyDetails', {
                url: "/storyDetails/:id",
                views: {
                    'story-tab': {
                        templateUrl: "templates/storyDetails.html",
                        controller: "StoryDetailsCtrl"
                    }
                }
            })
            .state('tabs.my', {
                url: "/my",
                views: {
                    'my-tab': {
                        templateUrl: "templates/my.html",
                        controller: "myCtrl"
                    }
                }
            })
            .state('tabs.mywork', {
                url: "/mywork",
                views: {
                    'my-tab': {
                        templateUrl: "templates/mywork.html",
                        controller: "myCtrl"
                    }
                }
            })
            .state('tabs.mychannel', {
                url: "/mychannel",
                views: {
                    'my-tab': {
                        templateUrl: "templates/mychannel.html",
                        controller: "myCtrl"
                    }
                }
            })
            .state('tabs.mycollect', {
                url: "/mycollect",
                views: {
                    'my-tab': {
                        templateUrl: "templates/mycollect.html",
                        controller: "myCtrl"
                    }
                }
            })
            .state('tabs.myworkmessage', {
                url: "/myworkmessage",
                views: {
                    'my-tab': {
                        templateUrl: "templates/myworkmessage.html",
                        controller: "myCtrl"
                    }
                }
            })
            .state('tabs.mydownload', {
                url: "/mydownload",
                views: {
                    'my-tab': {
                        templateUrl: "templates/mydownload.html",
                        controller: "myCtrl"
                    }
                }
            })
            .state('tabs.about', {
                url: "/about",
                views: {
                    'my-tab': {
                        templateUrl: "templates/about.html"
                    }
                }
            })
            .state('tabs.system', {
                url: "/system",
                views: {
                    'my-tab': {
                        templateUrl: "templates/system.html",
                        controller: "myCtrl"
                    }
                }
            })

            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: "registerCtrl"
            });

        $urlRouterProvider.otherwise("/tab/home");
    });

