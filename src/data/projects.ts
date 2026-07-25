import type { Project } from '../types/project';

/**
 * Source of truth for case-study content. Transcribed from the current resume —
 * these are internal/proprietary solutions built at ERC, so there's no public
 * repo to link (see `Project.repo`, intentionally omitted here).
 * No CMS/API — edit this file directly to add or change projects.
 */
export const projects: Project[] = [
  {
    id: 'pim',
    tag: 'PIM',
    color1: '#e0a527',
    color2: '#b8801a',
    ua: {
      file: 'pim-platform.doc',
      kicker: 'ПРОЄКТ · 2026',
      name: 'PIM-платформа: автоматизація товарного контенту',
      sub: 'Каталог дистриб’ютора — 1200+ категорій і десятки тисяч SKU. AI-пайплайн перетворює сирі дані Icecat і таксономії партнерів у готові картки товару без ручного проєктування схем.',
      shot: '[ скріншот: PIM curation UI ]',
      meta: [
        {
          key: 'Роль',
          value: 'Head of AI / AI Solution Architect — архітектура, промпти, пайплайн',
        },
        {
          key: 'Стек',
          value:
            'Node.js · Fastify · PostgreSQL/Prisma · Redis/BullMQ · Qdrant + TEI · MinIO · Ollama/OpenAI · React · Turborepo',
        },
        { key: 'Масштаб', value: '1200+ категорій, десятки тисяч SKU' },
        { key: 'Статус', value: 'У продакшн-експлуатації в ERC' },
      ],
      sections: [
        {
          heading: 'Задача',
          body: 'Стоковий API наявної ASPX-системи (ASP.NET WebForms + SQL Server) повертає лише базові дані без жодних характеристик товару.',
          bullets: [
            'Заповнення характеристик вручну для тисяч SKU не масштабується разом з асортиментом.',
            'Кожен канал продажів (сайт, Rozetka, партнерські B2B-фіди) вимагає власної структури для тих самих характеристик.',
            'Проєктування шаблону нової категорії вручну — окрема трудомістка задача для кожної з 1200+ категорій.',
            'Icecat віддає тисячі сирих характеристик з непослідовними назвами полів — мапити вручну нереально.',
            'Дані з Icecat часто неповні: товар без обов’язкових характеристик не публікується в канали продажів.',
            'Категорії партнерів (Rozetka, Epicentr) і конкурентів (Brain) не збігаються 1:1 із власною таксономією.',
            'Пошук має одночасно обробляти точні запити за артикулом і природномовні запити за характеристиками.',
          ],
        },
        {
          heading: 'Рішення',
          body: '',
          bullets: [
            'Автоматичне здобуття характеристик з Icecat і детерміністичне проєктування на шаблон категорії через версіоновані мапінг-конфіги; оператор лише валідує результат.',
            'AI-генерація шаблону категорії з довільного тексту специфікації (LLM, перемикання Ollama↔OpenAI однією змінною середовища).',
            'AI-підбір мапінгу характеристик Icecat на поля шаблону — оператор лише підтверджує.',
            'AI-збагачення карток: LLM добудовує обов’язкові поля з текстових описів, походження кожного значення позначається окремо для аудиту.',
            'AI-підказки мапінгу таксономій партнерів і конкурентів з валідацією проти реального довідника ID — захист від галюцинованих категорій.',
            'Гібридний RAG-пошук (dense+sparse у Qdrant + fuzzy у Postgres + cross-encoder реранкер), з деградацією на Postgres, якщо AI-інфраструктура недоступна.',
          ],
        },
        {
          heading: 'Інженерні рішення',
          body: 'Багатоетапний пайплайн на BullMQ (здобуття, нормалізація, AI-збагачення, мапінг атрибутів, векторизація, публікація) з ізольованими фоновими задачами. AI-виклики йдуть через єдину точку входу з контрактом плавної деградації — збій AI-провайдера не зупиняє пайплайн. Кастомізація промптів і few-shot прикладів для кожної категорії — за бізнес-користувачем, без релізу коду.',
          bullets: [],
        },
        {
          heading: 'Результат',
          body: 'Час заведення однієї товарної позиції скоротився з ~14 хв (ручна робота бренд-менеджера) до ~2 хв. Автоматична трансформація на шаблони таксономій партнерів пришвидшила заведення нової товарної позиції з 7 днів до 1 дня, що позитивно вплинуло на оборотність складу.',
          bullets: [],
        },
      ],
      tags: ['Node.js', 'Fastify', 'PostgreSQL', 'Prisma', 'Redis/BullMQ', 'Qdrant', 'RAG', 'LLM'],
    },
    en: {
      file: 'pim-platform.doc',
      kicker: 'PROJECT · 2026',
      name: 'PIM Platform: Automating Product Content',
      sub: 'The distributor catalog spans 1,200+ categories and tens of thousands of SKUs. An AI pipeline turns raw Icecat data and partner taxonomies into finished product cards without hand-designed schemas.',
      shot: '[ screenshot: PIM curation UI ]',
      meta: [
        {
          key: 'Role',
          value: 'Head of AI / AI Solution Architect — architecture, prompts, pipeline',
        },
        {
          key: 'Stack',
          value:
            'Node.js · Fastify · PostgreSQL/Prisma · Redis/BullMQ · Qdrant + TEI · MinIO · Ollama/OpenAI · React · Turborepo',
        },
        { key: 'Scale', value: '1,200+ categories, tens of thousands of SKUs' },
        { key: 'Status', value: 'In production at ERC' },
      ],
      sections: [
        {
          heading: 'Problem',
          body: "The legacy ASPX system's (ASP.NET WebForms + SQL Server) stock API returns only bare product data, no attributes at all.",
          bullets: [
            "Filling in attributes by hand for thousands of SKUs doesn't scale with the assortment.",
            'Every sales channel (own site, Rozetka, partner B2B feeds) needs its own structure for the same attributes.',
            "Designing a new category's template (groups and fields) by hand is its own effort — for each of 1,200+ categories.",
            "Icecat returns thousands of raw attributes per category with inconsistent field names — mapping them by hand isn't realistic.",
            "Icecat data is often incomplete: a product missing required attributes doesn't get published to sales channels.",
            "Partner (Rozetka, Epicentr) and competitor (Brain) categories don't map 1:1 to the in-house taxonomy.",
            'Search has to handle exact SKU/model lookups and natural-language attribute queries at once — no single classic approach covers both.',
          ],
        },
        {
          heading: 'Solution',
          body: '',
          bullets: [
            'Automated Icecat ingestion with deterministic mapping onto the category template via versioned mapping configs; an operator only validates the result.',
            'AI-generated category templates from free-text specs (LLM, Ollama↔OpenAI swappable via one env var).',
            'AI-suggested mapping from raw Icecat attributes to template fields — an operator just confirms.',
            "AI enrichment: an LLM fills in required fields still missing after deterministic mapping, from text descriptions; each value's provenance is tagged separately for audit.",
            'AI-suggested taxonomy mapping for partner/competitor categories, validated against the real ID reference before it reaches an operator — guards against hallucinated categories.',
            'Hybrid RAG search (dense+sparse in Qdrant + fuzzy in Postgres + cross-encoder reranker), degrading to Postgres search if the AI infrastructure is unavailable.',
          ],
        },
        {
          heading: 'Engineering calls',
          body: "A multi-stage BullMQ pipeline (ingestion, normalization, AI enrichment, attribute mapping, vectorization, publishing) with isolated background jobs. AI calls go through a single entry point with a graceful-degradation contract — a provider outage doesn't stop the pipeline. Prompt and few-shot example tuning per category is a business-user task, no code release needed.",
          bullets: [],
        },
        {
          heading: 'Outcome',
          body: 'Time to onboard a single product listing dropped from ~14 minutes (manual brand-manager work) to ~2 minutes. Automatic transformation onto partner taxonomies sped up onboarding a new listing from 7 days to 1 day, improving inventory turnover.',
          bullets: [],
        },
      ],
      tags: ['Node.js', 'Fastify', 'PostgreSQL', 'Prisma', 'Redis/BullMQ', 'Qdrant', 'RAG', 'LLM'],
    },
  },
  {
    id: 'competitor-intel',
    tag: 'CI',
    color1: '#c4562f',
    color2: '#8c3a1d',
    ua: {
      file: 'competitor-intel.doc',
      kicker: 'ПРОЄКТ · 2026',
      name: 'Сервіс конкурентної розвідки',
      sub: 'Ціни конкурентів неможливо зіставити за штрихкодом — конкурентний товар часто має інший GTIN або є лише аналогом. AI-суддя матчить товари за характеристиками, а не за кодом.',
      shot: '[ скріншот: дашборд відстеження цін ]',
      meta: [
        { key: 'Роль', value: 'Head of AI — архітектура, промпт-інжиніринг LLM-судді' },
        { key: 'Підхід', value: 'RAG-пошук кандидатів + LLM-as-a-judge реранкінг' },
        { key: 'Дані', value: 'Плагінні конектори, шифроване зберігання креденшалів' },
        { key: 'Статус', value: 'У продакшн-експлуатації в ERC' },
      ],
      sections: [
        {
          heading: 'Задача',
          body: 'Ціни конкурентів неможливо зіставити за штрихкодом — конкурентний товар часто має інший GTIN або взагалі є аналогом, а не тим самим товаром. Ручний моніторинг не покриває асортимент.',
          bullets: [],
        },
        {
          heading: 'Рішення',
          body: '',
          bullets: [
            'Матчинг за характеристиками замість GTIN: векторний пошук кандидатів (RAG) із подальшим реранкінгом LLM-суддею.',
            'Критерій конкурентності (точний аналог чи товар того самого класу) задається промптом судді — бізнес змінює правила матчингу без зміни коду.',
            'Плагінні конектори до джерел даних, відстеження цін, алерти.',
            'Шифроване зберігання креденшалів, окрема БД за патерном database-per-service.',
          ],
        },
        {
          heading: 'Результат',
          body: 'Ручний конкурентний аналіз, що займав кілька годин щотижня, повністю автоматизовано. Оперативне реагування на зміну ринкової кон’юнктури підвищило маржинальність за рахунок точнішого ціноутворення «в ринок». Запуск моніторингу нових категорій пришвидшився в рази завдяки автоматизації первинного аналізу ринку.',
          bullets: [],
        },
      ],
      tags: ['RAG', 'LLM-as-a-judge', 'Vector search', 'Database-per-service'],
    },
    en: {
      file: 'competitor-intel.doc',
      kicker: 'PROJECT · 2026',
      name: 'Competitor Intelligence Service',
      sub: "Competitor prices can't be matched by barcode — a competing product often has a different GTIN, or is only an equivalent, not the same item. An LLM judge matches by attributes instead of by code.",
      shot: '[ screenshot: price-tracking dashboard ]',
      meta: [
        { key: 'Role', value: 'Head of AI — architecture, LLM-judge prompt engineering' },
        { key: 'Approach', value: 'RAG candidate search + LLM-as-a-judge reranking' },
        { key: 'Data', value: 'Pluggable source connectors, encrypted credential storage' },
        { key: 'Status', value: 'In production at ERC' },
      ],
      sections: [
        {
          heading: 'Problem',
          body: "Competitor prices can't be matched by barcode — a competing product often carries a different GTIN, or is simply an equivalent rather than the same item. Manual monitoring doesn't cover the assortment.",
          bullets: [],
        },
        {
          heading: 'Solution',
          body: '',
          bullets: [
            'Attribute-based matching instead of GTIN: vector candidate search (RAG) followed by LLM-judge reranking.',
            "The competitiveness criterion (exact equivalent vs. same product class) is set via the judge's prompt — the business changes matching rules without a code change.",
            'Pluggable source connectors, price tracking, alerts.',
            'Encrypted credential storage, a separate database per the database-per-service pattern.',
          ],
        },
        {
          heading: 'Outcome',
          body: 'Manual competitive analysis that used to take several hours a week is now fully automated. Faster reaction to market shifts improved margins through more accurate market-rate pricing. Rolling out monitoring for new categories got several times faster thanks to automated initial market analysis.',
          bullets: [],
        },
      ],
      tags: ['RAG', 'LLM-as-a-judge', 'Vector search', 'Database-per-service'],
    },
  },
  {
    id: 'wiki',
    tag: 'PW',
    color1: '#6ea8d8',
    color2: '#3d7cb0',
    ua: {
      file: 'product-wiki.doc',
      kicker: 'ПРОЄКТ · 2026',
      name: '«Вікіпедія товарів»',
      sub: 'Платні агрегатори контенту покривають не весь асортимент, а їхні дані бувають неповними чи застарілими. Власний сервіс здобуває характеристики, описи й зображення напряму з сайтів виробників.',
      shot: '[ скріншот: картка товару з джерелом даних ]',
      meta: [
        { key: 'Роль', value: 'Head of AI — архітектура сервісу здобуття даних' },
        { key: 'Джерело даних', value: 'Сайти виробників напряму, незалежно від Icecat' },
        { key: 'Ефект на якість', value: '17%→3% помилок (некритичні), 8%→1% (критичні)' },
        { key: 'Статус', value: 'У продакшн-експлуатації, живить PIM і RAG-контур' },
      ],
      sections: [
        {
          heading: 'Задача',
          body: 'Платні агрегатори контенту (Icecat) покривають не весь асортимент, а їхні дані бувають неповними чи застарілими. Залежність від одного джерела блокує автоматизацію.',
          bullets: [],
        },
        {
          heading: 'Рішення',
          body: 'Сервіс, що здобуває характеристики, описи та зображення безпосередньо з сайтів виробників і формує власне незалежне джерело даних про товар. Живить PIM-пайплайн та RAG-контур наповнення контенту.',
          bullets: [],
        },
        {
          heading: 'Результат',
          body: 'Заощадили десятки тисяч доларів на рік на платних агрегаторах контенту завдяки власному незалежному джерелу даних. Відсоток помилок при заведенні товару скоротився з 17% до 3% (некритичні) та з 8% до 1% (критичні) — точніші й актуальніші дані від виробників напряму усунули основне джерело браку в картках товару.',
          bullets: [],
        },
      ],
      tags: ['Python', 'Web scraping', 'RAG', 'Data pipeline'],
    },
    en: {
      file: 'product-wiki.doc',
      kicker: 'PROJECT · 2026',
      name: 'The "Product Wikipedia"',
      sub: "Paid content aggregators don't cover the whole assortment, and their data is often incomplete or stale. An in-house service pulls attributes, descriptions and images straight from manufacturer sites.",
      shot: '[ screenshot: product card with data source ]',
      meta: [
        { key: 'Role', value: 'Head of AI — data-acquisition service architecture' },
        { key: 'Data source', value: 'Manufacturer sites directly, independent of Icecat' },
        { key: 'Quality impact', value: '17%→3% errors (non-critical), 8%→1% (critical)' },
        { key: 'Status', value: 'In production, feeds the PIM and RAG pipelines' },
      ],
      sections: [
        {
          heading: 'Problem',
          body: "Paid content aggregators (Icecat) don't cover the whole assortment, and their data is often incomplete or stale. Depending on a single source blocks automation.",
          bullets: [],
        },
        {
          heading: 'Solution',
          body: 'A service that pulls attributes, descriptions and images directly from manufacturer sites and builds its own independent product data source. Feeds the PIM pipeline and the content-enrichment RAG pipeline.',
          bullets: [],
        },
        {
          heading: 'Outcome',
          body: 'Saved tens of thousands of dollars a year on paid content aggregators thanks to an independent in-house data source. Product-onboarding error rate dropped from 17% to 3% (non-critical) and from 8% to 1% (critical) — more accurate, current data straight from manufacturers removed the main source of defects in product cards.',
          bullets: [],
        },
      ],
      tags: ['Python', 'Web scraping', 'RAG', 'Data pipeline'],
    },
  },
  {
    id: 'pc-configurator',
    tag: 'CFG',
    color1: '#4d8f74',
    color2: '#2f7a44',
    ua: {
      file: 'pc-configurator.doc',
      kicker: 'ПРОЄКТ · 2026',
      name: 'PC Configurator — e-commerce платформа кастомних ПК',
      sub: 'Купівля кастомного ПК вимагає експертизи: покупець не може сам гарантувати сумісність компонентів. Self-service платформа з перевіркою сумісності на бекенді та AI-асистентом.',
      shot: '[ скріншот: покроковий конфігуратор ]',
      meta: [
        { key: 'Роль', value: 'Head of AI / AI Solution Architect' },
        {
          key: 'Масштаб',
          value:
            '14 000+ рядків backend TypeScript · 41 сервіс · 27 Prisma-моделей · 60+ API-ендпоінтів · 6 BullMQ-воркерів',
        },
        { key: 'Фронтенд', value: 'React, 16 сторінок, локалізація UA/EN' },
        { key: 'Статус', value: 'У продакшн-експлуатації, B2C/B2B' },
      ],
      sections: [
        {
          heading: 'Задача',
          body: 'Купівля кастомного ПК вимагає експертизи: покупець не може сам гарантувати сумісність компонентів, тому продаж збірок онлайн упирався в менеджера. Потрібен self-service канал, де клієнт конфігурує ПК самостійно, а замовлення без ручної обробки йде у виробництво.',
          bullets: [],
        },
        {
          heading: 'Рішення',
          body: '',
          bullets: [
            'Повноцінна B2C/B2B-платформа: конфігуратор з покроковим підбором комплектуючих, каталог з фасетним пошуком, спільнота публічних збірок, кошик/checkout, особистий кабінет. Три ролі з окремим партнерським ціноутворенням.',
            'Перевірка сумісності повністю на бекенді (single source of truth): сокет CPU/материнської плати, тип і кількість планок пам’яті, потужність БЖ відносно TDP системи, форм-фактор корпусу.',
            'AI-асистент з 18+ інтентами (підбір збірки під бюджет, заміна деталі, статус замовлення, акції): семантичний RAG-пошук, голосове введення, взаємозамінні LLM-провайдери.',
            'AI Build Evaluator аналізує збірку на bottleneck і збалансованість.',
            'Автоматична синхронізація каталогу з дистриб’ютором (ERC API): ціни кожні 20 хвилин, повний каталог щодня. Замовлення зберігає snapshot цін, тому зміни каталогу не впливають на прийняті замовлення.',
          ],
        },
        {
          heading: 'Результат',
          body: '14 000+ рядків backend TypeScript, 41 сервіс, 27 Prisma-моделей, 60+ API-ендпоінтів, 6 BullMQ-воркерів; React-фронтенд на 16 сторінок з локалізацією UA/EN. У щоденній продакшн-експлуатації.',
          bullets: [],
        },
      ],
      tags: ['TypeScript', 'React', 'Prisma', 'BullMQ', 'RAG', 'AI Assistant'],
    },
    en: {
      file: 'pc-configurator.doc',
      kicker: 'PROJECT · 2026',
      name: 'PC Configurator — Custom PC E-Commerce Platform',
      sub: "Buying a custom PC takes expertise: a shopper can't guarantee component compatibility on their own, so online sales bottlenecked on a sales rep. A self-service platform checks compatibility server-side and ships an AI assistant.",
      shot: '[ screenshot: step-by-step configurator ]',
      meta: [
        { key: 'Role', value: 'Head of AI / AI Solution Architect' },
        {
          key: 'Scale',
          value:
            '14,000+ lines of backend TypeScript · 41 services · 27 Prisma models · 60+ API endpoints · 6 BullMQ workers',
        },
        { key: 'Frontend', value: 'React, 16 pages, UA/EN localization' },
        { key: 'Status', value: 'In production, B2C/B2B' },
      ],
      sections: [
        {
          heading: 'Problem',
          body: "Buying a custom PC takes expertise: a shopper can't guarantee component compatibility on their own, so selling builds online bottlenecked on a sales rep. The need was a self-service channel where a customer configures a PC on their own and the order flows into manufacturing without manual handling.",
          bullets: [],
        },
        {
          heading: 'Solution',
          body: '',
          bullets: [
            'A full B2C/B2B platform: a step-by-step component configurator, faceted-search catalog, a community of public builds, cart/checkout, an account area. Three roles with separate partner pricing.',
            'Compatibility checking fully server-side (single source of truth): CPU/motherboard socket, memory type and slot count, PSU wattage against system TDP, case form factor.',
            'An AI assistant with 18+ intents (build-to-budget, part swaps, order status, promotions): semantic RAG search, voice input, swappable LLM providers.',
            'An AI Build Evaluator analyzes a build for bottlenecks and balance.',
            'Automatic catalog sync with the distributor (ERC API): prices every 20 minutes, full catalog daily. Orders keep a price snapshot, so catalog changes never affect accepted orders.',
          ],
        },
        {
          heading: 'Outcome',
          body: '14,000+ lines of backend TypeScript, 41 services, 27 Prisma models, 60+ API endpoints, 6 BullMQ workers; a React frontend spanning 16 pages with UA/EN localization. In daily production use.',
          bullets: [],
        },
      ],
      tags: ['TypeScript', 'React', 'Prisma', 'BullMQ', 'RAG', 'AI Assistant'],
    },
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
