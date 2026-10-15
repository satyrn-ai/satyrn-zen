# How to configure Ollama with environment variables

## Overview

Ollama reads its settings from environment variables. The defaults suit
chatting from the terminal. A coding agent asks more of the server, so a few
of them are worth changing before you point an agent at your local model.

This guide covers the variables that matter, how to set them for each way of
running Ollama, and how to confirm the server actually uses them.

## Before you start

If you have not run a local model yet, start with
[How to run a local model with Ollama](howto-ollama.md).

`ollama serve --help` prints the complete list of variables with their
defaults. The table below covers the ones that change how an agent behaves.

## The variables that matter

| Variable | Default | Why you might change it |
|---|---|---|
| `OLLAMA_CONTEXT_LENGTH` | adapts to available VRAM, and lands at 4k on a machine without a dedicated GPU | An agent fills 4k with its system prompt and tool definitions before your own task starts. |
| `OLLAMA_KEEP_ALIVE` | `5m` | On slower hardware the model can unload while you read an answer, and the next turn pays the full load and prompt-processing cost again. |

Two more are useful outside the agent case:

- `OLLAMA_HOST` (default `127.0.0.1:11434`) makes the server reachable from
  another machine or from a container.
- `OLLAMA_MODELS` moves the downloaded models elsewhere, which helps when the
  system disk is small.

!!! note "Flash attention and KV cache quantization"

    `OLLAMA_FLASH_ATTENTION` and `OLLAMA_KV_CACHE_TYPE` (default `f16`) reduce
    the memory the context takes. They target GPU setups; on a CPU-only
    machine they showed no measurable speed benefit.

## Choose a context length

`16384` is a reasonable starting point on a 16GB machine. Raise it if you have
memory to spare, and keep in mind that a longer context costs RAM for the
key/value cache. As a sense of scale, a 4B model took 3.1GB at the 4k default
and 3.4GB at 16k.

## Set them on Linux, installed with the official script

The installer registers Ollama as a systemd service. That service runs as its
own user, so exporting the variables in your shell has no effect, and nothing
warns you about it. Use a systemd drop-in instead.

1. Create the drop-in file.

    ```sh
    sudo mkdir -p /etc/systemd/system/ollama.service.d
    sudo tee /etc/systemd/system/ollama.service.d/override.conf > /dev/null <<'EOF'
    [Service]
    Environment="OLLAMA_CONTEXT_LENGTH=16384"
    Environment="OLLAMA_KEEP_ALIVE=30m"
    EOF
    ```

1. Reload systemd and restart Ollama.

    ```sh
    sudo systemctl daemon-reload
    sudo systemctl restart ollama
    ```

1. Confirm the drop-in is in place.

    ```sh
    systemctl cat ollama --no-pager | tail
    ```

    The override file and its `Environment=` lines appear at the end of the
    output.

!!! tip "The editor route fails quietly"

    `systemctl edit ollama` opens an editor and only writes the drop-in once
    that editor exits. If it is left open, or if it exits without saving,
    nothing is written and no error is shown. Writing the file directly, as
    above, works the same way on every machine.

## Set them with Docker

Add an `environment:` block to the Ollama service in your `docker-compose.yaml`,
then recreate the container with `docker compose up -d`:

```yaml
services:
  ollama:
    image: ollama/ollama
    environment:
      - OLLAMA_CONTEXT_LENGTH=16384
      - OLLAMA_KEEP_ALIVE=30m
```

The full compose file is in
[How to run a local coding agent with Ollama in Docker](howto-ollama-docker-pi.md).

## Set them on macOS and Windows

Ollama runs as a desktop application rather than a systemd service. See
[Ollama's documentation](https://docs.ollama.com/) for how to set environment
variables on those platforms.

## Confirm the server uses them

Checking that a variable is set is not the same as checking that the running
server picked it up. Load a model, then read the `CONTEXT` column:

```sh
ollama ps
```

```console
NAME          ID              SIZE      PROCESSOR    CONTEXT    UNTIL
qwen3.5:4b    2a654d98e6fb    3.4 GB    100% CPU     16384      4 minutes from now
```

`CONTEXT` shows the context length in use, and `SIZE` shows what the model
plus its cache actually costs in memory.
