# Przewodnik użytkownika - Chat Assistant

## Interfejs użytkownika

### 1. Główny ekran czatu

Główny ekran składa się z trzech części:

```
┌─────────────────────────────────────────────┐
│  Sidebar  │  Header (Czat/Historia/etc)    │
│           ├─────────────────────────────────┤
│  - Role   │                                 │
│  - Menu   │   Obszar wiadomości            │
│  - Tools  │   (chat messages)              │
│           │                                 │
│           ├─────────────────────────────────┤
│           │   Input (pole tekstowe)        │
└─────────────────────────────────────────────┘
```

### 2. Sidebar (Panel boczny)

**Elementy:**
- **Nagłówek**: Logo i nazwa aplikacji
- **Wybór roli**: Przełącznik Pracownik/Klient
- **Menu nawigacji**:
  - Historia czatu
  - Zatwierdzenia (z licznikiem)
  - Embeddings
  - Ustawienia
- **Stopka**: ID użytkownika

**Ustawienia w Sidebar:**
- Tryb historii (dropdown):
  - Standard - ostatnie 20 wiadomości
  - Full - pełna historia
  - RAG - 20 wiadomości + kontekst z embeddingów
- Tryb ciemny (przełącznik)

### 3. Obszar czatu

**Wiadomości użytkownika:**
- Niebieska ikona użytkownika
- Przezroczyste tło
- Tekst wyrównany do lewej

**Wiadomości asystenta:**
- Szara ikona bota
- Szare tło
- Wsparcie dla Markdown (pogrubienie, kod, listy, etc.)

**Status ładowania:**
- Animowane kropki podczas oczekiwania na odpowiedź
- Ikona spinning loader

### 4. Pole wprowadzania

**Funkcje:**
- Automatyczne rozszerzanie (1-5 linii)
- Placeholder: "Wpisz wiadomość..."
- Przycisk wysyłania z ikoną
- Obsługa Enter (wyślij) i Shift+Enter (nowa linia)

## Przepływ pracy

### Scenariusz 1: Podstawowa rozmowa

1. Wybierz rolę (Pracownik lub Klient)
2. Wpisz wiadomość w pole tekstowe
3. Naciśnij Enter lub kliknij przycisk wyślij
4. Czekaj na odpowiedź asystenta
5. Kontynuuj konwersację

**Przykład:**
```
Ty: Witaj, potrzebuję pomocy z zamówieniem
Asystent: Dzień dobry! Chętnie pomogę. Jaki jest numer Twojego zamówienia?
Ty: #12345
Asystent: Sprawdzam zamówienie #12345...
```

### Scenariusz 2: Zatwierdzanie narzędzi

1. Asystent prosi o użycie narzędzia
2. Licznik w sidebar pokazuje "1" przy Zatwierdzeniach
3. Kliknij "Zatwierdzenia" w menu
4. Zobacz szczegóły żądania:
   - Nazwa narzędzia
   - Opis
   - Argumenty (JSON)
   - Czas utworzenia
5. Kliknij "Zatwierdź" (zielony) lub "Odrzuć" (czerwony)
6. System wykonuje lub anuluje akcję

**Przykład użycia narzędzia:**
```json
Narzędzie: SendEmail
Opis: Wysyła email do klienta
Argumenty:
{
  "to": "client@example.com",
  "subject": "Potwierdzenie zamówienia",
  "body": "Twoje zamówienie zostało potwierdzone"
}
```

### Scenariusz 3: Przeglądanie historii

1. Kliknij "Historia czatu" w sidebar
2. Zobacz wszystkie wiadomości z konwersacji
3. Wiadomości są uporządkowane chronologicznie
4. Każda wiadomość ma timestamp
5. Użytkownik i Asystent są oznaczeni różnymi kolorami

### Scenariusz 4: Zarządzanie embeddingami

1. Kliknij "Embeddings" w sidebar
2. Wybierz akcję:

**Reindeksacja wszystkich danych:**
- Kliknij "Reindeksuj"
- Poczekaj na potwierdzenie
- Zobacz statystyki

**Indeksacja konwersacji:**
- Wpisz ID konwersacji
- Kliknij "Indeksuj"
- Zobacz wynik

**Usuwanie embeddingów:**
- Wpisz ID konwersacji
- Kliknij "Usuń"
- Potwierdź akcję

## Tryby historii - szczegóły

### Standard Mode (STANDARD)
- Wysyła ostatnie 20 wiadomości do asystenta
- Najszybszy tryb
- Dobry dla krótkich sesji
- Użycie: Proste pytania i odpowiedzi

### Full Mode (FULL)
- Wysyła całą historię konwersacji
- Wolniejszy, ale kompletny kontekst
- Dobry dla długich sesji
- Użycie: Skomplikowane problemy wymagające kontekstu

