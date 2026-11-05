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

## Next steps

Before you let an agent drive the model, see
[How to configure Ollama with environment variables](howto-ollama-env-vars.md):
the defaults give an agent less context than it needs.

To let a coding agent drive a local model, see
[How to run a local coding agent with Ollama in Docker](howto-ollama-docker-pi.md).
