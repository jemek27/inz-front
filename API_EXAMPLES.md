# Przykłady użycia API

Ten dokument zawiera przykłady wywołań API z frontendu.

## Chat Endpoints

### 1. Wysłanie wiadomości jako pracownik

```typescript
// Request
const response = await chatApi.sendMessage('employee', {
  userId: 'user-employee',
  message: 'Jaki jest status zamówienia #12345?',
  historyMode: 'STANDARD'
});

// Response (string)
"Zamówienie #12345 jest obecnie w trakcie realizacji. Przewidywana data dostawy to 15.12.2025."
```

### 2. Wysłanie wiadomości jako klient

```typescript
// Request
const response = await chatApi.sendMessage('client', {
  userId: 'user-client',
  message: 'Czy mogę zmienić adres dostawy?',
  historyMode: 'RAG'
});

// Response (string)
"Tak, możesz zmienić adres dostawy jeśli zamówienie nie zostało jeszcze wysłane. Podaj numer zamówienia."
```

### 3. Pobranie dostępnych narzędzi

```typescript
// Request dla pracownika
const tools = await chatApi.getTools('employee');

// Response
[
  {
    "name": "checkOrderStatus",
    "description": "Sprawdza status zamówienia w systemie",
    "inputSchema": "{\"orderId\": \"string\"}"
  },
  {
    "name": "sendEmail",
    "description": "Wysyła email do klienta",
    "inputSchema": "{\"to\": \"string\", \"subject\": \"string\", \"body\": \"string\"}"
  }
]
```

### 4. Pobranie historii czatu

```typescript
// Request
const history = await chatApi.getHistory('user-employee');

// Response
[
  {
    "role": "USER",
    "content": "Witaj",
    "dateTime": "2025-12-12T10:00:00"
  },
  {
    "role": "ASSISTANT",
    "content": "Cześć! W czym mogę pomóc?",
    "dateTime": "2025-12-12T10:00:05"
  },
  {
    "role": "USER",
    "content": "Jaki jest status zamówienia #12345?",
    "dateTime": "2025-12-12T10:01:00"
  }
]
```

## Approval Endpoints

### 5. Pobranie oczekujących zatwierdzeń

```typescript
// Request
const approvals = await chatApi.getPendingApprovals('user-employee');

// Response
[
  {
    "id": "approval-123",
    "toolName": "sendEmail",
    "toolDescription": "Wysyła email do klienta",
    "arguments": "{\"to\":\"client@example.com\",\"subject\":\"Test\",\"body\":\"Hello\"}",
    "createdAt": "2025-12-12T10:30:00"
  },
  {
    "id": "approval-124",
    "toolName": "refundOrder",
    "toolDescription": "Zwraca pieniądze za zamówienie",
    "arguments": "{\"orderId\":\"12345\",\"amount\":100.00}",
    "createdAt": "2025-12-12T10:32:00"
  }
]
```

### 6. Zatwierdzenie narzędzia

```typescript
// Request - Zatwierdzenie
const response = await chatApi.approveTool('user-employee', {
  callId: 'approval-123',
  approved: true
});

// Response
"Tool call approved"
```

### 7. Odrzucenie narzędzia

```typescript
// Request - Odrzucenie
const response = await chatApi.approveTool('user-employee', {
  callId: 'approval-124',
  approved: false
});

// Response
"Tool call rejected"
```

## Embeddings Endpoints

### 8. Reindeksacja wszystkich danych

```typescript
// Request
const result = await chatApi.reindexEmbeddings();

// Response
{
  "status": "success",
  "message": "Reindexing completed successfully",
  "stats": {
    "documentsProcessed": 1500,
    "embeddingsCreated": 1500,
    "timeTaken": "45s"
  }
}
```

### 9. Indeksacja konkretnej konwersacji

```typescript
// Request
const result = await chatApi.indexConversation('conv-12345');

// Response
{
  "status": "success",
  "conversationId": "conv-12345",
  "messagesIndexed": 25,
  "embeddingsCreated": 25
}
```

### 10. Indeksacja wszystkich konwersacji

```typescript
// Request
const result = await chatApi.indexAllConversations();

// Response
{
  "status": "success",
  "conversationsProcessed": 150,
  "totalMessagesIndexed": 3750,
  "embeddingsCreated": 3750,
  "timeTaken": "2m 15s"
}
```

### 11. Usunięcie embeddingów konwersacji

```typescript
// Request
const result = await chatApi.deleteConversationEmbeddings('conv-12345');

// Response
{
  "status": "deleted",
  "conversation_id": "conv-12345"
}
```

## Przykłady użycia w komponentach

### Przykład 1: Wysyłanie wiadomości z obsługą błędów

