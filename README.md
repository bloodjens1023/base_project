🎰 Giro77 — Nuxt 4

Online gaming web application — Nuxt 4 + Vue 3 + Tailwind + DaisyUI

📋 Technical Stack
Technology	Version	Role
Nuxt 4	^4.x	SSR framework
Vue 3	^3.x	Reactive UI
TypeScript	^5.x	Static typing
Tailwind CSS	^4.x	Utility-first CSS
DaisyUI	^5.x	UI components + themes
Lucide Vue	^0.x	Icons
Vue I18n	^9.x	Internationalization
📁 Project Structure
├── app/
│   ├── app.vue                  # Main entry, theme binding
│   ├── assets/
│   │   ├── css/main.css         # Tailwind base
│   │   └── tailwind.css         # Custom DaisyUI themes
│   ├── components/
│   │   ├── global/
│   │   │   ├── TheHeader.vue    # Fixed header with menu + theme
│   │   │   └── TheFooter.vue    # Footer navigation (5 tabs)
│   │   ├── Home/
│   │   │   ├── GameSection.vue  # Game grid with lazy loading
│   │   │   ├── NavigationButtons.vue # Category tabs + search
│   │   │   ├── AnimationsNum.vue     # Animated withdrawal banner
│   │   │   └── BottomSection.vue     # Footer content
│   │   ├── HeaderGlobal.vue     # Internal page header
│   │   ├── LoadingSkeleton.vue  # Game skeleton (YouTube style)
│   │   ├── ServiceSkeleton.vue  # Service page skeleton
│   │   ├── Loading.vue          # Orb spinner
│   │   ├── MenuAside.vue        # Sliding side menu
│   │   ├── MenuAsideContent.vue # Side menu content
│   │   ├── ServiceButton.vue    # Customer service button
│   │   ├── Rewards.vue          # Rewards banner
│   │   ├── RoundedButton.vue    # Rounded icon button
│   │   └── Translate.vue        # Language selector
│   ├── layouts/
│   │   ├── default.vue          # Layout without header/footer
│   │   └── home.vue             # Layout with header/footer
│   ├── pages/
│   │   ├── index.vue            # Home page
│   │   ├── login.vue            # Login
│   │   ├── register.vue         # Register
│   │   ├── deposit.vue          # PIX deposit
│   │   ├── withdrawal.vue       # Withdrawal with CPF
│   │   ├── personal.vue         # User profile
│   │   └── service.vue          # Customer service
│   └── plugins/
│       └── theme.client.ts      # Initialize theme before hydration
├── composables/
│   └── useTheme.ts              # Dark/light theme management
├── server/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.post.ts
│   │   │   └── register.post.ts
│   │   ├── game/
│   │   │   ├── list.get.ts
│   │   │   └── in.get.ts
│   │   ├── user/
│   │   │   ├── info.get.ts
│   │   │   ├── vip.get.ts
│   │   │   ├── cards.get.ts
│   │   │   └── withdraw-pwd.post.ts
│   │   ├── recharge/
│   │   │   ├── channels.get.ts
│   │   │   ├── submit.get.ts
│   │   │   └── status.get.ts
│   │   ├── withdraw/
│   │   │   ├── limits.get.ts
│   │   │   ├── history.get.ts
│   │   │   ├── channel-types.get.ts
│   │   │   └── submit.post.ts
│   │   ├── config/
│   │   │   └── service.get.ts
│   │   ├── agent/info.get.ts
│   │   ├── notice/list.get.ts
│   │   ├── local/checkin.get.ts
│   │   └── analytics/event.post.ts
│   └── utils/
│       └── api.ts               # Centralized request utility
├── i18n/
│   └── locales/
│       ├── en.json
│       └── pt-BR.json
├── public/
│   └── asset/                   # Local static assets
├── .env.example                 # Environment variables template
├── nuxt.config.ts
├── tailwind.config.ts
└── tsconfig.json

🚀 Installation
# Clone the project
git clone https://github.com/bloodjens1023/base_project.git
cd base_project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

⚙️ .env Configuration
# PRIVATE — server only
NUXT_API_BASE=https://eg-cf.wdang.vip
NUXT_LOCAL_API_BASE=https://sapi.uqianbao.com

# PUBLIC — visible on client
NUXT_PUBLIC_ASSETS_URL=https://downpg117.uqianbao.com/source/public
NUXT_PUBLIC_IMAGE_ASSETS_URL=https://downpg117.sp-slots1.com/source/public
NUXT_PUBLIC_SUPPORT_EMAIL=support@giro77.bet
NUXT_PUBLIC_UPDATE_TIME=2025-12-03 08:30:53


⚠️ Never commit the .env file — it is in .gitignore

💻 Development
npm run dev
# → http://localhost:3000

🏗️ Production
# Build
npm run build

# Local preview
npm run preview

🎨 Themes

The project supports 2 themes defined in app/tailwind.css:

Theme	Name	Description
🌙 Dark	mytheme	Dark blue background #061237
☀️ Light	mytheme2	Golden background #544e26

The theme is persisted in localStorage and applied before Vue hydration via app/plugins/theme.client.ts — no flash on reload.

🌐 Internationalization

2 supported languages:

Language	Code	File
Brazilian Portuguese	pt-br	i18n/locales/pt-BR.json
English	en	i18n/locales/en.json

Default language is pt-br. The selector is in the side menu (Translate.vue).

🔌 API

All Nuxt API routes (server/api/) act as proxies to external backends. Base URLs are configured in .env and never exposed to the client.

server/utils/api.ts centralizes:

apiRequest() — main API calls

localApiRequest() — legacy API calls

buildHeaders() — standard headers (client-type, Authorization)

ensureOk() — response validation

extractToken() — read token from headers

Authentication

Protected endpoints require Authorization: <token> (no Bearer prefix).

📱 Pages
Route	Page	Auth required
/	Home — game list	No
/login	Login	No
/register	Register	No
/deposit	PIX deposit	Yes
/withdrawal	CPF withdrawal	Yes
/personal	User profile	Yes
/service	Customer service	No
🧩 Key Components
GameSection.vue

Progressive game display — categories load on scroll (YouTube-style) via IntersectionObserver. Skeleton shimmer during initial loading.

useTheme.ts

Theme management composable. Exposes toggleTheme(), setTheme(), currentTheme.

server/utils/api.ts

All communication with external backends goes through this file. Never call external APIs directly from the frontend.

🤝 Contribution

Create a branch: git checkout -b feat/my-feature

Commit: git commit -m "feat: description"

Push: git push origin feat/my-feature

Open a Pull Request

Commit conventions
feat:     new feature
fix:      bug fix
style:    CSS/design change
refactor: refactoring without behavior change
chore:    maintenance (deps, config)
