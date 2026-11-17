# Galaxy Store

Marketplace de personagens do Rubinot com identidade neon azul/roxa.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- MongoDB Atlas (configuração preparada; conexão real na próxima etapa)
- Contato de negociação via WhatsApp

## Rodar localmente
1. Instale Node.js 20+
2. Execute `npm install`
3. Copie `.env.example` para `.env.local` e configure as variáveis
4. Execute `npm run dev`

## MVP atual
- Vitrine responsiva com filtros por vocação e busca
- Ficha detalhada do personagem
- Formulário de cadastro manual
- Importação por link em modo rascunho (não faz scraping nem afirma validar o anúncio)
- Botão WhatsApp

## Segurança e dados
Nunca coloque credenciais MongoDB ou tokens no código. O importador deve usar fonte autorizada e validar os dados antes de publicar.
