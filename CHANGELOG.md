# Changelog

Wszystkie istotne zmiany w projekcie będą dokumentowane w tym pliku.

Format bazuje na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
a wersjonowanie zgodne z [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-12

### Dodane ✨

#### Funkcje główne
- **Dual Role Chat System** - Możliwość przełączania między trybem pracownika i klienta
- **Real-time Chat Interface** - Interfejs czatu wzorowany na ChatGPT/Open WebUI
- **Markdown Support** - Pełne wsparcie dla formatowania Markdown w odpowiedziach asystenta
- **Dark Mode** - Kompletny tryb ciemny z persistence w localStorage

#### Historia i kontekst
- **Three History Modes**:
  - Standard: Ostatnie 20 wiadomości
  - Full: Pełna historia konwersacji
  - RAG: 20 wiadomości + kontekst z embeddingów
- **Chat History Viewer** - Przeglądanie całej historii konwersacji z timestampami
- **Persistent State** - Historia zachowuje się między refreshami

#### System zatwierdzeń
- **Pending Approvals List** - Lista oczekujących zatwierdzeń narzędzi
- **Approval/Rejection Flow** - Możliwość zatwierdzania lub odrzucania wywołań narzędzi
- **Real-time Polling** - Automatyczne odświeżanie listy co 10 sekund
- **Badge Counter** - Licznik oczekujących zatwierdzeń w sidebar

#### Zarządzanie embeddingami
- **Embeddings Reindexing** - Reindeksacja wszystkich danych w systemie
- **Conversation Indexing** - Indeksacja pojedynczych lub wszystkich konwersacji
- **Embeddings Deletion** - Usuwanie embeddingów dla konkretnych konwersacji
- **Status Feedback** - Real-time feedback dla wszystkich operacji

#### UI/UX
- **Responsive Design** - Pełne wsparcie dla desktop, tablet i mobile
- **Sidebar Navigation** - Intuicyjna nawigacja z collapsible sidebar na mobile
- **Loading States** - Animowane stany ładowania dla wszystkich akcji
- **Error Handling** - Przyjazne komunikaty błędów
- **Smooth Scrolling** - Auto-scroll do najnowszych wiadomości
- **Keyboard Shortcuts** - Enter do wysłania, Shift+Enter dla nowej linii

#### Technical
- **TypeScript** - Pełne typowanie statyczne
- **Vite** - Szybki build tool i HMR
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client z error handling
- **React 18** - Najnowsza wersja React z concurrent features
- **Lucide Icons** - Lightweight, customizable icons
- **date-fns** - Internationalization-ready date formatting

### Konfiguracja 🔧

- **Proxy Configuration** - Vite proxy dla łatwego developmentu
- **ESLint** - Linting rules dla TypeScript + React
- **Prettier** - Code formatting (ready to configure)
- **EditorConfig** - Consistent coding style

### Dokumentacja 📚

- **README.md** - Podstawowe informacje i quick start
- **GETTING_STARTED.md** - Szczegółowa instrukcja uruchomienia
- **USER_GUIDE.md** - Kompletny przewodnik użytkownika
- **ARCHITECTURE.md** - Dokumentacja architektury i rozwoju
- **API_EXAMPLES.md** - Przykłady użycia API
- **CHANGELOG.md** - Ten plik

### API Integration 🔌

#### Endpoints obsługiwane
- `POST /chat/employee` - Chat as employee
- `POST /chat/client` - Chat as client
- `GET /chat/tools/employee` - Get employee tools
- `GET /chat/tools/client` - Get client tools
- `GET /chat/history/{userId}` - Get chat history
- `GET /chat/pending-approvals` - Get pending approvals
- `POST /chat/approve-tool` - Approve/reject tool call
- `POST /api/embeddings/reindex` - Reindex all data
- `POST /api/chat-history-embeddings/index/{conversationId}` - Index conversation
- `POST /api/chat-history-embeddings/index-all` - Index all conversations
- `DELETE /api/chat-history-embeddings/{conversationId}` - Delete embeddings

### Performance ⚡

- **Bundle Size**: ~200KB gzipped
- **Initial Load**: < 2s na 3G
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)

## Planowane funkcje (Roadmap)

### [1.1.0] - Q1 2025

