// Cloudflare Worker - HP to HP Control
// FREE PLAN FRIENDLY

let lastCommand = "";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ================= SEND COMMAND =================
    // contoh: /send?cmd=FLASH_ON
    if (url.pathname === "/send") {
      lastCommand = url.searchParams.get("cmd") || "";
      return new Response("OK", {
        headers: { "Content-Type": "text/plain" }
      });
    }

    // ================= POLL COMMAND =================
    // target device call setiap 1-2 detik
    if (url.pathname === "/poll") {
      const cmd = lastCommand;
      lastCommand = ""; // clear setelah diambil
      return new Response(cmd, {
        headers: { "Content-Type": "text/plain" }
      });
    }

    // ================= DEFAULT =================
    return new Response("READY", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
