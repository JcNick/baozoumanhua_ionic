'use strict';

/* Services */

var httpResource = angular.module('ionicApp.services',['ngResource']);
httpResource.factory('blData',function($q,$resource){
    const API = 'http://192.168.1.129:3000';
    var blResource = function(type,params) {
        let requestUrl = API+"/home/v1/"+type;
        return $resource(requestUrl,{id:'@id'},{
            'query': {
                method: 'GET',
                params:params
            }});

    };
    var blResource2 = function(type) {
        let requestUrl = API+"/home/v1/"+type;
        return $resource(requestUrl,{id:'@id'},{
            'postForm': {
                method: 'POST'
            }});

    };
    return {
        query:function(type,params){
            var defer = $q.defer();
            blResource(type,params).query(function(data){
                defer.resolve(data);
            },function(data){
                defer.reject(data);
            });
            return defer.promise
        },
        postForm:function(type,params){
            var defer = $q.defer();
            blResource2(type).postForm(params,function(data){
                defer.resolve(data);
            },function(data){
                defer.reject(data);
            });
            return defer.promise
        }
    };



});


