# Architektura i rozwój aplikacji

## Architektura Frontend

### Struktura komponentów

```
App.tsx (Root Component)
├── Sidebar
│   ├── Role Selector
│   ├── Navigation Menu
│   └── Settings Panel
├── Main Content (Switch based on view)
│   ├── ChatView
│   │   ├── ChatContainer
│   │   │   └── ChatMessage[]
│   │   └── ChatInput
│   ├── HistoryView
│   │   └── HistoryViewer
│   ├── ApprovalsView
│   │   └── PendingApprovals
│   └── EmbeddingsView
│       └── EmbeddingsManager
```

### Stan aplikacji (State Management)

**App.tsx** zarządza globalnym stanem:

```typescript
// UI State
- sidebarOpen: boolean
- currentView: 'chat' | 'history' | 'approvals' | 'embeddings'
- darkMode: boolean

// User State
- role: 'employee' | 'client'
- historyMode: 'STANDARD' | 'FULL' | 'RAG'

// Data State
- messages: ChatMessageDto[]
- historyMessages: ChatMessageDto[]
- pendingApprovals: PendingToolCallDto[]
- isLoading: boolean
```

### Przepływ danych

```
User Input → ChatInput → handleSendMessage()
                              ↓
                    chatApi.sendMessage()
                              ↓
                    Backend API (POST /chat/{role})
                              ↓
                    Response (string)
                              ↓
                    Update messages state
                              ↓
                    ChatContainer → ChatMessage[]
```

## API Layer

### Struktura api.ts

```typescript
const api = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' }
});

export const chatApi = {
  // Chat operations
  sendMessage(role, request): Promise<string>
  getTools(role): Promise<ToolInfo[]>
  getHistory(userId): Promise<ChatMessageDto[]>
  
  // Approval operations
  getPendingApprovals(userId): Promise<PendingToolCallDto[]>
  approveTool(userId, request): Promise<string>
  
  // Embeddings operations
  reindexEmbeddings(): Promise<any>
  indexConversation(id): Promise<any>
  indexAllConversations(): Promise<any>
  deleteConversationEmbeddings(id): Promise<any>
}
```

### Error Handling

Wszystkie błędy są przechwytywane i wyświetlane w UI:

```typescript
try {
  const response = await chatApi.sendMessage(...);
} catch (error: any) {
  const errorMessage: ChatMessageDto = {
    role: 'ASSISTANT',
    content: `❌ Błąd: ${error.message}`,
    dateTime: new Date().toISOString(),
  };
  setMessages((prev) => [...prev, errorMessage]);
}
```

## Styling

### Tailwind CSS

Używamy utility-first approach:

```typescript
// Przykład
<div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50">
  <div className="w-8 h-8 rounded-full bg-primary-500">
    <User size={18} />
  </div>
</div>
```

### Dark Mode

Implementacja z klasą `dark` na `<html>`:

```typescript
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

Każdy komponent używa wariantów dark:

```css
bg-white dark:bg-gray-900
text-gray-900 dark:text-gray-100
```

## Performance

### Optymalizacje

1. **Lazy Loading**: Komponenty są importowane tylko gdy potrzebne
2. **Memoization**: Używamy React.memo() dla ciężkich komponentów
3. **Debouncing**: Input fields używają debounce dla API calls
4. **Pagination**: Historia używa virtual scrolling dla dużych list
5. **Code Splitting**: Vite automatycznie splituje kod

### Bundle Size

```
Total bundle size: ~200KB (gzipped)
├── React: 45KB
├── Tailwind CSS: 10KB (purged)
├── Axios: 15KB
├── Lucide Icons: 5KB (tree-shaken)
├── React Markdown: 20KB
└── App Code: 105KB
```

## Testing Strategy

### Unit Tests

```typescript
// Przykład testu dla ChatMessage
describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    render(<ChatMessage role="USER" content="Hello" />);
    expect(screen.getByText('Ty')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// Przykład testu dla flow wysyłania wiadomości
describe('Chat Flow', () => {
  it('sends message and displays response', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Wpisz wiadomość...');
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.submit(input.closest('form'));
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
```

## Rozszerzanie aplikacji

### Dodanie nowego widoku

1. **Utwórz komponent** w `src/components/`:

```typescript
// NewView.tsx
export const NewView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2>New View</h2>
      {/* content */}
    </div>
  );
};
```

2. **Dodaj do typu View** w `App.tsx`:

```typescript
type View = 'chat' | 'history' | 'approvals' | 'embeddings' | 'newview';
```

3. **Dodaj do menu** w `Sidebar.tsx`:

```typescript
<button onClick={() => setCurrentView('newview')}>
  New View
</button>
```

4. **Dodaj do renderContent()** w `App.tsx`:

```typescript
case 'newview':
  return <NewView />;
```

### Dodanie nowego API endpoint

1. **Dodaj typ** w `src/types.ts`:

```typescript
export interface NewDataDto {
  id: string;
  name: string;
}
```

2. **Dodaj metodę API** w `src/api.ts`:

```typescript
export const chatApi = {
  // ... existing methods
  
  getNewData: async (): Promise<NewDataDto[]> => {
    const response = await api.get<NewDataDto[]>('/api/newdata');
    return response.data;
  },
};
```

3. **Użyj w komponencie**:

```typescript
const [data, setData] = useState<NewDataDto[]>([]);

useEffect(() => {
  const loadData = async () => {
    const result = await chatApi.getNewData();
    setData(result);
  };
  loadData();
}, []);
```

### Dodanie nowego motywu kolorów

1. **Edytuj** `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
        600: '#your-darker-color',
      },
      secondary: {
        500: '#another-color',
      }
    }
  }
}
```

2. **Użyj w komponentach**:

```typescript
<button className="bg-secondary-500 hover:bg-secondary-600">
  Click me
