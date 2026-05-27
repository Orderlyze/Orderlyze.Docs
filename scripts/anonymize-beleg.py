"""
Anonymisiert den WhatsApp-Beleg-Screenshot fuer die FAQ:
- Top-Header (Restaurant-Name, Tel) und Cassiername mit Beispieldaten ersetzt
- Bottom Gutschein-Block bleibt original; nur die letzten 2 Ziffern des Codes maskiert
- QR-Codes bleiben original, kurzer weisser Strich macht sie unscanbar
- Hintergrund um den Beleg auf weiss
"""
from PIL import Image, ImageDraw, ImageFont
import os

SRC = "woztell-data/images/bot-restguthaben-original.png"
DST = "static/screenshots/admin/gutscheine-restguthaben-beleg.png"

im = Image.open(SRC).convert("RGB")
W, H = im.size  # 276 x 659
print(f"Original: {W}x{H}")

PAPER = (238, 232, 220)
WHITE = (255, 255, 255)
BLACK = (10, 10, 10)

FONT = "C:/Windows/Fonts/consola.ttf"
font_small = ImageFont.truetype(FONT, 9)

draw = ImageDraw.Draw(im)

# === 1. Hintergrund um den Beleg weiss ===
draw.rectangle([(0, 0), (22, H)], fill=WHITE)
draw.rectangle([(238, 0), (W, H)], fill=WHITE)

# === 2. Sensible Daten oben durch Beispieldaten ersetzen ===

# Header (Restaurant-Name + Telefon)
draw.rectangle([(25, 0), (225, 30)], fill=PAPER)
draw.text((75, 5), "Musterbetrieb GmbH", fill=BLACK, font=font_small)
draw.text((85, 17), "Tel: 01234-567890", fill=BLACK, font=font_small)

# Cassiername "Cojocaru Teodora"
draw.rectangle([(120, 38), (218, 56)], fill=PAPER)
draw.text((125, 42), "Max Mustermann", fill=BLACK, font=font_small)

# === 3a. "Gutschein eingelöst: Gasthof Velten" - nur den Namen dezent ueberdecken ===
# Per Debug verifiziert: "Gasthof Velten" liegt bei x=140-200, y=362-372
draw.rectangle([(140, 362), (200, 372)], fill=PAPER)

# === 3b. "Code : 2643014137260" - nur die letzten 2 Ziffern (60) ueberdecken ===
# Per Debug verifiziert: "60" liegt bei x=164-175, y=370-381
draw.rectangle([(164, 370), (177, 381)], fill=PAPER)

# === 4. QR-Codes original lassen, weisser Querstrich macht sie invalid ===
# Gutschein-QR: ca. x=118-160, y=388-432, Mitte y=410
draw.rectangle([(122, 408), (158, 412)], fill=WHITE)

# Fiskal-TSE-QR: ca. x=83-197, y=477-597, Mitte y=537
draw.rectangle([(105, 535), (175, 540)], fill=WHITE)

# === 5. Crop unteren leeren Bereich ===
im = im.crop((0, 0, W, 625))

os.makedirs(os.path.dirname(DST), exist_ok=True)
im.save(DST, optimize=True)
print(f"Saved: {DST} ({os.path.getsize(DST)} bytes)")
