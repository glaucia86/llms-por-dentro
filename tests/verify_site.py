"""Check the publication boundary and all local links in the Pages artifact."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import unittest

SITE = Path(__file__).resolve().parents[1] / '_site'


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('href', 'src'):
            if key in attrs:
                self.urls.append(attrs[key])


class SiteTests(unittest.TestCase):
    def test_publication_contains_only_the_intended_teaching_assets(self):
        self.assertTrue(SITE.is_dir(), 'Run scripts/build_site.py first')
        files = {p.relative_to(SITE).as_posix() for p in SITE.rglob('*') if p.is_file()}
        self.assertEqual(files, {'index.html', 'shared/css/theme.css',
                                 'dist/episodio-01.html', '.nojekyll'})

    def test_local_links_work_under_a_project_path(self):
        for page in SITE.rglob('*.html'):
            parser = Links()
            parser.feed(page.read_text())
            for url in parser.urls:
                parsed = urlsplit(url)
                if parsed.scheme or parsed.netloc or not parsed.path:
                    continue
                self.assertFalse(parsed.path.startswith('/'), url)
                target = (page.parent / unquote(parsed.path)).resolve()
                self.assertTrue(target.is_relative_to(SITE.resolve()), url)
                self.assertTrue(target.is_file(), f'{page.name}: {url}')


if __name__ == '__main__':
    unittest.main(verbosity=2)
