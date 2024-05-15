# Startup Next.js Template

Welcome to Startup Next.js Template! This template is designed to kickstart your next web application project with a robust foundation and best practices in mind. Whether you're a beginner or an experienced developer, this template provides everything you need to start building your application efficiently.

## Features

- **Fetch**: Simplifies fetch requests handling and error management, inspired by Rust.
- **Components Folder**: Contains common reusable components and containers to accelerate development.
- **Providers**: Provides a structured approach to managing global state and dependencies.
- **Multi-language Support**: Integrated with `next-intl` for effortless internationalization.
- **MobX Stores**: Pre-configured MobX stores for managing user-related state.
- **SDK System**: Easily consume backend APIs with an intuitive SDK system (`sdk.user.login()`).

## Getting Started

Follow these steps to start using the template:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/darkyeg/startup-nextjs-template
   cd startup-nextjs-template
   ```

2. **Install Dependencies**:

   ```bash
   bun install
   ```

3. **Run the Development Server**:

   ```bash
   bun dev
   ```

4. **Start Building**:
   Begin building your application by editing the provided components, stores, and SDK methods.

## Directory Structure

```csharp
.
├── app/                 # Main application folder
├── assets/              # Static assets
├── components/          # UI components
│   ├── Common/          # Common components
│   ├── Containers/      # Containers
│   ├── Forms/           # Form components
│   └── Icons/           # Icon components
├── hooks/               # Custom hooks
├── i18n/                # Internationalization configuration and messages
├── layouts/             # Layout components
├── providers/           # Global state providers
├── public/              # Public assets
├── sdk/                 # Backend API SDK
├── stores/              # MobX stores
└── styles/              # Stylesheets
```

## Usage

### Fetch Class

The `Fetch` class simplifies API requests and error handling:

```javascript
const fetch = new Fetch(); // or useFetch();

async function fetchData() {
  const result = await fetch.delete('/api/data');
  if (result.isOk()) {
    const responseData = result.unwrap().data;
    // Handle successful response
  } else {
    const error = result.unwrapErr();
    // Handle error
  }
}
```

### Multi-language Support

Utilize `next-intl` for internationalization:

```javascript
import { useIntl } from 'next-intl';

function MyComponent() {
  const t = useTranslations();

  return <h1>{t('common.hi')}</h1>;
}
```

## Contributing

We welcome contributions from the community! Feel free to open issues for feature requests, bug reports, or pull requests to enhance this template.

## License

This template is licensed under the Apache License 2.0 License. See the [LICENSE](LICENSE) file for details.
