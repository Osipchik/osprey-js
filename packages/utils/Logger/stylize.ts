const ANSI: any = {
  /* 1 */ 'b': 1, // bold (increased intensity)
  /* 2 */ 'f': 2, // faint (decreased intensity)
  /* 3 */ 'i': 3, // italic
  /* 4 */ 'u': 4, // underline
  /* 5 */ 'l': 5, // blink slow
  /* 6 */ 'h': 6, // blink rapid
  /* 7 */ 'n': 7, // negative
  /* 8 */ 'c': 8, // conceal
  /* 9 */ 's': 9, // strikethrough
};

const COLOR = [
  /* 1 */ 'black',
  /* 2 */ 'red',
  /* 3 */ 'green',
  /* 4 */ 'yellow',
  /* 5 */ 'blue',
  /* 6 */ 'magenta',
  /* 7 */ 'cyan',
  /* 8 */ 'white',
  /* 9 */ 'crimson',
];

function esc(style: string | number, value: string) {
  if (style) {
    return `\x1b[${style}m${value}\x1b[0m`;
  }

  return value;
}

function stylize(styles: string, text: string): string {
  for (const style of styles.split(',')) {
    if (style.length === 1) {
      text = esc(ANSI[style], text);
    } else {
      const [fg, bg] = style.split('/');
      const fgColor = COLOR.indexOf(fg);
      const bgColor = COLOR.indexOf(bg);

      if (fgColor > -1) {
        text = esc(30 + fgColor, text);
      }
      if (bgColor > -1) {
        text = esc( 40 + bgColor, text);
      }
    }
  }

  return text;
}

export default stylize;
module.exports = stylize;
