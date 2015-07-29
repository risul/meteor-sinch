Package.describe({
    name: 'risul:sinch',
    summary: 'Metoer package for Sinch API',
    version: '0.0.1',
    git: 'https://github.com/risul/meteor-sinch'
});

Npm.depends({
    "sinch-ticketgen": '0.0.6',
    "sinch-request": '0.0.4',
    "sinch-sms": '0.0.4',
    "sinch-rtc": '1.3.2'
});

Package.on_use(function (api) {
    api.versionsFrom('METEOR@1.0');
    api.export('sinch');
    api.add_files('lib/sinch.js', 'server');
    api.addFiles('.npm/package/node_modules/sinch-rtc/sinch.min.js', ['client']);
});