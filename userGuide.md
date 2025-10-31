# Coletivo Dois de Muitos - Guia de Uso

## O que é esta página?

Esta é uma página estática que funciona como **arquivo vivo e curatorial** do Coletivo Dois de Muitos. Ela apresenta suas criações, obras certificadas e movimentos de doação de forma poética e transparente.

## Powered by Manus

**Frontend**: React 19 + TypeScript + Tailwind CSS 4 com componentes shadcn/ui para interface moderna e responsiva.

**Hospedagem**: GitHub Pages com deploy automático via GitHub Actions — infraestrutura de auto-scaling com CDN global.

**Dados**: Arquivo JSON que alimenta toda a página — fácil de atualizar sem tocar em código.

## Usando Sua Página

### 1. Visualizar a Página

Acesse o link do seu repositório GitHub Pages. A página mostra:

- **Manifesto**: A visão e propósito do coletivo
- **O que já floresceu**: Categorias de criações (Podcast, Jardim Digital, Livros, etc.)
- **Obras Certificadas**: Registros com hash SHA-256 e blockchain
- **Movimentos de Doação**: Transparência sobre arrecadações e impacto
- **Como Participar**: Chamadas à ação para envolvimento

### 2. Atualizar Dados

Todos os dados vêm do arquivo `data.json`. Para atualizar:

1. Abra `client/public/data.json` no seu editor
2. Edite as informações (nomes, descrições, links, etc.)
3. Salve o arquivo
4. Faça **commit** e **push** para o GitHub
5. Aguarde alguns minutos — GitHub Actions fará o build e deploy

**Exemplo**: Para adicionar uma nova obra certificada, adicione um objeto à seção `works`:

```json
{
  "id": "work_003",
  "title": "Título da sua obra",
  "type": "Tipo (Música, Podcast, etc)",
  "author": "Seu nome",
  "registrationDate": "2025-10-30",
  "hash": "seu-hash-sha256-aqui",
  "blockchain": "Polygon",
  "description": "Descrição da obra",
  "links": {
    "listen": null,
    "download": null,
    "view": null
  }
}
```

### 3. Adicionar Links Externos

Na seção `collections`, você pode adicionar links para suas plataformas:

```json
{
  "id": "collection_001",
  "name": "🎧 Podcast Dois de Muitos",
  "emoji": "🎧",
  "description": "Escute as conversas sobre cultura e inovação coletiva.",
  "link": "https://seu-link-aqui.com"
}
```

## Gerenciando Sua Página

### Estrutura de Pastas

```
coletivo-2demuitos/
├── client/
│   ├── public/
│   │   └── data.json          ← EDITAR AQUI para atualizar dados
│   └── src/
│       └── pages/
│           └── Home.tsx       ← Página principal (não editar)
├── README.md                  ← Documentação técnica
└── userGuide.md              ← Este arquivo
```

### Fluxo de Atualização

1. **Edite** `client/public/data.json`
2. **Teste** localmente (opcional): `pnpm dev`
3. **Commit**: `git add . && git commit -m "Atualizar dados"`
4. **Push**: `git push origin main`
5. **Aguarde**: GitHub Actions fará o deploy (2-5 minutos)

### Dados Sensíveis

**Importante**: Tudo no arquivo `data.json` é público. Não adicione:

- Emails completos
- Chaves privadas
- Senhas ou tokens
- Informações pessoais detalhadas

Para contato, use:
- Links para WhatsApp, Telegram, etc.
- Formulários Google Forms (link externo)
- Endereços de wallet públicos (estes são públicos por natureza)

## Próximos Passos

Depois de publicar:

1. **Compartilhe** o link em suas redes sociais
2. **Atualize regularmente** — adicione novas obras, doações, eventos
3. **Colete feedback** — o que seu público quer ver?
4. **Expanda** — considere adicionar:
   - Formulário de registro de obras (Google Forms)
   - Integração com IPFS para metadados
   - Chatbot de acolhimento
   - Newsletter

## Suporte Técnico

Se algo não funcionar:

1. **Verifique o JSON**: Abra em `https://jsonlint.com` para validar
2. **Limpe cache**: Pressione Ctrl+Shift+Del no navegador
3. **Verifique GitHub Actions**: Vá para a aba "Actions" do seu repositório
4. **Converse com Manus**: Peça ajuda para ajustes rápidos

---

**Lembre-se**: Esta página é um arquivo vivo. Atualize-a regularmente para manter seu público conectado com o que o Coletivo está criando.

*"Somos o que se espalha. Somos o que permanece."*
