"""Draws a red halo + arrow marker on a screenshot.

Usage:
  python add-marker.py <image-path> <cx%> <cy%> <width%> [shape] [arrow-side] [height%]

Coordinates are percentages of image dimensions (0-100). The (cx, cy) is the
*center* of the target element; width is its bounding box width as a
percentage of image width. Optional height (percent of image *height*) lets
you make non-square rectangles for wide/thin elements like list rows.

  shape       circle (default) or rect
  arrow-side  auto (default) or left/right/top/bottom
  height%     defaults to width% scaled to keep a square in pixel space

The image is overwritten with the annotated version.
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image, ImageDraw

RED = (255, 45, 45)
HALO_LAYERS = [
    (6, 90),   # outer wide soft glow
    (10, 130), # mid glow
]


def draw_marker(img: Image.Image, cx_pct: float, cy_pct: float, size_pct: float,
                shape: str = "circle", arrow_side: str = "auto",
                height_pct: float | None = None) -> None:
    w, h = img.size
    box_w = int(w * size_pct / 100)
    box_h = int(h * height_pct / 100) if height_pct is not None else box_w
    cx = int(w * cx_pct / 100)
    cy = int(h * cy_pct / 100)
    size = max(box_w, box_h)  # used for radius/halo metrics
    box = [cx - box_w // 2, cy - box_h // 2, cx + box_w // 2, cy + box_h // 2]

    # Halo (multiple stroke widths, semi-transparent outer)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for stroke, alpha in HALO_LAYERS[::-1]:
        color = RED + (alpha,)
        if shape == "rect":
            od.rounded_rectangle(box, radius=size // 6, outline=color, width=stroke)
        else:
            od.ellipse(box, outline=color, width=stroke)
    # Sharp inner ring
    if shape == "rect":
        od.rounded_rectangle(box, radius=size // 6, outline=RED + (255,), width=4)
    else:
        od.ellipse(box, outline=RED + (255,), width=4)

    img.alpha_composite(overlay) if img.mode == "RGBA" else img.paste(
        Image.alpha_composite(img.convert("RGBA"), overlay).convert(img.mode)
    )

    # Arrow
    if arrow_side == "auto":
        space = {
            "right": w - box[2],
            "left": box[0],
            "top": box[1],
            "bottom": h - box[3],
        }
        arrow_side = max(space, key=space.get)

    arrow_len = int(w * 0.18)
    head_size = int(arrow_len * 0.35)
    gap = max(20, size // 4)
    d = ImageDraw.Draw(img)

    if arrow_side == "right":
        tip_x = box[2] + gap
        tip_y = cy
        tail_x = tip_x + arrow_len
        tail_y = cy
        d.line([(tail_x, tail_y), (tip_x, tip_y)], fill=RED, width=14)
        d.polygon([
            (tip_x, tip_y),
            (tip_x + head_size, tip_y - head_size // 2),
            (tip_x + head_size, tip_y + head_size // 2),
        ], fill=RED)
    elif arrow_side == "left":
        tip_x = box[0] - gap
        tip_y = cy
        tail_x = tip_x - arrow_len
        tail_y = cy
        d.line([(tail_x, tail_y), (tip_x, tip_y)], fill=RED, width=14)
        d.polygon([
            (tip_x, tip_y),
            (tip_x - head_size, tip_y - head_size // 2),
            (tip_x - head_size, tip_y + head_size // 2),
        ], fill=RED)
    elif arrow_side == "top":
        tip_x = cx
        tip_y = box[1] - gap
        tail_y = tip_y - arrow_len
        d.line([(tip_x, tail_y), (tip_x, tip_y)], fill=RED, width=14)
        d.polygon([
            (tip_x, tip_y),
            (tip_x - head_size // 2, tip_y - head_size),
            (tip_x + head_size // 2, tip_y - head_size),
        ], fill=RED)
    else:  # bottom
        tip_x = cx
        tip_y = box[3] + gap
        tail_y = tip_y + arrow_len
        d.line([(tip_x, tip_y), (tip_x, tail_y)], fill=RED, width=14)
        d.polygon([
            (tip_x, tip_y),
            (tip_x - head_size // 2, tip_y + head_size),
            (tip_x + head_size // 2, tip_y + head_size),
        ], fill=RED)


def main() -> None:
    if len(sys.argv) < 5:
        print(__doc__)
        sys.exit(1)
    path = Path(sys.argv[1])
    cx_pct = float(sys.argv[2])
    cy_pct = float(sys.argv[3])
    size_pct = float(sys.argv[4])
    shape = sys.argv[5] if len(sys.argv) > 5 else "circle"
    arrow_side = sys.argv[6] if len(sys.argv) > 6 else "auto"
    height_pct = float(sys.argv[7]) if len(sys.argv) > 7 else None

    img = Image.open(path).convert("RGBA")
    draw_marker(img, cx_pct, cy_pct, size_pct, shape, arrow_side, height_pct)
    # Save back in original format
    out_path = path
    if path.suffix.lower() in (".jpg", ".jpeg"):
        img.convert("RGB").save(out_path, "JPEG", quality=92)
    else:
        img.save(out_path)
    print(f"ANNOTATED {path}")


if __name__ == "__main__":
    main()
