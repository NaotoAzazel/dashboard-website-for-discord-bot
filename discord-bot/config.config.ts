import { Config } from "./src/types/index";

const config = {
  content: {
    events: "src/events/**/*.js",
    commands: "src/commands/**/*.js",
  },
} satisfies Config;

export default config;
