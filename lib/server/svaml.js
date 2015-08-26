SVAML = function() {
    this.svaml = {};
};

SVAML.prototype._addInstruction = function (instruction) {
    var instr = this.svaml.Instructions;
    if (!instr) instr = [];

    instr.push(instruction);
    this.svaml.Instructions = instr;
};

SVAML.prototype.PlayFiles = function (ids, locale) {
    if (typeof ids == 'string' || ids instanceof String) {
        var files = [];

        if (ids.indexOf(";") > -1) {
            ids = ids.split(";");

            _.each(ids, function(item) {
                files.push(item);
            });

        } else files.push(ids);
    }

    else {
        // assuming we have received an one dimensional array
        // an array check should be implemented here
        files = ids;
    }

    if (!locale) locale = "en-US";

    this._addInstruction({ name: "PlayFiles", ids: files, locale: locale });
};

SVAML.prototype.Say = function (message, locale) {
    if (!locale) locale = "en-US";

    this._addInstruction({ name: "Say", text: message, locale: locale });
};

SVAML.prototype.Hangup = function(svaml) {
    this.svaml.Action = {  name: "Hangup" };
},

SVAML.prototype.Continue = function() {
    this.svaml.Action = {  name: "Continue" };
};

SVAML.prototype.ConnectPSTN = function(number, cli, maxDuration, locale) {
    if (!maxDuration) maxDuration = 600; //10 minutes
    if (!locale) locale = "en-US";
    if (!cli) cli = "private"; //CLI means who/which number is calling

    var action = {
        name: "ConnectPSTN",
        number : number,
        maxDuration : maxDuration,
        cli : cli,
        suppressCallbacks : false, /*if set to true, no callbacks will get sent from sinch to our webhook*/
        locale : locale
    };

    this.svaml.Action = action;
};

SVAML.prototype.ConnectMXP = function() {
    this.svaml.Action = {  name: "ConnectMXP" };
};

SVAML.prototype.ConnectConf = function(conferenceId) {
    this.svaml.Action = { name: "ConnectConf", conferenceId: conferenceId };
};