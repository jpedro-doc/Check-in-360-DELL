# Check-in 360 · Destinos Piauí

Landing page mobile first, com fundo preto e identidade laranja inspirada na referência NoMerkado. Tailwind CSS compilado localmente; fontes e imagens hospedadas junto à página.

## Abrir e desenvolver

Abra `index.html` no navegador ou sirva a pasta com `python3 -m http.server 8080`.

Para alterar os estilos:

```sh
npm ci
npm run build
```

`src/input.css` é o arquivo-fonte. `styles.css` é o resultado compilado e está versionado para publicação estática. Use `npm run dev` para recompilar enquanto edita. Não é necessário Node no servidor de hospedagem.

## Conteúdo e recursos

- Cota 01: R$ 1.500,00 / 1 ingresso.
- Cota 02: R$ 2.500,00 / 2 ingressos.
- Cota 03: R$ 6.500,00 / tudo da Cota 02, stand no padrão do evento e ativação de marca / 2 ingressos no total.
- Apresentação do projeto, público previsto, quatro pilares e realização.
- Logos oficiais do Check-in 360, ABIH-PI e Hospa em SVG, extraídas dos vetores dos PDFs. ABIH em versão monocromática clara e Hospa com lettering claro para o fundo escuro.
- BGA extraída com sua máscara de transparência original, em WebP, na área de realização e junto à cenografia.
- Galeria ampliável com navegação por botões, teclado e gesto horizontal.
- Entrada do cartão de embarque, revelação de conteúdo, contadores e faixa animada.
- Botão “Pausar efeitos” no rodapé e respeito a `prefers-reduced-motion`.
- CTA fixo no celular após o hero, oculto durante a visualização das cotas.
- Conteúdo legível mesmo sem JavaScript; interações exigem JavaScript.

## Contato comercial

O WhatsApp está configurado como `558698091567` em `script.js`. Os botões das cotas abrem o atendimento com uma mensagem que identifica a cota, o preço e os benefícios. Para trocar o número, altere `WHATSAPP_NUMBER`, mantendo somente números, incluindo país e DDD.

## Publicação

O comando `npm run build` compila o Tailwind e gera `dist/` com HTML, CSS, JavaScript, imagens, fonte e PDF. Na Vercel, `vercel.json` define o preset estático, o build e a pasta de saída. Para outras hospedagens, publique o conteúdo de `dist/`. Após definir o domínio, substitua `og:image` por uma URL absoluta da imagem e adicione `og:url`. A data do evento não foi fornecida e não foi inventada.

## Fontes dos materiais

As informações vêm de `360 ROAD SHOW.pdf`; imagens dos stands, salas e logo BGA vêm do PDF do projeto cenográfico fornecido. O material NoMerkado foi utilizado como referência visual e comercial, sem reutilizar suas métricas, contatos ou benefícios.

A fonte Barlow Condensed é distribuída sob SIL Open Font License; a licença está em `assets/FONT-LICENSE.txt`.
