import type { Config } from "./config.d";

type _Config = Config;

declare namespace plugin {
  export type { _Config as Config };
}

export = plugin;
