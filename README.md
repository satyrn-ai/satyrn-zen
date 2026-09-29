# satyrn-zen

**https://satyrn-ai.github.io/satyrn-zen/**

A place where we can learn, create, and share knowledge with the Satyrn.ai community.

![](docs/assets/screenshots/front-page.png)

We encourage you to share your knowledge, favorite resources, and experiments with the wider community.
We would like to curate materials for those just getting started to experts or anywhere in between.

## Contributing

This site uses pixi for package and task management and zensical for docs.

We welcome contributions. See our [CONTRIBUTING guide](CONTRIBUTING.md) to get started.

## Development

[Install pixi](https://pixi.prefix.dev/latest/installation/), then from the repo root:

```sh
pixi run dev
```

This installs the dependencies on first run and serves the site with live reload at <http://localhost:8001>.
To use another address, pass it along: `pixi run dev 0.0.0.0:9000`.

Use `pixi run dev` rather than `zensical serve` directly.
It serves from a generated `.zensical.serve.toml` whose `site_url` points at the local server, which instant navigation needs to work.
Because the server watches that copy, restart it after editing `zensical.toml`.

Other tasks:

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `pixi run build`    | Build the production site into `./site` (strict mode)    |
| `pixi run clean`    | Delete build output, caches and the generated dev config |
| `pixi run rebuild`  | Clean, then build, as CI would                           |
| `pixi task list`    | List all tasks                                           |

## About the project

Website: <https://satryn-ai.com>

Team-Compass: <https://github.com/satyrn-ai/team-compass> Teams and governance

Join us on Discord: <https://discord.gg/SPqgTXfgY>

