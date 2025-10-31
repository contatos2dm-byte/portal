# Coletivo Dois de Muitos - Arquivo Vivo

Uma página estática e poética para registro, curadoria e transparência do Coletivo Dois de Muitos. Alimentada por arquivo JSON, pronta para hospedagem no GitHub Pages.

## Visão Geral

Este projeto implementa um **portal curatorial** que apresenta o Coletivo Dois de Muitos com linguagem afetiva, conectando todas as criações, obras certificadas e movimentos de doação. A página é totalmente estática, sem expor dados sensíveis no código, mantendo segurança e transparência.

### Características Principais

- **Página estática** pura (HTML + React + Tailwind CSS)
- **Dados alimentados por JSON** — fácil de atualizar sem modificar código
- **Design responsivo** — funciona perfeitamente em desktop, tablet e mobile
- **Sem dados sensíveis no repositório** — emails, wallets e contatos vêm apenas do JSON
- **Pronta para GitHub Pages** — deploy automático com GitHub Actions
- **Design poético e afetivo** — visual que comunica emoção e propósito

## Estrutura do Projeto

```
coletivo-2demuitos/
├── client/
│   ├── public/
│   │   └── data.json          ← Arquivo de dados (EDITAR AQUI!)
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx       ← Página principal
│   │   ├── components/        ← Componentes reutilizáveis
│   │   ├── App.tsx            ← Roteamento e layout
│   │   └── index.css          ← Estilos globais
│   └── index.html             ← Template HTML
├── package.json               ← Dependências
├── vite.config.ts             ← Configuração de build
└── README.md                  ← Este arquivo
```

## Como Usar

### 1. Instalação Local

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/coletivo-2demuitos.git
cd coletivo-2demuitos
pnpm install
```

### 2. Desenvolvimento Local

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A página estará disponível em `http://localhost:5173`

### 3. Editar Dados

**Todos os dados da página vêm do arquivo `client/public/data.json`.**

Abra este arquivo e edite as informações:

```json
{
  "project": {
    "name": "Coletivo Dois de Muitos",
    "tagline": "Somos o que se espalha. Somos o que permanece.",
    ...
  },
  "works": [
    {
      "title": "Sua obra aqui",
      "author": "Seu nome",
      ...
    }
  ],
  ...
}
```

Salve o arquivo e a página será atualizada automaticamente no navegador.

### 4. Build para Produção

Gere a versão estática otimizada:

```bash
pnpm build
```

Os arquivos compilados estarão em `dist/`

### 5. Deploy no GitHub Pages

#### Opção A: Usando GitHub Actions (Automático)

1. Crie um repositório público no GitHub
2. Faça push do código:
   ```bash
   git push origin main
   ```
3. Vá para **Settings → Pages** e configure:
   - Source: `GitHub Actions`
   - A ação será executada automaticamente

#### Opção B: Deploy Manual

1. Faça build: `pnpm build`
2. Crie uma branch `gh-pages`:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy"
   git push origin gh-pages
   ```
3. Vá para **Settings → Pages** e configure Source como `gh-pages`

Sua página estará disponível em: `https://seu-usuario.github.io/coletivo-2demuitos`

## Estrutura do Arquivo JSON

### Seção `project`

Informações básicas do coletivo:

```json
{
  "project": {
    "name": "Nome do coletivo",
    "tagline": "Frase de impacto",
    "subtitle": "Subtítulo",
    "description": "Descrição longa",
    "foundedYear": 2018
  }
}
```

### Seção `manifesto`

Declaração de visão e propósito:

```json
{
  "manifesto": {
    "title": "Título do manifesto",
    "content": "Conteúdo principal",
    "vision": "Visão de longo prazo"
  }
}
```

### Seção `works`

Obras certificadas com hash e blockchain:

```json
{
  "works": [
    {
      "id": "work_001",
      "title": "Título da obra",
      "type": "Tipo (Música, Podcast, etc)",
      "author": "Nome do autor",
      "registrationDate": "2025-01-15",
      "hash": "SHA-256 hash aqui",
      "blockchain": "Polygon",
      "description": "Descrição da obra",
      "links": {
        "listen": "URL ou null",
        "download": "URL ou null",
        "view": "URL ou null"
      }
    }
  ]
}
```

### Seção `collections`

Categorias de criações (Podcast, Jardim Digital, etc):

