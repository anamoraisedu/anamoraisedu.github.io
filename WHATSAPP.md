# Mensagens do WhatsApp

Dois conjuntos de texto trabalham juntos:

1. **As mensagens do site** — já vêm preenchidas quando alguém clica num botão de
   WhatsApp. Ficam no `index.html`, no parâmetro `?text=` dos links `wa.me`.
2. **As respostas automáticas** — configuradas no app **WhatsApp Business**, no
   celular. Não estão no código.

Regra que guia as duas: **nada é perguntado duas vezes**. Quem já preencheu no
site não deve reencontrar as mesmas perguntas na resposta automática.

---

## 1. Mensagens do site (já publicadas)

Uma para cada tipo de atendimento. A saudação é a mesma; mudam os tópicos.

### Atendimento Online
> Olá, Ana! Vim pelo seu site e tenho interesse no atendimento online. 😊
>
> • Estudante (idade e ano escolar):
> • O que estamos buscando:
> • Melhores dias e horários:

### Aulas de Reforço
> Olá, Ana! Vim pelo seu site e tenho interesse nas aulas de reforço. 😊
>
> • Estudante (idade e ano escolar):
> • Matérias ou dificuldades:
> • Prefiro online ou presencial em Itatiba:

### Serviços de Acolhimento
> Olá, Ana! Vim pelo seu site e gostaria de saber mais sobre os serviços de acolhimento. 😊
>
> • Estudante (idade e ano escolar):
> • O que temos percebido:
> • Há acompanhamento ou diagnóstico?

### Geral
Usada onde o visitante ainda não escolheu um serviço: menu do topo, hero, botão
do card de contato, lista de contato e botão flutuante.

> Olá, Ana! Vim pelo seu site e gostaria de saber mais sobre seus atendimentos. 😊
>
> • Serviço de interesse:
> • Estudante (idade e ano escolar):
> • O que estamos buscando:

**Para alterar:** os textos ficam codificados na URL. Edite pelo script abaixo em
vez de escrever `%C3%A1` à mão:

```bash
python3 -c "import urllib.parse; print(urllib.parse.quote('''Seu texto aqui''', safe=''))"
```

---

## 2. Respostas automáticas (configurar no WhatsApp Business)

Só existem no app **WhatsApp Business**, que é gratuito e aceita migrar o número
atual mantendo as conversas. Caminho:

**Configurações → Ferramentas comerciais → Mensagem de saudação / Mensagem de ausência**

A mensagem de ausência exige definir antes o horário de atendimento.

### Mensagem de saudação
Dispara no primeiro contato de alguém novo.

> Olá! Aqui é a Ana Claudia, pedagoga formada pela Unicamp. 💛
>
> Recebi sua mensagem e já vou ler com calma — respondo pessoalmente em seguida.
>
> Se você veio pelo site, as informações já chegaram aqui: não precisa repetir nada.

### Mensagem de ausência
Fora do horário de atendimento.

> Oi! Recebi sua mensagem, obrigada pelo contato. 💛
>
> Estou fora do horário de atendimento agora, mas respondo assim que possível —
> normalmente em até um dia útil.
>
> Está tudo registrado aqui, não precisa reenviar.

### Variação para o período das gravações
Trocar a mensagem de ausência por esta durante as viagens de gravação do
*Mapa Falado*, quando o fuso atrapalha a resposta.

> Oi! Obrigada pela mensagem. 💛
>
> Estou em viagem de gravação pela América do Sul, então posso demorar um pouco
> mais para responder — mas respondo, sim.
>
> Sua mensagem já está guardada aqui, pode ficar tranquilo(a).

---

## Ao responder pessoalmente

Retome o que a pessoa escreveu, em vez de recomeçar do zero:

> "Oi! Vi que o Pedro está no 3º ano e vocês têm buscado apoio em matemática..."

É isso que fecha o ciclo e mostra que a mensagem foi lida.

## Respostas rápidas (opcional)

Ainda em **Ferramentas comerciais**, valem atalhos chamados por `/` para o que
se repete: valores, disponibilidade na agenda, como funciona o atendimento
online, e o endereço para o atendimento presencial em Itatiba.
