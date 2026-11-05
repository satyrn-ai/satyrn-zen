# How to add a browser chat to Ollama with Open WebUI

## Overview

Using the Ollama CLI from the terminal is the quickest way to chat with a local model. [Open WebUI](https://github.com/open-webui/open-webui) adds a browser-based chat interface on top of your local Ollama instance.

This guide is useful if you want to:

- use a local model but aren't comfortable with the terminal
- switch between models without typing commands
- upload documents and chat with them locally

## Before you start

If you haven't run a local model yet, start with
[How to run a local model with Ollama](howto-ollama.md).

!!! note "Python version"

    Open WebUI requires Python 3.11 or 3.12 to be installed to avoid compatibility issues. Refer to Open WebUI documentation for supported versions.

Ollama must be running before you start Open WebUI. If you installed Ollama using the previous guide it runs automatically in the background. You can confirm it is running by visiting `http://localhost:11434` in your browser - you should see `Ollama is running`.

## Install and run Open WebUI

1. Install Open WebUI with `pip`. We recommend doing this inside a virtual
   environment to keep its dependencies separate from other projects.

```
pip install open-webui
```

2. Start Open WebUI.

```
open-webui serve
```

3. Open `http://localhost:8080` in your browser.

## Set up your account

1. Create an admin account on first launch. This account is local; no data leaves your machine.

2. Open WebUI will detect Ollama automatically. You should see your downloaded models available in the model selector at the top of the chat window.

3. Select a model and send a message to confirm everything is working.

## Troubleshooting

### No models appear in the selector

You need to have pulled at least one model with Ollama before Open WebUI can
list them. Run `ollama pull qwen3.5:2b` in your terminal, then refresh the
browser.

### Port is already in use

Start Open WebUI on another available port, such as 3001:

```
open-webui serve --port 3001
```

Then open `http://localhost:3001` in your browser.

## Stop and clean up

To stop Open WebUI when you are done: Press `Ctrl+C` in the terminal where Open WebUI is running.

## Next steps

- To let a coding agent drive your local model instead, see [How to run a local coding agent with Ollama in Docker](howto-ollama-docker-pi.md).
