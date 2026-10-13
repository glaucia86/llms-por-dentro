"""Checks packaging and educational invariants using Python's standard library."""
from pathlib import Path
from html.parser import HTMLParser
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
DECK = ROOT / 'dist/episodio-01.html'


class DeckParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.slides = []
        self.notes = 0
        self.external = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'section' and 'slide' in a.get('class', '').split():
            self.slides.append(a)
        if tag == 'aside' and a.get('class') == 'notes':
            self.notes += 1
        if tag in ('script','link','img','iframe'):
            value = a.get('src', a.get('href', ''))
            if value and not value.startswith(('data:', '#')):
                self.external.append(value)


class PackageTests(unittest.TestCase):
    def setUp(self):
        self.assertTrue(DECK.is_file(), 'The self-contained presentation must exist')
        self.html = DECK.read_text()
        self.deck = DeckParser()
        self.deck.feed(self.html)
    def test_content_timing_is_45_minutes_plus_five_for_questions(self):
        main = [s for s in self.deck.slides if s.get('data-appendix') != 'true']
        self.assertEqual(len(main), 19)
        self.assertEqual(sum(int(s['data-timing']) for s in main[:-1]), 2700)
        self.assertEqual(int(main[-1]['data-timing']), 300)
    def test_every_slide_has_presenter_notes(self):
        self.assertEqual(self.deck.notes, len(self.deck.slides))
        self.assertEqual(len(self.deck.slides), 22)
    def test_self_contained_presentation_requires_no_external_assets(self):
        self.assertEqual(self.deck.external, [])
        self.assertNotRegex(self.html, r'@import|@font-face|\bfetch\(|\bXMLHttpRequest')
    def test_private_study_context_is_absent(self):
        self.assertNotRegex(self.html, r'(?i)google|RRK|entrevista|app\.notion|notion-file-block|library_file_id')
    def test_examples_disclose_their_fictional_values(self):
        self.assertIn('Exemplo fictício', self.html)
        self.assertIn('Valores fictícios', self.html)
    def test_generated_notes_cover_all_slides(self):
        notes = (ROOT/'episodes/01-texto-aos-numeros/speaker-notes.md').read_text()
        self.assertEqual(len(re.findall(r'^## Slide \d+', notes, re.M)), 22)
        self.assertGreater(len(notes.split()), 3500)
    def test_presenter_and_navigation_controls_exist(self):
        self.assertIn('data-action="speaker"', self.html)
        self.assertIn('data-action="next"', self.html)
        self.assertIn('data-action="prev"', self.html)
        self.assertIn('prefers-reduced-motion', self.html)


if __name__ == '__main__':
    unittest.main(verbosity=2)