```json
{
  "collections": [
    {
      "id": "collection_001",
      "name": "🎧 Podcast Dois de Muitos",
      "emoji": "🎧",
      "description": "Descrição da coleção",
      "link": "URL ou null"
    }
  ]
}
```

### Seção `donations`

Informações sobre arrecadações e impacto:

```json
{
  "donations": {
    "totalRaised": "0.142 MATIC",
    "conversions": [
      {
        "amount": "0.142 MATIC",
        "convertedTo": "42 cestas básicas",
        "partner": "Casa Comum",
        "date": "2025-10-01"
      }
    ],
    "lastUpdate": "2025-10-01"
  }
}
```

### Seção `participation`

Chamadas à ação para participação:

```json
{
  "participation": {
    "title": "Como participar",
    "description": "Descrição de como participar",
    "actions": [
      {
        "id": "action_donate",
        "title": "Fazer uma doação",
        "icon": "💠"
      }
    ]
  }
}
```

### Seção `footer`

Links e informações do rodapé:

```json
{
  "footer": {
    "links": [
      {
        "title": "GitHub Repo",
        "url": "https://github.com/...",
        "icon": "💾"
      }
    ],
    "note": "Nota de transparência"
  }
}
```

## Fluxo de Atualização

Sempre que você quiser atualizar a página:

1. **Edite** o arquivo `client/public/data.json`
2. **Teste** localmente com `pnpm dev`
3. **Faça commit** e **push** para o GitHub
4. **GitHub Actions** fará o build e deploy automaticamente

Não é necessário modificar código HTML ou JavaScript — tudo vem do JSON!

## Segurança e Privacidade

### ✅ Dados Seguros

- **Nenhum dado sensível no código** — tudo vem do JSON
- **JSON é público** — mas você controla o que entra nele
- **Sem backend** — sem servidor para comprometer
- **Sem banco de dados** — sem risco de vazamento

### ⚠️ Dados a Proteger

Se você adicionar informações sensíveis ao `data.json`, elas serão públicas. Mantenha fora:

- Emails completos (use apenas domínio se necessário)
- Chaves privadas de wallet
- Senhas ou tokens
- Informações pessoais detalhadas

### Recomendação

Para contato e doações, use:
- Formulários Google Forms (link externo)
- Botões que redirecionam para WhatsApp, Telegram, etc.
- Endereços de wallet públicos (ok, pois são públicos por natureza)

## Customização

### Alterar Cores e Estilos

Edite `client/src/index.css` para mudar a paleta de cores:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.6%;
    /* ... mais cores ... */
  }
}
```

### Adicionar Novas Seções

1. Adicione dados ao `data.json`
2. Crie um novo componente em `client/src/components/`
3. Importe e use em `client/src/pages/Home.tsx`

### Integrar com Formulários

Para registrar novas obras, você pode:

- Usar **Google Forms** (link externo)
- Usar **FormSubmit** (formulário simples)
- Criar um **backend futuro** (upgrade para web-db-user)

## Troubleshooting

### Página não carrega dados

1. Verifique se `client/public/data.json` existe
2. Valide o JSON em `https://jsonlint.com`
3. Abra o console do navegador (F12) e procure por erros

### Build falha

```bash
# Limpe cache e reinstale
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### GitHub Pages não atualiza

1. Verifique se **GitHub Actions** está ativado
2. Vá para **Actions** e verifique se o workflow passou
3. Limpe cache do navegador (Ctrl+Shift+Del)

## Próximos Passos

Depois de publicar a página:

1. **Compartilhe o link** em redes sociais
2. **Atualize dados regularmente** — adicione novas obras, doações, etc.
3. **Colete feedback** — o que as pessoas querem ver?
4. **Expanda o projeto** — considere adicionar:
   - Formulário de registro de obras (Google Forms ou backend)
   - Integração com IPFS para armazenar metadados
   - Chatbot de acolhimento
   - Newsletter ou mailing list

## Stack Técnico

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Build**: Vite
- **Hospedagem**: GitHub Pages
- **CI/CD**: GitHub Actions

## Licença

Este projeto é parte do Coletivo Dois de Muitos e segue a filosofia de bem comum. Sinta-se livre para adaptar, compartilhar e melhorar.

## Suporte

Para dúvidas ou sugestões:

1. Abra uma **Issue** no GitHub
2. Envie um email para contato@2demuitos.art
3. Converse com a IA Manus para ajustes rápidos

---

**Última atualização**: Outubro 2025

*"Somos o que se espalha. Somos o que permanece."*
