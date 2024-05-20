/**
 *
 * @param {string} text
 * @returns Frequency map of Words in decreasing order
 * return format: { text: <string>, size: <number> }
 */
export const wordFrequency = (text) => {
  const words =
    typeof text === "string" ? text.split(/\W+/g) : Array.from(text);
  const freqMap = new Map();

  for (const word of words) {
    freqMap.set(word, (freqMap.get(word) || 0) + 1);
  }

  return freqMap;
};

export const mergeFreqMap = (globalMap, nodeMap) => {
  nodeMap.forEach((value, key) =>
    globalMap.set(key, (globalMap.get(key) || 0) + value)
  );

  return globalMap;
};

/**
 *
 * @returns Random HEX Color codes
 */
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
