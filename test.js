const apps = require('./apps.json')

for (const app of apps) {
  if(!app['都道府県名'] || !app['地域名'] || !app['サブドメイン']　|| !app['GitHub']) {
    throw new Error('不足しているパラメータがあります。')
  }
}

process.stdout.write('success!')
