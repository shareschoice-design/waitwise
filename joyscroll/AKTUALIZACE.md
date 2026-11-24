# Denní aktualizace Joyscrollu

Tento postup provádí každé ráno naplánovaná úloha. Mění jen soubor `joyscroll/stories.json`.

## 1. Najdi nové zprávy

Projdi zprávy vydané za posledních 48 hodin na těchto webech:

- https://www.goodnewsnetwork.org/
- https://www.positive.news/
- https://reasonstobecheerful.world/

Vyber 4 až 8 nových zpráv. Ideálně aspoň jednu z každé skupiny: `priroda`, `zvirata`, `lide`, `objevy`.

## 2. Přísný filtr

Zprávu vynech, pokud se týká některého z těchto témat, i když má dobrý konec:

- válka, armáda, veteráni, teror
- smrt, úmrtí, pohřby, sebevražda
- zločin, soudy, vězení, násilí
- vážné nemoci jako rakovina, demence nebo vzácné dětské choroby
- katastrofy a nehody
- politika, volby, politici a strany

Vynech i zprávu, ve které je nějaký z těchto motivů hlavní. Když si nejsi jistý, zprávu vynech.

## 3. Formát položky

```json
{"id":"kratky-slug","c":"zvirata","d":"2026-11-24","t":"Nadpis česky","s":"Jedna až dvě věty česky.","src":"Good News Network","u":"https://..."}
```

- `id` je unikátní slug z malých písmen bez diakritiky a nesmí se opakovat. Stejný odkaz `u` se do souboru nesmí dostat dvakrát.
- `c` je jedna ze skupin `priroda`, `zvirata`, `lide`, `objevy`.
- `d` je datum vydání článku ve formátu `RRRR-MM-DD`.
- `t` je nadpis v přirozené, hřejivé češtině, nejvýš asi 70 znaků. Nemá to být doslovný překlad ani clickbait.
- `s` obsahuje jednu až dvě krátké věty s konkrétním faktem, nejvýš asi 160 znaků.
- `src` je název zdroje a `u` přímý odkaz `https://` na článek.

## 4. Údržba souboru

- Nové položky přidej na začátek pole `items`.
- Smaž položky, jejichž `d` je starší než 14 dní.
- Udržuj nejvýš 40 položek. Když jich je víc, smaž nejstarší.
- Nastav `updated` na aktuální čas v ISO formátu s časovou zónou Europe/Prague, například `2026-11-25T05:50:00+01:00`.
- Zkontroluj, že je JSON platný: `python3 -c "import json;json.load(open('joyscroll/stories.json'))"`.

## 5. Zveřejnění

Commitni soubor se zprávou `Joyscroll: dobré zprávy RRRR-MM-DD` a pushni ho do větve `main`. GitHub Pages pak appku do pár minut aktualizuje. Pokud žádná vhodná nová zpráva není, nic necommituj.
