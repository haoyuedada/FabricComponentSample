export function darken(color: string, percentage: number): string {
  return adjustLightness(color, -percentage);
}

export function lighten(color: string, percentage: number): string {
  return adjustLightness(color, percentage);
}

// Helper function to adjust the lightness
function adjustLightness(color: string, percentage: number): string {
  function hexToRgb(hex: string): [number, number, number] {
    const cleanHex = hex.replace('#', '');
    const bigint = parseInt(cleanHex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }
  const COLOR_COUNT = 255;
  function rgbToHsl(red: number, green: number, blue: number): [number, number, number] {
    red /= COLOR_COUNT;
    green /= COLOR_COUNT;
    blue /= COLOR_COUNT;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let hsl = 0;
    let sel = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const delta = max - min;
      sel = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      switch (max) {
        case red:
          hsl = (green - blue) / delta + (green < blue ? 6 : 0);
          break;
        case green:
          hsl = (blue - red) / delta + 2;
          break;
        case blue:
          hsl = (red - green) / delta + 4;
          break;
      }
      hsl /= 6;
    }

    return [hsl * 360, sel * 100, l * 100];
  }

  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;

    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    let b: number, g: number, r: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h / 360 + 1 / 3);
      g = hueToRgb(p, q, h / 360);
      b = hueToRgb(p, q, h / 360 - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  percentage = Math.max(-100, Math.min(percentage, 100));
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  hsl[2] = Math.max(0, Math.min(100, hsl[2] + (percentage / 100) * hsl[2]));
  const adjustedRgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
  const toHex = (c: number): string => c.toString(16).padStart(2, '0');

  return `#${toHex(adjustedRgb[0])}${toHex(adjustedRgb[1])}${toHex(adjustedRgb[2])}`;
}