</button>
```

## Deployment

### Build dla produkcji

```bash
npm run build
```

Wynik w folderze `dist/`:
```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── index.html
└── vite.svg
```

### Deployment na różne platformy

#### Vercel

```bash
npm i -g vercel
vercel
```

Lub połącz z GitHub i deploy automatycznie.

#### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t chat-frontend .
docker run -p 80:80 chat-frontend
```

#### Static hosting (GitHub Pages, S3, etc.)

Po zbudowaniu, skopiuj zawartość `dist/` do swojego static hostingu.

## Environment Variables

### Development

Utwórz `.env.development`:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=Chat Assistant
```

### Production

Utwórz `.env.production`:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Chat Assistant
```

Użycie w kodzie:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## Monitoring i Analytics

### Dodanie Google Analytics

```typescript
// src/analytics.ts
export const trackEvent = (category: string, action: string) => {
  if (window.gtag) {
    window.gtag('event', action, { event_category: category });
  }
};

// Użycie
trackEvent('Chat', 'MessageSent');
```

### Error Tracking (Sentry)

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  environment: import.meta.env.MODE,
});

// Użycie
try {
  // code
} catch (error) {
  Sentry.captureException(error);
}
```

## CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Security

### Best Practices

1. **Sanitize User Input**: React automatycznie escapuje content
2. **HTTPS Only**: Zawsze używaj HTTPS w produkcji
3. **CSP Headers**: Skonfiguruj Content Security Policy
4. **Environment Variables**: Nigdy nie commituj secrets
5. **Dependencies**: Regularnie aktualizuj zależności

```bash
npm audit
npm audit fix
```

### CORS Configuration

Backend musi mieć prawidłowo skonfigurowany CORS:

```java
@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
```

## Troubleshooting Development

### Problem: Hot reload nie działa

```bash
# Wyczyść cache
rm -rf node_modules/.vite
npm run dev
```

### Problem: TypeScript errors

```bash
# Sprawdź typy
npx tsc --noEmit

# Zaktualizuj typy
npm install --save-dev @types/react@latest @types/react-dom@latest
```

### Problem: Build fails

```bash
# Wyczyść wszystko
rm -rf node_modules dist
npm install
npm run build
```

## Contributing

### Code Style

- Używamy ESLint i Prettier
- 2 spacje dla indentacji
- Single quotes dla strings
- Trailing commas w objects/arrays

### Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Commits
git commit -m "feat: add new feature"
git commit -m "fix: fix bug"
git commit -m "docs: update readme"

# Push and PR
git push origin feature/new-feature
```

### Commit Messages

Używamy Conventional Commits:

- `feat:` nowa funkcja
- `fix:` naprawa błędu
- `docs:` dokumentacja
- `style:` formatowanie
- `refactor:` refaktoryzacja
- `test:` testy
- `chore:` maintenance

## Przydatne narzędzia

### Development

- **React DevTools**: Debugowanie komponentów
- **Redux DevTools**: State management (jeśli używamy Redux)
- **Vite Plugin Inspector**: Inspekcja bundlowania

### Testing

- **Vitest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

### Performance

- **Lighthouse**: Audyt wydajności
- **Bundle Analyzer**: Analiza rozmiaru bundla
- **React Profiler**: Profilowanie renderowania

---

**Happy Coding! 🚀**
