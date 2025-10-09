# ProtocolFlow · Fudan iGEM 2025

[Our team’s effects](https://2025.igem.wiki/fudan/inclusivity) led to [ProtocolFlow](https://protocolflow-290e68.igem.wiki/), [our](https://gitlab.igem.org/larryivanhan/protocolflow) laboratory-assistive software. It provides visualized experimental guidance and a built-in mental health assessment, boosting lab efficiency while supporting researchers' well-being. ProtocolFlow is a core digital deliverable of the **Fudan iGEM 2025** project.

## Overview

ProtocolFlow streamlines day-to-day bench work by turning free-form notes or audio into stepwise, interactive lab protocols. The application also embeds wellness support, helping team members monitor their mental health as experiments progress.

## Key Features

- **LLM-assisted protocol builder** – Generate structured Markdown SOPs from text or audio using OpenAI or Google Gemini, complete with timers, calculators, and safety reminders.
- **Interactive execution flow** – Navigate protocols step by step, capture annotations, run embedded analysis plugins, and export a PDF activity report when finished.
- **Floating AI companion** – Receive page-aware assistance from an on-screen chatbot that references loaded protocols and recent uploads.
- **Mental health toolkit** – Record post-experiment feelings via the built-in calendar and perform quick stress self-assessments tailored for laboratory work.
- **Local-first customization** – Persist API preferences and emotional records safely in-browser, making it easy to configure ProtocolFlow within any lab environment.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8 (recommended package manager)

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm run serve
```

Visit `http://localhost:8080` (default Vue CLI port) to explore ProtocolFlow locally.

### Build for production

```bash
pnpm run build
```

### Lint source files

```bash
pnpm run lint
```

## Configuration

ProtocolFlow stores LLM API settings in the browser’s `localStorage`. Use the in-app **Settings** page to select a provider (OpenAI-compatible or Gemini), update models, and supply API keys. In production deployments, route requests through a secure backend proxy if you prefer not to expose credentials in the client.

## Contributing

We welcome contributions from fellow Fudan iGEM 2025 members and the wider iGEM community. Please open issues or merge requests via our [GitLab repository](https://gitlab.igem.org/larryivanhan/protocolflow).

## License

This software is dedicated to the public domain under the [Creative Commons CC0 1.0 Universal license](https://creativecommons.org/publicdomain/zero/1.0/).
