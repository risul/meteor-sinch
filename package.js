Package.describe({
    name: 'risul:sinch',
    summary: 'Metoer package for Sinch API',
    version: '0.0.2',
    git: 'https://github.com/risul/meteor-sinch'
});

Npm.depends({
    "sinch-ticketgen": "0.0.6",
    "sinch-request": "0.0.6"
});

Package.on_use(function (api) {
    api.versionsFrom('METEOR@1.0');
    api.export('Sinch');
    api.add_files(['lib/server/sinch.js', 'lib/server/sinch_calls.js', 'lib/server/sinch_sms.js', 'lib/server/svaml.js'], 'server');
    api.add_files('lib/client/sinch.min.js', 'client');
});