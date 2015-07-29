sinch = {
    options: {},

    config: function (options) {
        var instance = this;
        instance.options.appKey = options["appKey"];
        instance.options.appSecret = options["appSecret"];
    },

    getAuthToken: function (user) {
        var sinchTicketGen = Npm.require('sinch-ticketgen');
        var token = sinchTicketGen(instance.options.appKey, instance.options.appSecret, {username: user})

        return token;
    }
};