# T&C Generator

An AI-powered generator that creates clear Terms & Conditions for startups, side projects, and apps in seconds.

## Stack

- Next.js (App Router)
- Mistral AI via Vercel AI SDK
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

1. Clone the repository and install dependencies:
```bash
   git clone https://github.com/Lukas1098/terms.git
   cd terms
   pnpm install
```

2. Create a `.env.local` file and add your Mistral API key:
```bash
   MISTRAL_API_KEY=your_key_here
```

   Get your key at [console.mistral.ai](https://console.mistral.ai).

3. Start the development server:
```bash
   pnpm dev
```

## Usage

Enter a description of your project or app, click Generate, and download the result as a Markdown file.

## License

MIT
