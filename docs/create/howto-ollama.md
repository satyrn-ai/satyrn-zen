# How to run a local model with Ollama

## Overview

This guide explains how to run a small local model using Ollama's CLI.
It is a good starting point for anyone looking to run a local model.

The guide works for any local system since it does not require a GPU
and runs on any operating system (Windows, macOS, Linux).

## Before you start

This guide assumes you have a basic understanding of the terminal.

We recommend starting with a Qwen3.5 model. Select the specific model
based on the available RAM on your local system:

- Qwen3.5:2B for less than 16GB of RAM
- Qwen3.5:4B for 16GB+ of RAM

## Run the Qwen3.5 model

1. Install Ollama.

    Use [Ollama's installation instructions](https://docs.ollama.com/quickstart)
    for your operating system.

1. Run the Ollama CLI from the terminal. Type `ollama run qwen3.5:2b` in the terminal. This command will
   download the model and run it in ollama.

    ```sh
    ollama run qwen3.5:2b
    ```

    You should see a list of available commands.

    ```sh
    ❯ ollama
    Ollama 0.32.5

    ▸ Chat, Code, & Work
        Chat with models, code, search the web, and delegate real work

      Launch Claude Code
        Anthropic's coding tool with subagents

      Launch OpenCode
        Anomaly's open-source coding agent

      Launch Hermes Agent (install)
        Self-improving AI agent built by Nous Research

      Launch OpenClaw (install)
        Personal AI with 100+ skills


    ↑/↓ navigate • enter launch • → configure • esc quit
    ```

1. Select "Chat, Code, & Work" to launch the chat interface.

    You will see this output:

    ```sh
    ❯ ollama
    Select model to run: Type to filter...

      Recommended
      ▸ glm-5.2:cloud (Sign in required)
          Long-horizon coding and agentic engineering with a solid 1M context
        minimax-m3:cloud
          State-of-the-art coding & agent capabilities with multimodal reasoning and
        gemma4:26b
          Agentic workflows and multimodal reasoning, ~19GB, (not downloaded)

      More
        gemma4:12b
        qwen3.5:2b

    ↑/↓ navigate • enter select • ← back
    ```

1. Type `qwen3.5:2b` to use the Qwen3.5:2B model.

    You will see this output:

    ```sh
    ❯ ollama
    ╭──────────────────────────────────────────────────────────────────────────────╮
    │ what changed on this branch?                                                 │
    ╰──────────────────────────────────────────────────────────────────────────────╯
      qwen3.5:2b
    ```

1. Enter a prompt in the text box.

    ```sh
    ❯ ollama
    ╭──────────────────────────────────────────────────────────────────────────────╮
    │ What standard library in Python is used to run asynchronous code             │
    ╰──────────────────────────────────────────────────────────────────────────────╯
      qwen3.5:2b
    ```

1. View the model's response.

    Congratulations! You have successfully run a small model locally on your machine.

1. Optional: Type another prompt.
1. Enter `/bye` to exit the prompt and then `ESC` to quit Ollama.

## Set Ollama options

Ollama reads its settings from environment variables. Two of them are worth
setting before you let a coding agent drive the model:

- `OLLAMA_CONTEXT_LENGTH` sets how much context the server allocates. The
  default adapts to the available VRAM and lands at 4k on a modest machine,
  which a coding agent fills with its system prompt and tool definitions
  before your own task even starts.
- `OLLAMA_KEEP_ALIVE` sets how long a model stays in memory, five minutes by
  default. On slower hardware the model can unload while you read an answer,
  and the next turn pays the full load and prompt-processing cost again.

How you set them depends on how Ollama runs.

### Linux, installed with the official script

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

    `16384` is a reasonable starting point on a 16GB machine. Raise it if you
    have memory to spare: a longer context costs RAM for the key/value cache.
    As a sense of scale, a 4B model took 3.1GB at the 4k default and 3.4GB at
    16k.

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

!!! tip "Check the value the server actually uses"
    `systemctl show` only tells you that a variable is set. To see what the
    running server allocated, load a model and run `ollama ps`: the `CONTEXT`
    column shows the context length in use.

### macOS and Windows

Ollama runs as a desktop application rather than a systemd service. See
[Ollama's documentation](https://docs.ollama.com/) for how to set environment
variables on those platforms.

!!! note "Flash attention and KV cache quantization"
    `OLLAMA_FLASH_ATTENTION` and `OLLAMA_KV_CACHE_TYPE` (default `f16`) reduce
    the memory the context takes. They target GPU setups; on a CPU-only
    machine they showed no measurable speed benefit.

## Next steps

To let a coding agent drive a local model, see
[How to run a local coding agent with Ollama in Docker](howto-ollama-docker-pi.md).