### RAG Mode (RAG)
- Retrieval Augmented Generation
- Ostatnie 20 wiadomości + releantny kontekst z embeddingów
- Inteligentne wyszukiwanie podobnych konwersacji
- Dobry dla powtarzających się problemów
- Użycie: Kiedy podobne problemy były już rozwiązane

## Ikony i ich znaczenie

| Ikona | Znaczenie |
|-------|-----------|
| 👤 | Użytkownik (Ty) |
| 🤖 | Asystent (Bot) |
| 💼 | Tryb pracownika |
| 👥 | Tryb klienta |
| 📜 | Historia czatu |
| ✓ | Zatwierdzenia |
| 🗄️ | Embeddings |
| ⚙️ | Ustawienia |
| 🌙 | Tryb ciemny (włącz) |
| ☀️ | Tryb jasny (włącz) |
| ➤ | Wyślij wiadomość |
| ⟳ | Ładowanie/odświeżanie |

## Kolory i ich znaczenie

- **Niebieski** (#0ea5e9): Główny kolor (przyciski, akcenty)
- **Zielony**: Zatwierdzenia, sukces
- **Czerwony**: Odrzucenia, błędy
- **Szary**: Asystent, neutralne elementy
- **Przezroczysty**: Wiadomości użytkownika

## Responsive Design

### Desktop (> 1024px)
- Sidebar zawsze widoczny
- Pełna szerokość dla czatu
- Wszystkie funkcje dostępne jednocześnie

### Tablet (768px - 1024px)
- Sidebar może być schowany
- Przycisk menu w headerze
- Overlay dla sidebar

### Mobile (< 768px)
- Sidebar ukryty domyślnie
- Przycisk menu floating (prawy dolny róg)
- Pełny ekran dla czatu
- Touch-friendly przyciski

## Skróty klawiszowe

| Skrót | Akcja |
|-------|-------|
| Enter | Wyślij wiadomość |
| Shift + Enter | Nowa linia w wiadomości |
| Esc | Zamknij sidebar (mobile) |

## Statusy i komunikaty

### Ładowanie
- Animowane kropki przy ikonie asystenta
- "Asystent pisze..."

### Sukces
- ✓ Zielona ikonka
- "Operacja zakończona sukcesem"

### Błąd
- ✗ Czerwona ikonka
- "❌ Błąd: [szczegóły]"

### Ostrzeżenie
- ⚠️ Żółta ikonka
- Informacje o działaniu wymagającym uwagi

## Najlepsze praktyki

1. **Jasne komunikaty**: Pisz konkretnie czego potrzebujesz
2. **Kontekst**: Podaj wszystkie istotne informacje
3. **Zatwierdzenia**: Zawsze sprawdzaj parametry przed zatwierdzeniem
4. **Historia**: Używaj RAG mode dla powtarzających się problemów
5. **Embeddings**: Regularnie indeksuj konwersacje dla lepszej wydajności

## FAQ

**Q: Czy mogę używać Markdown w wiadomościach?**
A: Asystent renderuje Markdown. Ty możesz go używać, ale będzie wyświetlany jako zwykły tekst.

**Q: Ile wiadomości mogę mieć w historii?**
A: Historia jest nieograniczona, ale w trybie Standard wysyłanych jest tylko 20 ostatnich.

**Q: Co się stanie jeśli odrzucę narzędzie?**
A: Asystent otrzyma informację o odrzuceniu i zaproponuje alternatywne rozwiązanie.

**Q: Czy mogę zmienić rolę w trakcie konwersacji?**
A: Tak, ale rozpocznie to nową sesję czatu.

**Q: Jak długo są przechowywane dane?**
A: Zgodnie z polityką backendu. Frontend nie przechowuje danych lokalnie (poza preferencjami UI).

## Troubleshooting

### Problem: Nie mogę wysłać wiadomości
- Sprawdź czy pole nie jest puste
- Sprawdź połączenie z backendem
- Odśwież stronę

### Problem: Nie widzę historii
- Upewnij się że backend działa
- Sprawdź czy userId jest poprawny
- Sprawdź konsolę przeglądarki (F12)

### Problem: Zatwierdzenia nie pojawiają się
- Odśwież stronę
- Sprawdź czy backend wysyła powiadomienia
- Sprawdź polling (co 10 sekund)

### Problem: Embeddings nie działają
- Sprawdź czy backend obsługuje ten endpoint
- Sprawdź uprawnienia użytkownika
- Zobacz logi backendu

## Wsparcie techniczne

W razie problemów:
1. Sprawdź konsolę przeglądarki (F12)
2. Sprawdź zakładkę Network (XHR)
3. Sprawdź logi backendu
4. Skontaktuj się z administratorem

---

**Aplikacja została stworzona z myślą o prostocie i efektywności. Miłego użytkowania! 🚀**
