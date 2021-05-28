import * as R from 'ramda';
import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/en-us';

const SOFT_HYPHEN = '\u00ad';
const hyphenator = hyphen(pattern);
const splitHyphen = R.split(SOFT_HYPHEN);

const cache = {};

const getParts = R.ifElse(R.contains(SOFT_HYPHEN), splitHyphen, R.o(splitHyphen, hyphenator));

const wordHyphenation = (options, word) => {
  if (R.isNil(word)) return [];
  if (cache[word]) return cache[word];
  cache[word] = getParts(word);
  return cache[word];
};

export default R.curryN(2, wordHyphenation);
