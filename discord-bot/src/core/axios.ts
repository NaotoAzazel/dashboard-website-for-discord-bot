import axios from "axios";
import { ConfigService } from "../config/config.service";

const config = new ConfigService();

axios.defaults.baseURL = config.get("BASE_URL");

export default axios;
