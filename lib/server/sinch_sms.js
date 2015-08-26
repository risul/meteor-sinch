Sinch.SMS = {
    send: function(to, message, from) {
        var data = {message: message};
        if (from) data.from = from;

        //to = to.replace(/[-\s\(\)]/gi, ''); // Remove possible irrelevant characters

        var options = {
            method: "POST",
            host: "messagingapi.sinch.com",
            port: 443,
            path: "/v1/sms/" + to,
            data: JSON.stringify(data)
        };

        return Sinch.callRestAPI(options);
    },

    getStatus: function (messageId) {
        var options = {
            method: "GET",
            host: "messagingapi.sinch.com",
            port: 443,
            path: "/v1/message/status/" + messageId
        };

        return Sinch.callRestAPI(options);
    }
};