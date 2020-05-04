# Iemeshi Registry

このリポジトリでは、各地域のイエメシアプリのサブドメインを管理しています。

[kushimoto.iemeshi.jp](https://kushimoto.iemeshi.jp/) などのサブドメインが必要な方は、以下の要領でプルリクエストを送ってください。

プルリクエストがマージされると数分後に自動的にそのサブドメインが利用できるようになります。

## プルリクエストの送り方

以下の要領で、登録したいイエメシアプリの情報を `apps.json` に追加してください。

```
[
    {
        "都道府県名": "和歌山県",
        "市区町村名": "串本町",
        "サブドメイン": "kushimoto",
        "CNAME": "xxxx.netlify.app",
        "GitHub": "https://github.com/iemeshi/app",
    }
]
```

ご希望のサブドメイン名を割り当てられない可能性がございますのであらかじめご了承ください。

ご質問は、Issue にてどうぞ。

https://github.com/iemeshi/registry/issues
