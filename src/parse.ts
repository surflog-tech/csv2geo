function parse(buffer: ArrayBuffer) {
  return buffer.toString().trim().split('\n').splice(1).map((row) => row.split(','));
}

export default parse;
