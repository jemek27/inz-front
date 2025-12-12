# Chat Assistant Frontend

Nowoczesny frontend do obsługi systemu czatu z AI, wspierający różne role użytkowników, zatwierdzanie narzędzi i zarządzanie embeddingami.

## 🚀 Funkcje

- **Dual Role Chat** - Tryb pracownika i klienta
- **Historia czatu** - Przeglądanie wcześniejszych konwersacji
- **Zatwierdzanie narzędzi** - System approvals dla wywołań narzędzi
- **Zarządzanie embeddingami** - Reindeksacja i zarządzanie danymi
- **Tryby historii** - Standard (20 wiadomości), Full (pełna historia), RAG (z kontekstem)
- **Dark Mode** - Wsparcie dla trybu ciemnego
- **Responsywny design** - Działa na urządzeniach mobilnych i desktopowych

## 📋 Wymagania

- Node.js 18+ lub wyższy
- npm lub yarn
- Backend API uruchomiony na `http://localhost:8080`

## 🛠️ Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom w trybie deweloperskim
npm run dev

# Zbuduj wersję produkcyjną
npm run build

# Podgląd buildu produkcyjnego
npm run preview
```

## 🔧 Konfiguracja

Backend proxy jest skonfigurowany w `vite.config.ts`:

```typescript
server: {
  port: 3000,
  proxy: {
    '/chat': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

Jeśli Twój backend działa na innym porcie, zmień wartość `target`.

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty React
│   ├── ChatContainer.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── EmbeddingsManager.tsx
│   ├── HistoryViewer.tsx
│   ├── PendingApprovals.tsx
│   └── Sidebar.tsx
├── api.ts              # Client API do komunikacji z backendem
├── types.ts            # Definicje typów TypeScript
├── App.tsx             # Główny komponent aplikacji
├── main.tsx            # Entry point
└── index.css           # Style globalne
```

## 🎨 Technologie

- **React 18** - Framework UI
- **TypeScript** - Typowanie statyczne
- **Vite** - Build tool i dev server
- **Tailwind CSS** - Framework CSS
- **Axios** - HTTP client
- **Lucide React** - Ikony
- **React Markdown** - Renderowanie Markdown
- **date-fns** - Formatowanie dat

## 🌐 Endpointy API

Frontend komunikuje się z następującymi endpointami:

### Chat
- `POST /chat/employee` - Czat jako pracownik
- `POST /chat/client` - Czat jako klient
- `GET /chat/tools/employee` - Lista narzędzi dla pracownika
- `GET /chat/tools/client` - Lista narzędzi dla klienta
- `GET /chat/history/{userId}` - Historia czatu

### Approvals
- `GET /chat/pending-approvals?userId={userId}` - Oczekujące zatwierdzenia
- `POST /chat/approve-tool?userId={userId}` - Zatwierdź/odrzuć narzędzie

### Embeddings
- `POST /api/embeddings/reindex` - Reindeksuj wszystkie dane
- `POST /api/chat-history-embeddings/index/{conversationId}` - Indeksuj konwersację
- `POST /api/chat-history-embeddings/index-all` - Indeksuj wszystkie konwersacje
- `DELETE /api/chat-history-embeddings/{conversationId}` - Usuń embeddings konwersacji

## 🎯 Użycie

1. **Wybierz rolę** - Pracownik lub Klient w sidebar
2. **Wybierz tryb historii** - Standard, Full lub RAG
3. **Rozpocznij konwersację** - Wpisz wiadomość i wyślij
4. **Zatwierdź narzędzia** - Sprawdź pending approvals jeśli są dostępne
5. **Zarządzaj embeddingami** - Użyj panelu Embeddings do zarządzania danymi

## 🌙 Dark Mode

Aplikacja automatycznie zapisuje preferencje trybu ciemnego w localStorage.

## 📱 Responsywność

Aplikacja jest w pełni responsywna:
- Desktop: Sidebar zawsze widoczny
- Mobile: Sidebar ukryty, dostępny przez przycisk menu

## 🔐 Bezpieczeństwo

- Wszystkie żądania API są obsługiwane przez proxy Vite
- CORS jest zarządzany po stronie backendu
- Brak wrażliwych danych w localStorage (tylko preferencje UI)

## 🐛 Debugowanie

Wszystkie błędy API są logowane do konsoli:
```javascript
console.error('Failed to send message:', error);
```

## 📝 Licencja

MIT

## 👨‍💻 Autor

Stworzone dla projektu INZ
