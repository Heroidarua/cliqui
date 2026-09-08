# sos01.com.br — Manda o link pro seu amigo!

![sos01](./media/images/og.png)

[![Site](https://img.shields.io/badge/ao_vivo-x2x.netlify.app-34eb7d)](https://x2x.netlify.app/)

### O que é isso?
Uma pegadinha que faz o navegador de quem abre o link parecer que foi invadido: janelas
se multiplicando, vídeos no repeat, download forçado e a tela de "VOCÊ FOI HACKEADO".
O código é baseado no [TheAnnoyingSite](https://theannoyingsite.com) do Feross
Aboukhadijeh, adaptado pro português.

**Aviso:** a página é inofensiva. Não instala nada, não pega dado nenhum, e os arquivos
que ela baixa no navegador da vítima são só fotos e vídeos.

---

## Como funciona
Tudo está em `index.js`: as janelas pop-up (`wins`), as frases que passeiam na tela
(`PHRASES`), as buscas forçadas (`SEARCHES`) e a lista de arquivos que ele baixa
(`FILE_DOWNLOADS`). Quer adicionar uma interação nova? É uma função no `index.js` e um
call no `init()`.

## Como rodar
```bash
git clone https://github.com/SEU_USUARIO/sos01.git
cd sos01
