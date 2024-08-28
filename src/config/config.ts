import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const getConfig = () => {
  const ipsPath = path.resolve(__dirname, "ips.json");
  const userAgentsPath = path.resolve(__dirname, "userAgents.json");

  const proxies = JSON.parse(fs.readFileSync(ipsPath, "utf-8")).proxies;
  const userAgents = JSON.parse(
    fs.readFileSync(userAgentsPath, "utf-8")
  ).userAgents;

  return {
    proxies,
    userAgents,
    proxyCredentials: {
      username: process.env.PROXY_USERNAME,
      password: process.env.PROXY_PASSWORD,
    },
    loggerLevel: process.env.LOG_LEVEL || "info",
    cooldownDuration: parseInt(process.env.COOLDOWN_DURATION || "30000", 10),
    rotationThreshold: parseInt(process.env.ROTATION_THRESHOLD || "5", 10),
    maxRetries: parseInt(process.env.MAX_RETRIES || "3", 10),
  };
};
