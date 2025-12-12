# Instrukcja uruchomienia projektu

## Krok 1: Instalacja zależności

```bash
cd inz-front
npm install
```

## Krok 2: Sprawdzenie konfiguracji backendu

Upewnij się, że backend działa na `http://localhost:8080`.

Jeśli backend działa na innym porcie, edytuj plik `vite.config.ts` i zmień wartość `target` w sekcji `proxy`.

## Krok 3: Uruchomienie aplikacji

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Funkcje aplikacji

### 1. Czat z AI

- Wybierz rolę (Pracownik lub Klient) w bocznym menu
- Wpisz wiadomość w polu tekstowym na dole ekranu
- Naciśnij Enter lub kliknij przycisk wyślij
- Asystent odpowie na Twoją wiadomość

### 2. Tryby historii

W ustawieniach (ikona Settings w sidebar) możesz wybrać jeden z trzech trybów:

- **Standard**: Ostatnie 20 wiadomości
- **Full**: Pełna historia konwersacji
- **RAG**: Ostatnie 20 wiadomości + releantny kontekst z embeddingów

### 3. Historia czatu

- Kliknij "Historia czatu" w sidebar
- Zobacz wszystkie wcześniejsze wiadomości w chronologicznej kolejności
- Wiadomości są oznaczone datą i godziną

### 4. Zatwierdzenia narzędzi

- Gdy asystent chce użyć narzędzia wymagającego zatwierdzenia, zobaczysz powiadomienie
- Licznik w sidebar pokazuje liczbę oczekujących zatwierdzeń
- Kliknij "Zatwierdzenia" aby zobaczyć szczegóły
- Zatwierdź lub odrzuć każde żądanie

### 5. Zarządzanie embeddingami

Kliknij "Embeddings" w sidebar, aby:

- **Reindeksować wszystkie dane**: Ponownie tworzy embeddingi dla wszystkich danych w systemie
- **Indeksować wszystkie konwersacje**: Tworzy embeddingi dla wszystkich konwersacji
- **Indeksować konwersację**: Podaj ID konwersacji i zaindeksuj tylko ją
- **Usunąć embeddingi**: Usuń embeddingi dla konkretnej konwersacji

## Skróty klawiszowe

- **Enter**: Wyślij wiadomość
- **Shift + Enter**: Nowa linia w wiadomości

## Tryb ciemny

- Kliknij ikonę Moon/Sun w ustawieniach sidebar
- Preferencje są zapisywane w przeglądarce

## Rozwiązywanie problemów

### Backend nie odpowiada

Jeśli widzisz błędy związane z połączeniem:

1. Sprawdź czy backend działa: `curl http://localhost:8080/chat/tools/employee`
2. Sprawdź konfigurację proxy w `vite.config.ts`
3. Sprawdź czy CORS jest poprawnie skonfigurowany na backendzie

### Aplikacja się nie uruchamia

```bash
# Usuń node_modules i package-lock.json
rm -rf node_modules package-lock.json

# Zainstaluj ponownie
npm install

# Uruchom
npm run dev
```

### Błędy TypeScript

```bash
# Sprawdź błędy
npm run lint

# Zbuduj projekt (to również sprawdzi błędy)
npm run build
```

## Build produkcyjny

```bash
# Zbuduj aplikację
npm run build

# Wynik będzie w folderze dist/
# Możesz go wdrożyć na dowolny serwer statyczny

# Podgląd buildu
npm run preview
```

## Struktura API Request/Response

### Przykład żądania czatu

```json
POST /chat/employee
{
  "userId": "user-employee",
  "message": "Witaj, jak mogę pomóc?",
  "historyMode": "STANDARD"
}
```

### Przykład odpowiedzi

```
Cześć! Jestem tutaj, aby Ci pomóc. Czego potrzebujesz?
```

### Przykład pending approval

```json
GET /chat/pending-approvals?userId=user-employee

Response:
[
  {
    "id": "call-123",
    "toolName": "SendEmail",
    "toolDescription": "Wysyła email do klienta",
    "arguments": "{\"to\": \"client@example.com\", \"subject\": \"Test\"}",
    "createdAt": "2025-12-12T10:30:00"
  }
]
```

### Przykład zatwierdzenia

```json
POST /chat/approve-tool?userId=user-employee
{
  "callId": "call-123",
  "approved": true
}
```

## Dostosowywanie

### Zmiana kolorów

Edytuj `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Zmień na swój kolor
    600: '#0284c7',
    // ...
  }
}
```

### Zmiana portu

Edytuj `vite.config.ts`:

```typescript
server: {
  port: 3000,  // Zmień na inny port
  // ...
}
```

### Dodanie nowych endpointów

1. Dodaj typ w `src/types.ts`
2. Dodaj metodę API w `src/api.ts`
3. Użyj w komponencie

## Wsparcie

W razie problemów:
1. Sprawdź konsolę przeglądarki (F12)
2. Sprawdź logi backendu
3. Sprawdź konfigurację proxy

Aplikacja jest w pełni funkcjonalna i gotowa do użycia! 🚀
