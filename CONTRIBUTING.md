# CONTRIBUTING

This site uses [pixi](https://pixi.prefix.dev/latest/) for package and task management, [zensical](https://zensical.org/) for documentation, and Markdown for content.

## Getting started

Clone this repo to your system.

## View the documentation from the source files

1. Enter `uvx zensical serve` into your terminal at the root of the repo.
2. Navigate your browser to <http://localhost:8001>.

## Contribute to the Satyrn Zen

1. Fork the repo.
2. Clone your fork to your system.
3. Add a git remote to this repo `git remote add upstream https://github.com/satyrn-ai/satyrn-zen.git`

### Run a development server locally

1. [Install pixi](https://pixi.prefix.dev/latest/installation/)
2. From the repo's root, enter following into your terminal.

```sh
pixi run dev
```

This will build an interactive, development web server.

3.  Navigate your browser to <http://localhost:8001>.

To serve on another address, pass it along, e.g. `pixi run dev 0.0.0.0:9000`.
Changes to `zensical.toml` need a server restart to take effect.

### Build the site without running a server.

1. From the repo's root, enter following into your terminal.

```sh
pixi run build
```

## Why zensical?

We use zensical since it works well with Markdown and builds upon the successful mkdocs material project.
It has extensive documentation as well as flexibility.
It performs well as a website and documentation.
It's mobile responsive out of the box.

## Why pixi

Pixi performs well for cross platform package management and task management. It is used in many Scientific Python projects where GPU support and different operating systems (Windows, Linux, Mac) are required.

uv, pip and conda should all also work. For the docs build, the only needed dependency is `zensical`.
