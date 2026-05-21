"""Wraps phone-screenshot markdown image references in HTML <img> tags with width=320.

Targets only the funktionen topics with portrait phone screenshots.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs" / "funktionen"
STATIC = ROOT / "static" / "screenshots" / "funktionen"

# topics whose ALL images are phone portrait
ALL_PHONE = {
    "dynamisches-produkt",
    "farbeinstellungen",
    "rechnungen-bearbeiten",
    "tagesumsaetze",
    "tischplan",
    "zahlungsarten",
    "bewirtungsbeleg",
    "pfand",
}

# Mixed: only resize the listed file names; the rest stay markdown
MIXED = {
    "abholung": {"2.jpg"},  # 1.jpg is the wide web screenshot, 2.jpg is phone
}

PHONE_WIDTH = 320

MD_IMG = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")


def wrap(alt: str, src: str) -> str:
    # Build the HTML img tag with width
    return f'<img src="{src}" alt="{alt}" width="{PHONE_WIDTH}" />'


def process(md_path: Path, topic: str) -> bool:
    text = md_path.read_text(encoding="utf-8")
    orig = text

    def repl(m: re.Match) -> str:
        alt, src = m.group(1), m.group(2)
        # Only wrap if image belongs to this topic
        if f"/screenshots/funktionen/{topic}/" not in src:
            return m.group(0)
        if topic in ALL_PHONE:
            return wrap(alt, src)
        if topic in MIXED:
            filename = src.rsplit("/", 1)[-1]
            if filename in MIXED[topic]:
                return wrap(alt, src)
        return m.group(0)

    text = MD_IMG.sub(repl, text)
    if text != orig:
        md_path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    topics = sorted(ALL_PHONE | MIXED.keys())
    for topic in topics:
        md = DOCS / topic / "index.md"
        if not md.exists():
            print(f"SKIP {topic}: no index.md", file=sys.stderr)
            continue
        changed = process(md, topic)
        print(f"{'EDIT' if changed else 'NOOP'} {md.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
