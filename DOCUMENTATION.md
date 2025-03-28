# MyCo AI Platform Technical Documentation

**Integrated AI Processing & Content Orchestration System**

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [AI Components](#ai-components)
3. [Frontend Implementation](#frontend-implementation)
4. [Backend Implementation](#backend-implementation)
5. [API Reference](#api-reference)
6. [Database Schema](#database-schema)
7. [External Service Integration](#external-service-integration)
8. [Security Considerations](#security-considerations)
9. [Development Guidelines](#development-guidelines)

## Architecture Overview

MyCo is built on a modern client-server architecture designed for scalability and extensibility, with AI at its core. The system uses neural processing and machine learning throughout to transform the content creation workflow.

### High-Level Architecture
```
┌─────────────┐      ┌─────────────┐      ┌─────────────────────┐
│   Next.js   │      │   Django    │      │     AI Services     │
│  Frontend   │─────▶│   Backend   │─────▶│  - OpenAI (GPT-4)   │
│             │◀─────│             │◀─────│  - DALL-E 3         │
└─────────────┘      └─────────────┘      │  - ElevenLabs       │
                           │              │  - Unsplash         │
                           ▼              └─────────────────────┘
                    ┌─────────────┐
                    │   MongoDB   │
                    │ (with vector│
                    │  embeddings)│
                    └─────────────┘
```

### Communication Flow

1. User interacts with the Next.js frontend components
2. Frontend sends requests to Django REST API endpoints
3. Backend processes requests, calling appropriate AI services as needed
4. AI services return responses to the backend
5. Backend formats and returns responses to the frontend
6. Frontend updates UI with the received data

## AI Components

### OpenAI Integration

#### Assistants API Usage
The platform uses multiple specialized OpenAI Assistants:

1. **Brainstorming Assistant** (`asst_q91SWwXHP1m4mLK9m33hIOpS`)
   - Purpose: Generate creative video ideas based on user input
   - Implementation: `brainstorming_ai.py`

2. **Writing Assistant** (`asst_JqiW1vNxUjjh3iNorT9VhHcP`)
   - Purpose: Create scripts, stories, and optimized content
   - Implementation: `writing_ai.py`

3. **Reviews Assistant** (`asst_tZfueWtEWBeQMUQIqK2w5N0M`)
   - Purpose: Provide professional-quality feedback on content
   - Implementation: `reviews_ai.py`

Each assistant interaction follows this pattern:
```python
def get_ai_response(question):
    # Add user message to thread
    add_message_to_thread(thread.id, question)
    
    # Run assistant
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=assistant_id)
    
    # Process and return response
    if run.status == "completed":
        # Get latest message and clean it
        threads_messages = client.beta.threads.messages.list(thread_id=thread.id)
        latest_message = threads_messages.data[0]
        response = latest_message.content[0].text.value
        cleaned_response = re.sub(r"【\d+:\d+†source】", "", response)
        return cleaned_response
```

#### DALL-E 3 Integration
The platform uses DALL-E 3 for thumbnail generation:

```python
def create_thumbnail(request):
    # Get user prompt and enhance it
    user_prompt = data.get('msg')
    enhanced_prompt = f"Create a detailed, visually appealing thumbnail that illustrates: {user_prompt}..."
    
    # Generate image
    response = client.images.generate(
        model="dall-e-3",
        prompt=enhanced_prompt,
        size="1792x1024",
        quality="standard",
        n=1
    )
    
    # Return image URL
    image_url = response.data[0].url
    return JsonResponse({"content": [image_url]})
```

#### Vector Embeddings for Semantic Search
The platform uses OpenAI's text-embedding-ada-002 model for semantic search:

```python
def generate_embeddings_from_openai(text: str) -> list[float]:
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    response = client.embeddings.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response.data[0].embedding
```

These embeddings are stored in MongoDB and queried using vector search:

```python
results = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": generate_embeddings_from_openai(msg),
        "path": "embedding",
        "numCandidates": 100,
        "limit": 3,
        "index": "PlotSemanticSearch"
    }}
])
```

### ElevenLabs Integration

The platform uses ElevenLabs for text-to-speech synthesis:

```typescript
async function speak(text: string) {
    // Set up request
    const options = {
        method: "POST",
        headers: {
            "xi-api-key": "sk_616d1feb68c5659a0cd6f91a14a137c0399491ab4b98ae01",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model_id: "eleven_multilingual_v2",
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.76,
            },
            text: text,
        }),
    };
    
    // Get audio response
    const response = await fetch(urls.rachel, options);
    const audioBlob = await response.blob();
    const newAudioUrl = URL.createObjectURL(audioBlob);
    
    // Play audio
    const newAudio = new Audio(newAudioUrl);
    newAudio.play();
}
```

### Voice Recognition

The platform uses the Web Speech API via react-speech-recognition:

```typescript
const startRecognition = () => {
    SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
    });
    resetTranscript();
};
```

## Frontend Implementation

### Component Structure

The frontend is built with Next.js 13 and uses a component-based architecture:

1. **AI Components** in `/components/shared/`:
   - `AIBrainStorming.tsx`: Interface for idea generation
   - `AIContentGeneration.tsx`: Interface for content creation
   - `AIEditing.tsx`: Interface for editing assistance
   - `AIReviews.tsx`: Interface for feedback
   - `AISearch.tsx`: Interface for semantic search

2. **UI Components** in `/components/ui/`:
   - Reusable UI elements based on TailwindCSS

3. **Hooks** in `/hooks/`:
   - `useOpenAiChatBot.ts`: Core hook for AI communication
   - `useRachel.tsx`: Text-to-speech integration
   - `useVoiceRecognition.ts`: Speech-to-text functionality

### Chat Interface

All AI components use a shared Chat interface pattern:

```typescript
// Add user message
setMessages((prev) => [
    ...prev,
    { id: Date.now().toString(), content: input, role: "user" },
]);
// Send to backend
mutate(input);
// Reset input
setInput("");
```

## Backend Implementation

### Endpoint Structure

The Django backend provides these main endpoints:

1. **AI Endpoints**:
   - `/brainstorming/`: Idea generation via OpenAI Assistant
   - `/writing/`: Content creation via OpenAI Assistant
   - `/reviews/`: Content feedback via OpenAI Assistant
   - `/editing/`: Thumbnail and image suggestions (DALL-E and Unsplash)
   - `/ai-search/`: Semantic search using vector embeddings

2. **Utility Endpoints**:
   - `/translate/`: Subtitle translation
   - `/summary/`: Video summary retrieval

### MongoDB Integration

The platform uses MongoDB with vector search capabilities:

```python
client = pymongo.MongoClient("mongodb+srv://[REDACTED]")
db = client.db
collection = db.video
```

## API Reference

### Frontend to Backend

| Endpoint | Method | Request Body | Response | Description |
|----------|--------|--------------|----------|-------------|
| `/brainstorming/` | POST | `{ "msg": "user prompt" }` | `{ "content": "AI response" }` | Generate content ideas |
| `/writing/` | POST | `{ "msg": "user prompt" }` | `{ "content": "AI response" }` | Generate scripts/content |
| `/editing/` | POST | `{ "msg": "user prompt" }` | `{ "content": [image_urls] }` | Get image suggestions or generate thumbnails |
| `/reviews/` | POST | `{ "msg": "user prompt" }` | `{ "content": "AI response" }` | Get content feedback |
| `/ai-search/` | POST | `{ "msg": "search query" }` | `{ "videos": ["video1", "video2"] }` | Semantic search for videos |
| `/translate/` | POST | `{ "msg": "content", "language": "target" }` | `{ "translated_text": "translation" }` | Translate subtitles |
| `/summary/` | POST | `{ "msg": "video_title" }` | `{ "summary": "video summary" }` | Get video summary |

### Backend to External Services

| Service | API | Purpose | Implementation |
|---------|-----|---------|---------------|
| OpenAI | Assistants API | Specialized AI assistants | `brainstorming_ai.py`, `writing_ai.py`, `reviews_ai.py` |
| OpenAI | DALL-E 3 | Thumbnail generation | `views.py` (create_thumbnail) |
| OpenAI | Embeddings | Semantic search | `utils.py` (generate_embeddings_from_openai) |
| Unsplash | Search API | Contextual images | `unsplash.py` |
| ElevenLabs | TTS API | Voice synthesis | `useRachel.tsx` |

## Database Schema

The MongoDB database stores video information with these key fields:

- `video_title`: Title of the video
- `video_plot`: Summary/description of the video
- `embedding`: Vector embedding of the video content for semantic search

The project also maintains processed content in the `video_chunks` directory, which contains:
- Video files in MP4 format
- Transcripts in TXT format 
- Metadata for AI processing and analysis

## External Service Integration

### Required API Keys

For a complete deployment, you need these API keys:

1. `OPENAI_API_KEY`: For GPT-4, DALL-E 3, and embeddings
2. ElevenLabs API key: For text-to-speech
3. Unsplash API key: For image suggestions
4. MongoDB connection string: For database access

### Rate Limiting and Quotas

Be aware of rate limits for:
- OpenAI APIs (tokens per minute)
- ElevenLabs (characters per month)
- Unsplash (requests per hour)

## Security Considerations

Current security issues that need to be addressed:

1. **Hardcoded API Keys** - These should be moved to environment variables
2. **Exposed Database Credentials** - Should be secured via environment variables
3. **Missing Authentication** - User authentication should be implemented
4. **CORS Configuration** - Proper CORS policies need to be set

## Development Guidelines

### Adding New AI Features

To add a new AI feature:

1. Create a new assistant in the OpenAI dashboard
2. Create a new Python module in the backend/srcs/endpoint directory
3. Implement the assistant integration similar to existing patterns
4. Add a new endpoint in views.py
5. Create a new React component in the frontend
6. Update the URL in constants/index.tsx

### Best Practices

1. Keep assistant interactions stateless where possible
2. Use batch operations for efficiency
3. Implement proper error handling and fallbacks
4. Cache responses where appropriate to reduce API costs
5. Use TypeScript interfaces for all data structures
6. Keep UI components modular and reusable