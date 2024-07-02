import { Config } from "./src/types/index";

const config = {
  content: {
    websocketEvents: "src/events/websocket/**/*.js",
    discordEvents: "src/events/discord/**/*.js",
    commands: "src/commands/**/*.js",
  },
} satisfies Config;

export default config;
