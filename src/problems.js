/* sSizga bir qator va qatorlar qatori beriladi words. ning barcha torlari bir xilwords uzunlikda .

Birlashtirilgan pastki qator - bu birlashtirilgan shar qanday almashtirishning barcha satrlarini o'z ichiga olgan pastki qator words.

Masalan, agar words = ["ab","cd","ef"], keyin "abcdef", "abefcd", "cdabef", "cdefab", "efabcd"va "efcdab"barcha birikkan qatorlardir. "acdbef"birlashtirilgan pastki qator emas, chunki u har qanday almashtirishning birikmasi emas words.
dagi barcha birlashtirilgan pastki satrlarning boshlang'ich indekslarini qaytaring s. Javobni istalgan tartibda qaytarishingiz mumkin .

  */

function findSubstring(s, words) {
  if (words.length === 0 || s.length === 0) return [];

  const wordLength = words[0].length;
  const totalLength = wordLength * words.length;
  const wordMap = {};
  const result = [];

  // Count occurrences of each word
  for (const word of words) {
    if (wordMap[word]) {
      wordMap[word]++;
    } else {
      wordMap[word] = 1;
    }
  }

  for (let i = 0; i <= s.length - totalLength; i++) {
    const seen = {};
    let j = 0;
    while (j < words.length) {
      const word = s.substr(i + j * wordLength, wordLength);
      if (!(word in wordMap)) break;
      if (word in seen) {
        seen[word]++;
      } else {
        seen[word] = 1;
      }
      if (seen[word] > wordMap[word]) break;
      j++;
    }
    if (j === words.length) {
      result.push(i);
    }
  }
  return result;
}
