import type { Project } from '../types/project';

/**
 * Source of truth for case-study content. Transcribed from the approved
 * "VOID OS" design mock (Claude Design project 56958985-7ef0-49d8-a71b-97a0fe6b01eb).
 * No CMS/API — edit this file directly to add or change projects.
 */
export const projects: Project[] = [
  {
    id: 'supplier',
    tag: 'SA',
    color1: '#e0a527',
    color2: '#b8801a',
    repo: 'https://github.com/voidmain69/supplier-aggregation',
    ua: {
      file: 'supplier-aggregation.doc',
      kicker: 'ПРОЄКТ · 2026',
      name: 'Supplier Aggregation Platform',
      sub: 'Єдина точка правди про товари, ціни та наявність у багатьох постачальників — для людей, внутрішніх сервісів і AI-агентів.',
      shot: '[ скріншот: curation UI / dashboard ]',
      meta: [
        { key: 'Роль', value: 'AI Solutions Architect — архітектура, контракти, ingestion, MCP' },
        {
          key: 'Стек',
          value:
            'Python 3.12 · FastAPI · Kafka/Redpanda · PostgreSQL + TimescaleDB + pgvector · S3 · MCP',
        },
        { key: 'Масштаб', value: '10 сервісів у монорепо, event-driven, 79 комітів' },
        { key: 'Статус', value: 'v1.0 — наскрізний конвеєр працює, покритий тестами' },
      ],
      sections: [
        {
          heading: 'Задача',
          body: 'Коли товари закуповуються в багатьох постачальників, один товар має свій артикул у кожного, ціни залежать від акаунта, а історія цін ніде не фіксується. Треба звести це в одну модель — і зробити її придатною і для людей, і для AI-агентів.',
          bullets: [],
        },
        {
          heading: 'Рішення',
          body: '',
          bullets: [
            'Канонічний товар: точні збіги за EAN/UPC зводяться автоматично, решта — через RAG-кандидати (pgvector) з підтвердженням оператора.',
            'Мультиакаунтні офери: окрема пропозиція на кожен акаунт постачальника + розрахунок ефективної ціни з умовами.',
            'Історія цін на TimescaleDB: денні агрегати, тренди, точка «найдешевше за весь час».',
            'Гібридний пошук: FTS + семантика, RRF-злиття, cross-encoder rerank, SPLADE.',
            'MCP-шлюз: AI-агент шукає, порівнює ціни й наявність без окремої інтеграції.',
          ],
        },
        {
          heading: 'Інженерні рішення',
          body: 'Ingestion — event-driven з урахуванням лімітів постачальника (3 rps на акаунт); читання — синхронний REST з передбачуваною латентністю. Матчинг свідомо консервативний: помилкове злиття двох різних товарів дорожче за пропущений збіг.',
          bullets: [],
        },
        {
          heading: 'Результат',
          body: 'Кожен сервіс віддає OpenAPI 3.1 з описами під LLM і tool_manifest.json; `make up` піднімає весь стек локально. Рішення зафіксовані в ADR.',
          bullets: [],
        },
      ],
      tags: [
        'Python 3.12',
        'FastAPI',
        'Kafka',
        'TimescaleDB',
        'pgvector',
        'MCP',
        'RAG',
        'Event-driven',
      ],
      cta: 'Відкрити репозиторій →',
    },
    en: {
      file: 'supplier-aggregation.doc',
      kicker: 'PROJECT · 2026',
      name: 'Supplier Aggregation Platform',
      sub: 'A single source of truth for products, prices and availability across many suppliers — for people, internal services and AI agents.',
      shot: '[ screenshot: curation UI / dashboard ]',
      meta: [
        { key: 'Role', value: 'AI Solutions Architect — architecture, contracts, ingestion, MCP' },
        {
          key: 'Stack',
          value:
            'Python 3.12 · FastAPI · Kafka/Redpanda · PostgreSQL + TimescaleDB + pgvector · S3 · MCP',
        },
        { key: 'Scale', value: '10 services in a monorepo, event-driven, 79 commits' },
        { key: 'Status', value: 'v1.0 — end-to-end pipeline works, covered by tests' },
      ],
      sections: [
        {
          heading: 'Problem',
          body: 'Buying from many suppliers means one product has a different SKU everywhere, prices depend on the account, and price history is lost. It all had to collapse into one model — usable by humans and AI agents alike.',
          bullets: [],
        },
        {
          heading: 'Solution',
          body: '',
          bullets: [
            'Canonical product: exact GTIN matches merge automatically, the rest go through RAG candidates (pgvector) with operator confirmation.',
            'Multi-account offers: one offer per supplier account plus an effective price that accounts for terms.',
            'Price history on TimescaleDB: daily aggregates, trends, all-time-low marker.',
            'Hybrid search: FTS + semantic, RRF fusion, cross-encoder rerank, SPLADE.',
            'MCP gateway: an agent searches, compares prices and stock with no bespoke integration.',
          ],
        },
        {
          heading: 'Engineering calls',
          body: 'Ingestion is event-driven and respects supplier limits (3 rps per account); reads are synchronous REST with predictable latency. Matching is deliberately conservative — a wrong merge costs more than a missed match.',
          bullets: [],
        },
        {
          heading: 'Outcome',
          body: 'Every service ships OpenAPI 3.1 with LLM-facing descriptions and a tool_manifest.json; `make up` brings the whole stack up locally. Decisions are recorded as ADRs.',
          bullets: [],
        },
      ],
      tags: [
        'Python 3.12',
        'FastAPI',
        'Kafka',
        'TimescaleDB',
        'pgvector',
        'MCP',
        'RAG',
        'Event-driven',
      ],
      cta: 'Open repository →',
    },
  },
  {
    id: 'wiki',
    tag: 'PW',
    color1: '#6ea8d8',
    color2: '#3d7cb0',
    repo: 'https://github.com/voidmain69/product-wiki',
    ua: {
      file: 'product-wiki.doc',
      kicker: 'ПРОЄКТ · 2026',
      name: 'Product Wiki — вікіпедія товарів',
      sub: 'Некомерційний RAG-сервіс достовірної інформації про товари: дані лише з офіційних сайтів виробників, кожна відповідь чату має посилання на першоджерело.',
      shot: '[ скріншот: чат із цитатами / сторінка товару ]',
      meta: [
        { key: 'Роль', value: 'AI Solutions Engineer — пайплайн, retrieval, чат-оркестрація' },
        {
          key: 'Стек',
          value: 'TypeScript monorepo · Next.js · Fastify · NATS · Qdrant · Drizzle · Python (ML)',
        },
        {
          key: 'Моделі',
          value: 'BGE-M3 dense + SPLADE sparse + bge-reranker-v2-m3 (TEI), qwen2.5 через ollama',
        },
        { key: 'Статус', value: 'Фаза 1 (MVP) завершена, перевірена на реальних даних Logitech' },
      ],
      sections: [
        {
          heading: 'Задача',
          body: 'Інформація про товари в мережі перемішана з рекламою й переказами. Треба сервіс, який відповідає тільки тим, що справді написано у виробника — і показує, де саме.',
          bullets: [],
        },
        {
          heading: 'Як працює',
          body: 'Stateless-воркери спілкуються лише через події NATS і сховища, події публікуються через transactional outbox.',
          bullets: [
            'Fetcher автодетектує рушій сайту (static / headless / api-replay / document), дотримується robots.txt, кладе immutable-снапшоти в S3.',
            'Extractor — каскад від детермінованого: JSON-LD → API-payload → recipes → LLM з self-check «значення є на сторінці».',
            'Normalizer канонізує одиниці до SI, Resolver веде append-only ревізії з provenance.',
            'Чат: intent → гібридний retrieval (dense+sparse, RRF) → rerank → відповідь стрімом через SSE з клікабельними цитатами.',
          ],
        },
        {
          heading: 'Гарантії довіри',
          body: 'Дані лише з верифікованих доменів виробників, provenance на кожен атрибут, «немає даних» замість здогадки, детермінована таблиця порівняння будується кодом — LLM лише коментує.',
          bullets: [],
        },
        {
          heading: 'Інженерна дисципліна',
          body: 'Архітектурний гвард меж шарів, typecheck, lint, юніт-тести й білд у CI на кожну зміну. Dev↔real — перемикання env без змін коду, тож CI працює без GPU.',
          bullets: [],
        },
      ],
      tags: ['TypeScript', 'Next.js', 'NATS', 'Qdrant', 'BGE-M3', 'SPLADE', 'RAG', 'SSE'],
      cta: 'Відкрити репозиторій →',
    },
    en: {
      file: 'product-wiki.doc',
      kicker: 'PROJECT · 2026',
      name: 'Product Wiki — a wikipedia of products',
      sub: 'A non-commercial RAG service for trustworthy product information: data comes only from official manufacturer sites, and every chat answer cites its source.',
      shot: '[ screenshot: cited chat / product page ]',
      meta: [
        { key: 'Role', value: 'AI Solutions Engineer — pipeline, retrieval, chat orchestration' },
        {
          key: 'Stack',
          value: 'TypeScript monorepo · Next.js · Fastify · NATS · Qdrant · Drizzle · Python (ML)',
        },
        {
          key: 'Models',
          value: 'BGE-M3 dense + SPLADE sparse + bge-reranker-v2-m3 (TEI), qwen2.5 via ollama',
        },
        { key: 'Status', value: 'Phase 1 (MVP) complete, verified on real Logitech data' },
      ],
      sections: [
        {
          heading: 'Problem',
          body: 'Product information online is mixed with ads and hearsay. The service answers only with what the manufacturer actually published — and shows exactly where.',
          bullets: [],
        },
        {
          heading: 'How it works',
          body: 'Stateless workers talk only through NATS events and storage; events are published via a transactional outbox.',
          bullets: [
            'Fetcher auto-detects the site engine (static / headless / api-replay / document), respects robots.txt, stores immutable snapshots in S3.',
            'Extractor runs a deterministic-first cascade: JSON-LD → API payloads → recipes → LLM with a self-check that values appear on the page.',
            'Normalizer canonicalises units to SI; Resolver writes append-only revisions with provenance.',
            'Chat: intent → hybrid retrieval (dense+sparse, RRF) → rerank → grounded answer streamed over SSE with clickable citations.',
          ],
        },
        {
          heading: 'Trust guarantees',
          body: 'Verified manufacturer domains only, provenance on every attribute, "no data" instead of a guess, and a deterministic comparison table built in code — the LLM only comments.',
          bullets: [],
        },
        {
          heading: 'Engineering discipline',
          body: 'An architecture-boundary guard, typecheck, lint, unit tests and a web build run in CI on every change. Dev↔real is an environment switch with no code change, so CI needs no GPU.',
          bullets: [],
        },
      ],
      tags: ['TypeScript', 'Next.js', 'NATS', 'Qdrant', 'BGE-M3', 'SPLADE', 'RAG', 'SSE'],
      cta: 'Open repository →',
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
