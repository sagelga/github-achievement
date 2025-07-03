// src/workers/shared/remote-proxy-client.worker.ts
import { WorkerEntrypoint } from "cloudflare:workers";
var Client = class extends WorkerEntrypoint {
  async fetch(request) {
    let proxiedHeaders = new Headers();
    for (let [name, value] of request.headers)
      name === "upgrade" || name.startsWith("MF-") ? proxiedHeaders.set(name, value) : proxiedHeaders.set(`MF-Header-${name}`, value);
    proxiedHeaders.set("MF-URL", request.url), proxiedHeaders.set("MF-Binding", this.env.binding);
    let req = new Request(request, {
      headers: proxiedHeaders
    });
    return fetch(this.env.remoteProxyConnectionString, req);
  }
};
export {
  Client as default
};
//# sourceMappingURL=remote-proxy-client.worker.js.map
