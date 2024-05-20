import { useState, useEffect } from "react";
import { wordFrequency, mergeFreqMap } from "../utils/utils";

const useFetch = (json) => {
  const [data, setData] = useState(json);
  const [globalFreqMap, setGlobalFreqMap] = useState(new Map());

  useEffect(() => {
    const { data, globalWordFreq } = processData(json, globalFreqMap);
    setData(data);
    setGlobalFreqMap(globalWordFreq);
  }, []);

  return { data, globalFreqMap };
};

function processData(data, globalWordFreq) {
  data.freqMap = wordFrequency(data.text);
  globalWordFreq = mergeFreqMap(globalWordFreq, data.freqMap);

  for (let i = 0; i < data?.children?.length; i++) {
    processData(data.children[i], globalWordFreq);
  }

  return { data, globalWordFreq };
}

export default useFetch;
