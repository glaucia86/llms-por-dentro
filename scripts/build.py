"""Bundle the offline presentation and derive Markdown notes from its source."""
from pathlib import Path
from html.parser import HTMLParser
import html
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'episodes/01-texto-aos-numeros/index.html'
CSS = ROOT / 'shared/css/theme.css'
JS = ROOT / 'shared/js/deck.js'


class NotesText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
    def handle_starttag(self, tag, attrs):
        if tag == 'h3': self.parts.append('\n\n### ')
        elif tag in ('p','li','br'): self.parts.append('\n\n')
        elif tag == 'strong': self.parts.append('**')
    def handle_endtag(self, tag):
        if tag == 'strong': self.parts.append('**')
        elif tag in ('p','h3','li'): self.parts.append('\n\n')
    def handle_data(self, data):
        self.parts.append(data)
    def text(self):
        return re.sub(r'\n\s*\n\s*\n+', '\n\n', ''.join(self.parts)).strip()


def build():
    source = SOURCE.read_text(encoding='utf-8')
    css = CSS.read_text(encoding='utf-8')
    js = JS.read_text(encoding='utf-8')
    if '</script' in js.lower():
        raise ValueError('An inline script must not contain a closing script tag')
    result = source.replace('<link rel="stylesheet" href="../../shared/css/theme.css">', '<style>\n'+css+'\n</style>')
    result = result.replace('<script src="../../shared/js/deck.js"></script>', '<script>\n'+js+'\n</script>')
    (ROOT / 'dist').mkdir(exist_ok=True)
    (ROOT / 'dist/episodio-01.html').write_text(result, encoding='utf-8')

    sections = re.findall(r'<section class="slide\b[^>]*>[\s\S]*?</section>', source)
    notes = ['# Episódio 01: roteiro da apresentadora', '',
             '45 minutos de conteúdo e 5 minutos de perguntas. Três anexos ficam fora do tempo principal.', '',
             'O roteiro abaixo deriva das notas dos slides. Para alterá-lo, edite o `aside.notes` no HTML fonte e execute `python3 scripts/build.py`.', '',
             'Compartilhe somente a janela dos slides. Pressione S para abrir as notas em outra janela. As setas revelam informações antes de avançar quando houver uma revelação.', '']
    elapsed = 0
    for i, section in enumerate(sections, 1):
        title = html.unescape(re.sub('<[^>]+>', '', re.search(r'<h[12]>([\s\S]*?)</h[12]>', section)[1]))
        seconds = int(re.search(r'data-timing="(\d+)"', section)[1])
        optional = 'data-appendix="true"' in section
        aside = re.search(r'<aside class="notes">([\s\S]*?)</aside>', section)[1]
        parser = NotesText(); parser.feed(aside)
        notes += [f'## Slide {i:02d}: {title}', '',
                  'Anexo opcional, fora do roteiro principal.' if optional else f'Duração sugerida: {seconds/60:g} min. Referência acumulada: {elapsed/60:g}–{(elapsed+seconds)/60:g} min.', '',
                  parser.text(), '']
        if not optional: elapsed += seconds
    (SOURCE.parent / 'speaker-notes.md').write_text('\n'.join(notes), encoding='utf-8')
    print(f'Built dist/episodio-01.html: {len(result.encode())} bytes, {len(sections)} slides, {elapsed//60} minutes')
    print(f'Speaker notes: {len(" ".join(notes).split())} words')


if __name__ == '__main__':
    build()
