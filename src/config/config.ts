import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

type ProxyConfig = {
  server: string;
  ip: string;
};

type UserAgentConfig = string;

export const getConfig = () => {
  const isCI = process.env.CI === "true"; // Detect CI environment

  let proxies: ProxyConfig[] = [];
  let userAgents: UserAgentConfig[] = [];

  if (isCI) {
    // Load from environment variables in CI/CD
    proxies = JSON.parse(process.env.IPS_JSON || "[]");
    userAgents = JSON.parse(process.env.USER_AGENTS_JSON || "[]");
  } else {
    // Load from files locally
    const ipsPath = path.resolve(__dirname, "ips.json");
    const userAgentsPath = path.resolve(__dirname, "userAgents.json");

    proxies = JSON.parse(fs.readFileSync(ipsPath, "utf-8"))
      .proxies as ProxyConfig[];
    userAgents = JSON.parse(fs.readFileSync(userAgentsPath, "utf-8"))
      .userAgents as UserAgentConfig[];
  }

  return {
    proxies,
    userAgents,
    proxyCredentials: {
      username: process.env.PROXY_USERNAME || "",
      password: process.env.PROXY_PASSWORD || "",
    },
    loggerLevel: process.env.LOG_LEVEL || "info",
    cooldownDuration: parseInt(process.env.COOLDOWN_DURATION || "5000", 10),
    rotationThreshold: parseInt(process.env.ROTATION_THRESHOLD || "8", 10),
    maxRetries: parseInt(process.env.MAX_RETRIES || "1", 10),
  };
};
