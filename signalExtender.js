var _ = require('underscore')

exports.register = function (flux) {
	var node = flux.createNode('Me', 'Extender');
	node.addFunction('SendAll', function (cb) {
		_.each(_.values(flux.loader.signals), function (signal) {
			if (signal.name === "signalSetup.is")
				return;
			cb(signal.plain, signal.name);
		});
	});

	var onListen = function () { };
	node.addFunction('Listen', function (cb) {
		onListen = function (ev, sig, name) {
			cb(ev, sig, name);
		};
	});
	var l = flux.loader;
	l.on('loaded', function (signal) {
		if (signal.name === "signalSetup.is")
			return;
		onListen('loaded', signal.plain, signal.name);
	});
	l.on('removed', function (signal) {
		if (signal.name === "signalSetup.is")
			return;
		onListen('removed', signal.plain, signal.name);
	});
};
