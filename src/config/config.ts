import fs from "fs";
import path from "path";

interface Config {
  proxies: { server: string; ip: string }[];
  userAgents: string[];
  cooldownDuration: number;
  proxyCredentials: { username: string; password: string };
  rotationThreshold: number;
  maxRetries: number;
  loggerLevel: string;
}

export function getConfig(): Config {
  // Attempt to parse the proxies and user agents from environment variables
  const proxies = JSON.parse(process.env.IPS_JSON || "[]");
  const userAgents = JSON.parse(process.env.USER_AGENTS_JSON || "[]");

  // Fallback to files if environment variables are not set
  if (proxies.length === 0) {
    const ipsFilePath = path.resolve(__dirname, "./ips.json");
    const ipsFile = fs.readFileSync(ipsFilePath, "utf-8");
    proxies.push(...JSON.parse(ipsFile).proxies);
  }

  if (userAgents.length === 0) {
    const userAgentsFilePath = path.resolve(__dirname, "./userAgents.json");
    const userAgentsFile = fs.readFileSync(userAgentsFilePath, "utf-8");
    userAgents.push(...JSON.parse(userAgentsFile).userAgents);
  }

  return {
    proxies,
    userAgents,
    cooldownDuration: Number(process.env.COOLDOWN_DURATION) || 30000,
    proxyCredentials: {
      username: process.env.PROXY_USERNAME || "",
      password: process.env.PROXY_PASSWORD || "",
    },
    rotationThreshold: Number(process.env.ROTATION_THRESHOLD) || 5,
    maxRetries: Number(process.env.MAX_RETRIES) || 3,
    loggerLevel: process.env.LOG_LEVEL || "info",
  };
}
