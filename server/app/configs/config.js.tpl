module.exports = {
	discord: {
		token: process.env.BOT_TOKEN || "1234:asdfghjkl",
		guild_id: process.env.GUILD_ID || "3232",
	    client_id: process.env.CLIENT_ID || "3232",
	},
	frontend: { url: process.env.FRONTEND_URL || "http://localhost:3006" },

	

	// mongodb
	database: { URL: process.env.MONGODB || "mongodb://localhost:27017/mongourl" },

	// Debug
	debug: process.env.DEBUG || true,

	// LOGS
	logger: {
		path: {
			debug_log: "./logs/debug.log",
			error_log: "./logs/errors.log",
		},
		language: "en",
		colors: true,
		debug: process.env.LOGGER || "enabled",
		info: process.env.LOGGER || "enabled",
		warning: process.env.LOGGER || "enabled",
		error: process.env.LOGGER || "enabled",
		sponsor: process.env.LOGGER || "enabled",
		write: process.env.LOGGER_WRITE || false,
		type: "log",
	},
};
