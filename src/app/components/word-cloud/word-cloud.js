import { React, useEffect, useRef, useState } from "react";
import "./word-cloud.scss";
import useWordCloud from "../../hooks/useWordCloud";

const WordCloud = (props) => {
  let [freqMap, setFreqMap] = useState(props.freqMap);
  const wordCloudSVG = useWordCloud(freqMap);
  const svg = useRef(null);

  useEffect(() => {
    setFreqMap(props.freqMap);
  }, [props.freqMap]);

  useEffect(() => {
    if (svg.current && wordCloudSVG) {
      svg.current.innerHTML = "";
      svg.current.appendChild(wordCloudSVG);
    }
  }, [wordCloudSVG]);

  function handleEvent(e) {
    if (e.target.__data__) {
      props.onWordClick(e.target.__data__);
    }
  }

  return (
    <div className="word-cloud-container" ref={svg} onClick={handleEvent}></div>
  );
};

export default WordCloud;