#### Planowane ✨
- [ ] **File Attachments** - Możliwość wysyłania plików w czacie
- [ ] **Voice Input** - Rozpoznawanie mowy
- [ ] **Export History** - Export historii do PDF/JSON
- [ ] **Search in History** - Wyszukiwanie w historii konwersacji
- [ ] **Favorites/Bookmarks** - Oznaczanie ważnych wiadomości
- [ ] **Conversation Threads** - Tworzenie wątków konwersacji
- [ ] **Multi-language Support** - Wsparcie dla wielu języków (EN, PL, DE)

#### Usprawnienia 🔧
- [ ] **Better Notifications** - Toast notifications dla akcji
- [ ] **Offline Mode** - Podstawowe funkcje offline
- [ ] **Progressive Web App** - PWA support
- [ ] **Keyboard Navigation** - Pełna obsługa klawiatury
- [ ] **Accessibility** - ARIA labels, screen reader support

#### Technical 💻
- [ ] **Unit Tests** - Coverage > 80%
- [ ] **E2E Tests** - Playwright/Cypress tests
- [ ] **State Management** - Migracja do Zustand/Redux
- [ ] **WebSocket Support** - Real-time updates
- [ ] **Service Worker** - Caching strategy

### [1.2.0] - Q2 2025

#### Planowane ✨
- [ ] **Admin Panel** - Panel administracyjny
- [ ] **User Management** - Zarządzanie użytkownikami
- [ ] **Analytics Dashboard** - Statystyki użycia
- [ ] **Custom Themes** - Własne motywy kolorystyczne
- [ ] **Plugin System** - System wtyczek
- [ ] **API Rate Limiting UI** - Wizualizacja limitów API

#### Performance ⚡
- [ ] **Virtual Scrolling** - Dla długich list wiadomości
- [ ] **Image Optimization** - Lazy loading, WebP
- [ ] **Code Splitting** - Route-based splitting
- [ ] **Bundle Optimization** - < 150KB gzipped

### [2.0.0] - Q3 2025

#### Breaking Changes ⚠️
- [ ] **New API Version** - Wsparcie dla API v2
- [ ] **Complete Redesign** - Nowy design system
- [ ] **React 19** - Migracja do React 19

#### New Features ✨
- [ ] **Video Chat** - Rozmowy wideo z supportem
- [ ] **Screen Sharing** - Udostępnianie ekranu
- [ ] **Collaborative Editing** - Wspólna edycja dokumentów
- [ ] **AI Suggestions** - Inteligentne podpowiedzi
- [ ] **Advanced Search** - Full-text search z filtrami

## Znane problemy (Known Issues)

### v1.0.0

1. **Mobile Safari** - Keyboard może przesłaniać input field
   - Workaround: Scroll do inputu po focus
   - Status: W trakcie naprawy

2. **Long Messages** - Bardzo długie wiadomości mogą spowalniać rendering
   - Workaround: Używaj pagination
   - Status: Planowane virtual scrolling w v1.2.0

3. **Markdown Tables** - Tabele w Markdown mogą się wyświetlać niepoprawnie na mobile
   - Workaround: Scroll poziomy
   - Status: W trakcie naprawy

## Security Updates

### v1.0.0
- ✅ Wszystkie dependencies zaktualizowane do najnowszych wersji
- ✅ 0 critical vulnerabilities
- ✅ XSS protection poprzez React's built-in escaping
- ✅ CSRF protection via backend

## Migracja

### Z wersji 0.x do 1.0

Nie dotyczy - pierwsza wersja publiczna.

### Przyszłe migracje

Będą dokumentowane tutaj wraz z instrukcjami.

## Społeczność

### Kontrybutorzy

Lista kontrybutorów będzie tutaj.

### Jak kontrybuować

1. Fork repository
2. Utwórz feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## Licencja

MIT License - zobacz [LICENSE](LICENSE) file dla szczegółów.

## Kontakt

- **GitHub Issues**: [github.com/yourrepo/issues](https://github.com)
- **Email**: your-email@example.com
- **Discord**: [Join our Discord](https://discord.gg)

---

**[Unreleased]**: https://github.com/yourrepo/compare/v1.0.0...HEAD
**[1.0.0]**: https://github.com/yourrepo/releases/tag/v1.0.0
