#!/usr/bin/env python3
"""Wrap all `![alt](src)` markdown images in Web Dashboard pages
with the global <BrowserFrame> component."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGET_DIRS = [
    "docs/stammdaten",
    "docs/betrieb",
    "docs/personal",
    "docs/auswertung",
    "docs/einstellungen",
]

IMG_RE = re.compile(r'!\[([^\]]*)\]\((/screenshots/[^)]+)\)')


def escape_attr(value: str) -> str:
    return value.replace('"', '\\"')


def convert(text: str) -> tuple[str, int]:
    def replace(m: re.Match) -> str:
        alt = escape_attr(m.group(1))
        src = m.group(2)
        return f'<BrowserFrame src="{src}" alt="{alt}" />'

    new_text, n = IMG_RE.subn(replace, text)
    return new_text, n


def main() -> int:
    total_files = 0
    total_subs = 0
    for d in TARGET_DIRS:
        for path in (ROOT / d).rglob("*.md"):
            content = path.read_text(encoding="utf-8")
            new_content, n = convert(content)
            if n == 0:
                continue
            path.write_text(new_content, encoding="utf-8")
            print(f"  {path.relative_to(ROOT)}: {n}")
            total_files += 1
            total_subs += n
    print(f"\n{total_subs} screenshots wrapped in {total_files} files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