```typescript
const handleSendMessage = async (message: string) => {
  setIsLoading(true);
  
  try {
    const response = await chatApi.sendMessage(role, {
      userId: `user-${role}`,
      message,
      historyMode,
    });
    
    // Sukces - dodaj wiadomość do state
    const assistantMessage: ChatMessageDto = {
      role: 'ASSISTANT',
      content: response,
      dateTime: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
  } catch (error: any) {
    // Błąd - pokaż komunikat
    if (error.response?.status === 404) {
      console.error('Endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    } else {
      console.error('Network error');
    }
    
    const errorMessage: ChatMessageDto = {
      role: 'ASSISTANT',
      content: `❌ Błąd: ${error.message}`,
      dateTime: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, errorMessage]);
    
  } finally {
    setIsLoading(false);
  }
};
```

### Przykład 2: Ładowanie historii z retry

```typescript
const loadChatHistory = async (retries = 3) => {
  try {
    const history = await chatApi.getHistory(userId);
    setMessages(history);
    setError(null);
    
  } catch (error) {
    if (retries > 0) {
      // Retry po 2 sekundach
      setTimeout(() => loadChatHistory(retries - 1), 2000);
    } else {
      setError('Nie udało się załadować historii');
    }
  }
};
```

### Przykład 3: Polling dla pending approvals

```typescript
useEffect(() => {
  const pollApprovals = async () => {
    try {
      const approvals = await chatApi.getPendingApprovals(userId);
      setPendingApprovals(approvals);
    } catch (error) {
      console.error('Failed to fetch approvals:', error);
    }
  };
  
  // Wywołaj od razu
  pollApprovals();
  
  // Potem co 10 sekund
  const interval = setInterval(pollApprovals, 10000);
  
  return () => clearInterval(interval);
}, [userId]);
```

### Przykład 4: Zarządzanie embeddingami z progress

```typescript
const handleReindex = async () => {
  setLoading(true);
  setProgress(0);
  
  try {
    const result = await chatApi.reindexEmbeddings();
    
    // Symulacja progress (w produkcji użyj WebSocket)
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setResult({
      type: 'success',
      message: `Zreindeksowano ${result.stats.documentsProcessed} dokumentów`
    });
    
  } catch (error: any) {
    setResult({
      type: 'error',
      message: error.message
    });
  } finally {
    setLoading(false);
  }
};
```

## Przykłady Response w różnych scenariuszach

### Sukces

```json
{
  "status": "success",
  "data": {...}
}
```

### Błąd walidacji (400)

```json
{
  "status": "error",
  "message": "Invalid userId format"
}
```

### Błąd autoryzacji (401)

```json
{
  "status": "error",
  "message": "Unauthorized access"
}
```

### Błąd serwera (500)

```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## Testowanie API

### Przykład testu z Mock

```typescript
import { vi } from 'vitest';
import { chatApi } from './api';

describe('chatApi', () => {
  it('should send message successfully', async () => {
    // Mock axios
    const mockPost = vi.spyOn(axios, 'post');
    mockPost.mockResolvedValue({ data: 'Response from AI' });
    
    const result = await chatApi.sendMessage('employee', {
      userId: 'test-user',
      message: 'Test message',
      historyMode: 'STANDARD'
    });
    
    expect(result).toBe('Response from AI');
    expect(mockPost).toHaveBeenCalledWith(
      '/chat/employee',
      expect.objectContaining({
        userId: 'test-user',
        message: 'Test message'
      })
    );
  });
});
```

## Curl Examples (dla testowania backendu)

### Test chat endpoint

```bash
curl -X POST http://localhost:8080/chat/employee \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-employee",
    "message": "Test message",
    "historyMode": "STANDARD"
  }'
```

### Test pending approvals

```bash
curl -X GET "http://localhost:8080/chat/pending-approvals?userId=user-employee"
```

### Test approve tool

```bash
curl -X POST "http://localhost:8080/chat/approve-tool?userId=user-employee" \
  -H "Content-Type: application/json" \
  -d '{
    "callId": "approval-123",
    "approved": true
  }'
```

### Test reindex embeddings

```bash
curl -X POST http://localhost:8080/api/embeddings/reindex
```

## Performance Tips

### 1. Debounce dla search/input

```typescript
import { debounce } from 'lodash';

const debouncedSearch = debounce(async (query: string) => {
  const results = await chatApi.search(query);
  setSearchResults(results);
}, 300);
```

### 2. Cache dla frequently accessed data

```typescript
const cache = new Map<string, ToolInfo[]>();

const getTools = async (role: UserRole) => {
  if (cache.has(role)) {
    return cache.get(role)!;
  }
  
  const tools = await chatApi.getTools(role);
  cache.set(role, tools);
  return tools;
};
```

### 3. Abort długo trwających requestów

```typescript
const abortController = new AbortController();

const sendMessage = async (message: string) => {
  try {
    const response = await axios.post('/chat/employee', 
      { message },
      { signal: abortController.signal }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled');
    }
    throw error;
  }
};

// Cancel po timeout
setTimeout(() => abortController.abort(), 30000);
```

---

**Więcej przykładów znajdziesz w dokumentacji API backendu.**
