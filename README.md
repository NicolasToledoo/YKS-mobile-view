# YKS Mobile View — Mobile Device Emulator

[![Version](https://img.shields.io/badge/version-v4.0.0-purple?style=for-the-badge&color=8b5cf6)](https://github.com/yksmobileview/yks-mobile-view/releases)
[![License](https://img.shields.io/badge/license-MIT-purple?style=for-the-badge&color=8b5cf6)](LICENSE)
[![Manifest](https://img.shields.io/badge/manifest-V3-purple?style=for-the-badge&color=8b5cf6)](https://developer.chrome.com/docs/extensions/reference/manifest/)

Extensão para Google Chrome que emula dispositivos móveis com **spoofing completo de navegador** — User-Agent, `devicePixelRatio`, dimensões de tela, orientação e meta viewport — tudo rodando em um **iframe isolado** (sandbox), garantindo que a página original permaneça intacta. 100% local, sem envio de dados.

---

## 📱 Funcionalidades

- **45 dispositivos predefinidos** (36 smartphones + 9 tablets) organizados por marca
- **Spoofing completo do navegador** via JavaScript injetado no mundo `MAIN`
- **Isolamento via iframe sandbox** — o site emulado roda em iframe, não na aba original
- **Orientação retrato/paisagem** com um clique
- **Meta viewport corrigida** — zoom automático baseado na resolução do dispositivo
- **Context menu** — clique com o botão direito em qualquer página e escolha um dispositivo
- **Captura de tela** — salva PNG do simulador em um clique, via atalho ou menu de contexto
- **Atalhos de teclado** — `Ctrl+Shift+M` para ativar/desativar, `Ctrl+Shift+S` para screenshot
- **Viewport customizado** — insira dimensões personalizadas
- **Busca e favoritos** — encontre dispositivos rapidamente e fixe os mais usados
- **Persistência completa** — última seleção, orientação, favoritos e estado são salvos automaticamente
- **Design minimalista** — tema escuro com detalhes magenta e emerald

---

## 📐 Dispositivos Incluídos (45)

### Apple (16 iPhones + 4 iPads)

| Dispositivo | Resolução | Scale |
|---|---|---|
| iPhone 4s | 320 × 480 | @1x |
| iPhone SE | 320 × 568 | @2x |
| iPhone 7 | 375 × 667 | @2x |
| iPhone 8 | 375 × 667 | @2x |
| iPhone X | 375 × 812 | @3x |
| iPhone 11 | 414 × 896 | @2x |
| iPhone 12 | 390 × 844 | @3x |
| iPhone 13 | 390 × 844 | @3x |
| iPhone 14 | 393 × 852 | @3x |
| iPhone 15 | 393 × 852 | @3x |
| iPhone 16 | 393 × 852 | @3x |
| iPhone 12 Pro Max | 428 × 926 | @3x |
| iPhone 13 Pro Max | 428 × 926 | @3x |
| iPhone 14 Pro Max | 430 × 932 | @3x |
| iPhone 15 Pro Max | 440 × 932 | @3x |
| iPhone 16 Pro Max | 440 × 956 | @3x |
| iPad Air 11" | 820 × 1180 | @2x |
| iPad Air 13" | 1032 × 1376 | @2x |
| iPad Pro 11" | 834 × 1194 | @2x |
| iPad Pro 12.9" | 1024 × 1366 | @2x |

### Samsung (9 phones + 1 tablet)

| Dispositivo | Resolução | Scale |
|---|---|---|
| Galaxy S4 | 360 × 640 | @3x |
| Galaxy S8+ | 360 × 740 | @4x |
| Galaxy S20 | 360 × 800 | @3x |
| Galaxy S21 | 360 × 800 | @3x |
| Galaxy S22 | 360 × 780 | @3x |
| Galaxy S23 | 360 × 780 | @3x |
| Galaxy S24 | 360 × 780 | @3x |
| Galaxy S24 Ultra | 412 × 915 | @3.5x |
| Galaxy A54 | 412 × 915 | @2.625x |
| Galaxy View (tablet) | 1080 × 1920 | @1x |

### Google Pixel (7)

| Dispositivo | Resolução | Scale |
|---|---|---|
| Pixel 5 | 393 × 851 | @2.625x |
| Pixel 5a | 412 × 860 | @2.625x |
| Pixel 6 | 412 × 869 | @2.625x |
| Pixel 7 | 412 × 869 | @2.625x |
| Pixel 8 | 412 × 869 | @2.625x |
| Pixel 8 Pro | 430 × 932 | @3.75x |
| Pixel 9 | 412 × 915 | @2.625x |

### Outras Marcas (7)

| Dispositivo | Resolução | Scale | Marca |
|---|---|---|---|
| Redmi Note 9 | 393 × 851 | @2.5x | Xiaomi |
| Redmi Note 12 | 393 × 873 | @2.5x | Xiaomi |
| Xperia XZ1 Compact | 360 × 640 | @2x | Sony |
| OnePlus 12 | 412 × 915 | @3x | OnePlus |
| Lenovo Tab M9 | 800 × 1280 | @2x | Lenovo |
| TCL Tab 10 | 800 × 1280 | @2x | TCL |
| Tablet 7" | 600 × 1024 | @1.5x | Genérico |

---

## 🚀 Instalação

1. Clone ou baixe este repositório
2. Abra o Google Chrome
3. Acesse `chrome://extensions/`
4. Ative o **Modo do desenvolvedor** (toggle no canto superior direito)
5. Clique em **Carregar sem compactação**
6. Selecione a pasta `yks-mobile-view`

---

## 🎯 Como Usar

### Via Popup (barra de ferramentas)

1. Clique no ícone da extensão na barra de ferramentas do Chrome
2. Selecione o dispositivo desejado na lista (use a barra de busca para filtrar)
3. Fixe dispositivos favoritos clicando na estrelinha (☆)
4. Use os botões de orientação para alternar entre retrato e paisagem
5. Clique em **Reset** para fechar o simulador e voltar ao tamanho original
6. Insira dimensões personalizadas no campo CUSTOM VIEWPORT e clique em Apply

### Via Context Menu (botão direito)

1. Navegue até qualquer página compatível
2. Clique com o botão direito → **YKS Mobile View**
3. Selecione um smartphone ou tablet na lista suspensa

### Via Atalhos de Teclado

| Atalho | Ação |
|---|---|
| `Ctrl+Shift+M` | Ativa/desativa a emulação (Pixel 5 por padrão) |
| `Ctrl+Shift+S` | Tira uma captura de tela do simulador |

---

## 🔧 Spoofing de Navegador

O simulador injeta um script (`spoofer.js`) no mundo `MAIN` do iframe, que sobrescrei os seguintes objetos do `navigator`:

| Propriedade | Valor spoofado |
|---|---|
| `navigator.userAgent` | User-Agent específico do dispositivo |
| `navigator.platform` | `iPhone` (iOS) ou `Linux armv8l` (Android) |
| `navigator.appVersion` | Derivado do User-Agent |
| `navigator.userAgentData` | Brands, `mobile: true`, platform, high-entropy values |
| `devicePixelRatio` | Escala do dispositivo (ex: `@2x`, `@3x`) |
| `window.outerWidth/Height` | Dimensões do viewport |
| `window.screen.width/height` | Dimensões de tela |
| `window.screen.availWidth/Height` | Dimensões disponíveis |
| `window.screen.colorDepth / pixelDepth` | 24 |
| `screen.orientation.angle` | 0 (retrato) ou 90 (paisagem) |
| `screen.orientation.type` | `portrait-primary` ou `landscape-primary` |
| Meta viewport | Zoom calculado para ajustar a escala |

Além disso, `frame-spoofer.js` (content script injetado em todos os frames) **esconde a propriedade `frameElement`**, impedindo que o site dentro do iframe faça `window.top` ou `window.parent` breakout.

---

## 📂 Estrutura do Projeto

```
yks-mobile-view/
├── manifest.json              # Configuração da extensão (Manifest V3)
├── rules.json                 # Regras declarativeNetRequest (frame rules)
├── background/
│   └── background.js          # Service worker — gerencia simulador, spoofing, screenshots
├── popup/
│   ├── popup.html             # Interface do popup (lista de dispositivos, busca, custom viewport)
│   ├── popup.css              # Estilos — dark theme com grid, noise, orbs magenta/emerald
│   └── popup.js              # Lógica: renderização, busca, favoritos, mensagens para background
├── content/
│   └── content.js            # Content script — badge overlay mostrando dispositivo ativo
├── simulator/
│   ├── simulator.html         # Página do simulador — iframe sandboxed + top bar
│   ├── simulator.css          # Estilos do simulador
│   └── simulator.js          # Resize do iframe, parse de hash, injeção de spoofer
├── shared/
│   ├── devices.js             # Fonte única: 45 presets + categorias + ícones de marca (SVG)
│   ├── spoofer.js            # Spoofer injectado no MAIN world do iframe
│   ├── frame-spoofer.js      # Esconde frameElement (document_start, todos os frames)
│   └── utils.js              # Utilities: storage, tabs, formatação, filenames
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## ⚙️ Permissões (manifest.json)

| Permissão | Propósito |
|---|---|
| `activeTab` | Acessa a aba ativa para obter a URL alvo |
| `storage` | Persiste dispositivo ativo, orientação e favoritos |
| `tabs` | Gerencia abas do simulador (abrir/fechar/atualizar) |
| `contextMenus` | Cria o menu de contexto com todos os dispositivos |
| `scripting` | Injeta scripts no iframe (spoofer) |
| `downloads` | Salva capturas de tela como PNG |
| `webNavigation` | Detecta frames carregados no simulador |
| `declarativeNetRequest` | Aplica regras de cabeçalho (CSP) via `rules.json` |
| `declarativeNetRequestWithHostAccess` | Acesso estendido às regras de rede |
| `<all_urls>` (host) | Executa content scripts e acessa páginas em qualquer origem |

---

## 🛠️ Requisitos Técnicos

- Google Chrome versão 88 ou superior
- Manifest V3
- JavaScript ES6+ (service worker)

---

## 🏗️ Arquitetura: Como o Spoofing Funciona

```
[Popup / Context Menu / Shortcut]
        │
        ▼  chrome.runtime.sendMessage()
[background.js — Service Worker]
        │ 1. Abre nova aba com simulator.html
        │ 2. Passa deviceId, orientation, targetUrl via URL hash
        ▼
[simulator.html]
        │ 1. Parseia hash → obém deviceId + targetUrl
        │ 2. Carrega targetUrl no iframe sandboxed
        │    (sandbox: allow-scripts, allow-same-origin, etc.)
        │ 3. Envia mensagem "iframeReady" ao background
        ▼
[background.js — handleIframeReady()]
        │ 1. Obtém todos os frames via chrome.webNavigation
        │ 2. Encontra o frame do iframe (não about:blank)
        │ 3. Injeta shared/spoofer.js via chrome.scripting.executeScript()
        │    no mundo MAIN, passando a config do dispositivo
        ▼
[spoofer.js — dentro do iframe, MAIN world]
        │ 1. Lê config de window.name
        │ 2. Sobrescrei navigator.userAgent, platform, appVersion
        │ 3. Sobrescrei devicePixelRatio, screen.*, outerWidth/Height
        │ 4. Corrige meta viewport com zoom calculado
        │ 5. Bloqueia window.open('_top'/_parent')
```

**Fonte única de dispositivos:** todas as 45 presets, categorias e ícones SVG de marca estão em `shared/devices.js`, usado tanto pelo popup quanto pelo background via `importScripts()`.

---

## 👨‍💻 Desenvolvido por

**YKS** — Solução em emulação de dispositivos mobile para desenvolvimento web

---

⭐ Se esta extensão foi útil, deixe uma estrela no repositório!
