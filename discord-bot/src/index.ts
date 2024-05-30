import { ConfigService } from "./config/config.service";
import { CustomClient } from "./classes/client/client.class";

new CustomClient(new ConfigService()).init();
