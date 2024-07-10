type ContentConfig = {
  websocketEvents: string;
  discordEvents: string;
  commands: string;
};

interface RequiredConfig {
  content: ContentConfig;
}

export type Config = RequiredConfig;
