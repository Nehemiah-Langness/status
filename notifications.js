self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("push", async function (event) {
  const data = event.data?.json() ?? {};
  console.log("Received a push message", data);

  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  const notifications = await self.registration.getNotifications();

  if (!data.doNotDisturb) {
    notifications.forEach((notification) => notification.close());
  } else if (!notifications.length) {
    const title = data.title ?? "Do Not Disturb";
    const body = data.body ?? "Nehemiah is currently in a meeting";
    const tag = "do-not-disturb";

    self.registration.showNotification(title, {
      body: body,
      icon: "/red.svg",
      badge: "/mask.svg",
      tag: tag,
      renotify: false,
      silent: false,
    });
  }
});
