const apps = require("../apps.json");

for (const app of apps) {
  if (
    !app["都道府県名"] ||
    !app["地域名"] ||
    !app["サブドメイン"] ||
    !app["CNAME"] ||
    !app["GitHub"]
  ) {
    throw new Error("不足しているパラメータがあります。");
  }

  const subdomain = app["サブドメイン"];
  if (
    subdomain[0] === "-" ||
    subdomain[subdomain.length - 1] === "-" ||
    subdomain.indexOf("--") !== -1 ||
    !/[a-z0-9-]{1,63}$/.test(subdomain)
  ) {
    throw new Error("このサブドメインは使用できません。");
  }
}

process.stdout.write("success!");
