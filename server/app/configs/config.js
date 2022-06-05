module.exports = {
	discord: {
		token: process.env.BOT_TOKEN || "",
		guild_id: process.env.GUILD_ID || "",
		client_id: process.env.CLIENT_ID || "",
	},
	frontend: { url: process.env.FRONTEND_URL || "" },

	// mongodb
	database: {
		URL: process.env.MONGODB || "",
	},

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
