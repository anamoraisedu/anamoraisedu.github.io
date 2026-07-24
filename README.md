# anamoraisedu.github.io

Site profissional da **Ana Claudia Morais Alves** — pedagoga formada pela Unicamp (Itatiba–SP).
Página única que apresenta os serviços de **atendimento online**, **aulas de reforço** e
**serviços de acolhimento**, com base no currículo da Ana.

## Estrutura

```
.
├── index.html        # página completa (HTML + CSS + JS embutidos)
├── assets/
│   └── ana.jpg        # foto de perfil
├── .nojekyll          # evita processamento do Jekyll no GitHub Pages
└── README.md
```

Não há dependências para instalar. As animações usam **GSAP + ScrollTrigger** carregados via CDN,
e as fontes (Fraunces + Nunito Sans) vêm do Google Fonts.

## Ver localmente

Basta abrir o `index.html` no navegador. Para servir com um servidor local:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Publicar no GitHub Pages

Este repositório é um **user site** (`anamoraisedu.github.io`), então o Pages publica
automaticamente o conteúdo da branch principal:

```bash
git add .
git commit -m "Publica site da Ana Morais"
git push origin main
```

Em **Settings → Pages**, confirme que a *Source* é a branch principal (`/root`).
O site fica disponível em **https://anamoraisedu.github.io**.

## Como atualizar o conteúdo

Tudo o que aparece na página está no `index.html`, em texto simples e em português:

- **Serviços** — seção `id="servicos"` (três cards).
- **Sobre / formação** — seção `id="sobre"`.
- **Trajetória** — seção `id="trajetoria"`.
- **Contato** — WhatsApp, e-mail e LinkedIn na seção `id="contato"` e no rodapé.

### Trocar a foto
Substitua o arquivo `assets/ana.jpg` mantendo o mesmo nome (ideal: retrato, rosto na parte
superior). Ajuste fino de enquadramento em `.photo-frame img { object-position: ... }`.

### Dados de contato (já preenchidos)
- WhatsApp/telefone: **(19) 99413-9785** → links `https://wa.me/5519994139785`
- E-mail: **Anamoraisalves93@gmail.com**
- LinkedIn: `ana-claudia-moraisalves-420373364`

## Acessibilidade

- Respeita `prefers-reduced-motion`: usuários com essa preferência veem a página
  completa e estática, sem animações.
- Contraste, `alt` na imagem, foco visível no teclado e navegação por âncoras.
