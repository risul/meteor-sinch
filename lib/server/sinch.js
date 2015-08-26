var sinchTicketGen = Npm.require('sinch-ticketgen');
var sinchRequest = Npm.require('sinch-request');

Sinch = {
    options: {
        appKey: process.env.SINCH_APPKEY || Meteor.settings.sinch.appKey,
        appSecret: process.env.SINCH_APP_SECRET || Meteor.settings.sinch.appSecret
    },

    getSinchUserToken: function (user, timestamp) {
        var token;

        if (timestamp) token = sinchTicketGen(this.options.appKey, this.options.appSecret, {username: user}, timestamp);
        else token = sinchTicketGen(this.options.appKey, this.options.appSecret, {username: user});

        return token;
    },

    callRestAPI: function(options, callback) {
        //we need to sign the header before we can call Sinch's REST API
        sinchRequest.applicationSigned(options, {key: this.options.appKey, secret: this.options.appSecret});

        var url, data = {};

        if (options.data) data.data = JSON.parse(options.data);
        if (options.headers) data.headers = options.headers;

        if (options.port === 443) url = "https://" + options.host + options.path;
        else url = "http://" + options.host + options.path;

        if (!!callback) HTTP.call(options.method, url, data, callback);
        else return HTTP.call(options.method, url, data);
    }
};

//hack to set appkey on client
Meteor.settings.public.SinchAppKey = Sinch.options.appKey;