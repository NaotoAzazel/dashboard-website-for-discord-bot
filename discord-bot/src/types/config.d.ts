type ContentConfig = {
  events: string;
  commands: string;
};

interface RequiredConfig {
  content: ContentConfig;
}

export type Config = RequiredConfig;
