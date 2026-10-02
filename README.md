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
- Logo oficial da BGA junto às perspectivas da cenografia.
- Galeria ampliável com navegação por botões, teclado e gesto horizontal.
- Entrada do cartão de embarque, revelação de conteúdo, contadores e faixa animada.
- Botão “Pausar efeitos” no rodapé e respeito a `prefers-reduced-motion`.
- CTA fixo no celular após o hero, oculto durante a visualização das cotas.
- Conteúdo legível mesmo sem JavaScript; interações exigem JavaScript.

## Contato comercial

Preencha `WHATSAPP_NUMBER` em `script.js`, somente com números, incluindo país e DDD. Enquanto não configurado, os botões abrem uma mensagem para copiar; não enviam nem registram reservas.

## Publicação

Publique `index.html`, `styles.css`, `script.js`, `assets/` e `360 ROAD SHOW.pdf` juntos. Após definir o domínio, substitua `og:image` por uma URL absoluta da imagem e adicione `og:url`. A data do evento não foi fornecida e não foi inventada.

## Fontes dos materiais

As informações vêm de `360 ROAD SHOW.pdf`; imagens dos stands, salas e logo BGA vêm do PDF do projeto cenográfico fornecido. O material NoMerkado foi utilizado como referência visual e comercial, sem reutilizar suas métricas, contatos ou benefícios.

A fonte Barlow Condensed é distribuída sob SIL Open Font License; a licença está em `assets/FONT-LICENSE.txt`.
