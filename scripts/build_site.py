"""Create the public Pages artifact from an explicit list of teaching assets."""
from pathlib import Path
import shutil
from build import build

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / '_site'
PUBLIC_FILES = ('index.html', 'shared/css/theme.css', 'dist/episodio-01.html')


def build_site():
    build()
    if SITE.exists():
        shutil.rmtree(SITE)
    SITE.mkdir()
    for relative in PUBLIC_FILES:
        target = SITE / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / relative, target)
    (SITE / '.nojekyll').touch()
    print('Pages artifact: portal, stylesheet and episode 01 in _site/')


if __name__ == '__main__':
    build_site()
