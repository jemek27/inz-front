# 🚀 Szybki Start - Chat Assistant

## Uruchomienie w 3 krokach

```bash
# 1. Zainstaluj zależności (tylko raz)
npm install

# 2. Uruchom aplikację
npm run dev

# 3. Otwórz przeglądarkę
# http://localhost:3000
```

## 📱 Jak używać

### Podstawy
1. **Wybierz rolę**: Pracownik lub Klient (lewy panel)
2. **Wpisz wiadomość**: W pole na dole
3. **Wyślij**: Enter lub kliknij ikonę ➤

### Funkcje
- **Historia**: Kliknij "Historia czatu" aby zobaczyć wszystkie wiadomości
- **Zatwierdzenia**: Licznik pokazuje oczekujące zatwierdzenia narzędzi
- **Embeddings**: Zarządzaj indeksowaniem konwersacji
- **Tryb ciemny**: Przełącznik w ustawieniach (ikona koła zębatego)

## ⌨️ Skróty klawiszowe

| Klawisz | Akcja |
|---------|-------|
| `Enter` | Wyślij wiadomość |
| `Shift + Enter` | Nowa linia |

## 🔧 Konfiguracja

### Zmiana portu backendu

Edytuj `vite.config.ts`:

```typescript
proxy: {
  '/chat': {
    target: 'http://localhost:8080', // ← Zmień port tutaj
```

### Zmiana kolorów

Edytuj `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9', // ← Zmień kolor tutaj
```

## 📚 Dokumentacja

- **README.md** - Podstawowe info
- **GETTING_STARTED.md** - Szczegółowa instrukcja
- **USER_GUIDE.md** - Przewodnik użytkownika
- **ARCHITECTURE.md** - Dla developerów
- **API_EXAMPLES.md** - Przykłady API

## ⚠️ Troubleshooting

### Problem: Nie mogę wysłać wiadomości
**Rozwiązanie**: Upewnij się, że backend działa na porcie 8080

### Problem: Nie widzę historii
**Rozwiązanie**: Sprawdź konsolę przeglądarki (F12)

### Problem: Aplikacja nie startuje
```bash
# Wyczyść wszystko i zainstaluj ponownie
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🎨 Wygląd

Aplikacja wygląda jak ChatGPT/Open WebUI:
- Czysty, minimalistyczny design
- Ciemny/jasny tryb
- Smooth animations
- Mobile-friendly

## 📦 Build produkcyjny

```bash
# Zbuduj aplikację
npm run build

# Wynik w folderze dist/
# Gotowy do wdrożenia!
```

## 💡 Przydatne komendy

```bash
npm run dev      # Start dev server
npm run build    # Build produkcyjny
npm run preview  # Podgląd buildu
npm run lint     # Sprawdź kod
```

## 🆘 Pomoc

1. Sprawdź dokumentację w folderze projektu
2. Zobacz przykłady w API_EXAMPLES.md
3. Otwórz konsolę przeglądarki (F12)
4. Sprawdź logi terminala

## ✨ Główne funkcje

✅ Czat z AI (jako Pracownik/Klient)
✅ Historia konwersacji (3 tryby)
✅ System zatwierdzeń narzędzi
✅ Zarządzanie embeddingami
✅ Tryb ciemny
✅ Responsywny design
✅ Markdown w odpowiedziach
✅ Real-time polling

---

**Gotowe! Aplikacja działa i jest w pełni funkcjonalna! 🎉**

**Backend na porcie 8080? → Wszystko będzie działać!**
**Backend nie działa? → Frontend i tak się uruchomi (graceful degradation)**

Miłego kodowania! 🚀
