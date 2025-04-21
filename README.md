# Job Filter Bot - Telegram

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

Um bot inteligente para Telegram que filtra e envia vagas de emprego personalizadas para desenvolvedores e profissionais de TI.

## 📌 Visão Geral

O Job Filter Bot ajuda usuários a encontrar vagas de emprego relevantes baseadas em seus critérios pessoais como:
- Tecnologias preferidas (Node.js, Java, Python, etc.)
- Nível profissional (Júnior, Pleno, Sênior)
- Modelo de trabalho (Remoto, Presencial, Híbrido)
- Faixa salarial
- E outros filtros personalizáveis

## ✨ Funcionalidades

✅ **Filtros Personalizáveis**  
✅ **Notificações Automáticas**  
✅ **Multiplataforma** (vagas de diversas fontes)  
✅ **Interface Intuitiva** via Telegram  
✅ **Configuração Flexível** (mude filtros quando quiser)  

## 🚀 Começando

### Pré-requisitos

- Node.js 16.x ou superior
- Conta no Telegram
- Token do Bot Telegram (obtenha com [@BotFather](https://t.me/BotFather))
- Banco de dados MongoDB (local ou Atlas)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/JobFilterBot.git
cd JobFilterBot
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. Inicie o bot:
```bash
npm start
```

## 🛠 Configuração

Edite o arquivo `.env` com suas configurações:

```ini
TELEGRAM_TOKEN=seu_token_aqui
MONGO_URI=mongodb://localhost:27017/jobFilterBot
PORT=3000
NODE_ENV=development
```

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `/start` | Mensagem de boas-vindas |
| `/searchtype` | Define tipo de vaga (Frontend, Backend, etc) |
| `/workmode` | Escolhe modelo de trabalho (Remoto, Presencial) |
| `/language` | Configura tecnologias desejadas |
| `/level` | Define nível profissional |
| `/salary` | Configura faixa salarial |
| `/commands` | Lista todos os comandos |

## 🤖 Como Usar

1. Inicie uma conversa com o bot no Telegram
2. Use `/start` para começar
3. Configure seus filtros com os comandos disponíveis
4. Receba vagas personalizadas automaticamente ou use `/search` para buscar manualmente

## 📦 Estrutura do Projeto

```
job-filter-bot/
├── config/          # Configurações
├── controllers/     # Lógica dos comandos
├── models/          # Modelos de dados
├── services/        # Integrações externas
├── utils/           # Utilitários
├── .env.example     # Modelo de variáveis
├── app.js           # Ponto de entrada
└── package.json     # Dependências
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙋‍♂️ Suporte

Encontrou um problema? [Abra uma issue](https://github.com/seu-usuario/job-filter-bot/issues) no GitHub.

---

Meu portfólio [fm-developer](https://fm-developer.netlify.app/).
