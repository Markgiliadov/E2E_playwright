import { getConfig } from "../config/config";

class IPManager {
  private config = getConfig();
  private availableIPs = this.config.proxies;
  private cooldownIPs: { server: string; ip: string; releaseTime: number }[] =
    [];
  private cooldownDuration = this.config.cooldownDuration;

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getIP(): { server: string; ip: string } | null {
    const currentTime = Date.now();
    this.cooldownIPs = this.cooldownIPs.filter((ip) => {
      if (currentTime >= ip.releaseTime) {
        this.availableIPs.push({ server: ip.server, ip: ip.ip });
        return false;
      }
      return true;
    });

    this.shuffleArray(this.availableIPs);

    if (this.availableIPs.length === 0) {
      console.log("All IPs are in cooldown. Please wait.");
      return null;
    }

    const selectedIP = this.availableIPs.pop();
    if (!selectedIP) {
      return null;
    }

    this.cooldownIPs.push({
      server: selectedIP.server,
      ip: selectedIP.ip,
      releaseTime: currentTime + this.cooldownDuration,
    });

    console.log(`Selected IP: ${selectedIP?.ip}`);
    console.log(`Remaining IPs: ${this.availableIPs.length}`);
    return selectedIP;
  }
}

const ipManager = new IPManager();
export { ipManager };
