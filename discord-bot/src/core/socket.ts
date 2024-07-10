import { io } from "socket.io-client";
import { ConfigService } from "../config/config.service";

const config = new ConfigService();
const socket = io(config.get("BASE_URL"));

export default socket;
