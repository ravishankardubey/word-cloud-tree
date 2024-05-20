import { useState, useEffect } from "react";
import * as d3 from "d3";
import * as d3Cloud from "d3-cloud";
import { getRandomColor } from "../utils/utils";

const useWordCloud = (wordFrequencyMap) => {
  const [wordCloudSvg, setWordCloud] = useState(null);

  useEffect(() => {
    const wordCloudSvg = generateWordCloud(wordFrequencyMap);
    setWordCloud(wordCloudSvg);
  }, [wordFrequencyMap]);

  return wordCloudSvg;
};

function generateWordCloud(
  wordFrequencyMap,
  {
    freqToList = (freqMap) => {
      const freqList = [];
      freqMap.forEach((value, key) =>
        freqList.push({ text: key, size: value })
      );
      return freqList;
    },
    width = 640,
    height = 400,
    fontFamily = "sans-serif",
    fontScale = 15,
    padding = 2, // padding between the words (in pixels)
    rotate = 0,
    invalidation, // when this promise resolves, stop the simulation
  } = {}
) {
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("font-family", fontFamily)
    .attr("text-anchor", "middle");

  const g = svg.append("g");

  const cloud = d3Cloud()
    .size([width, height])
    .words(freqToList(wordFrequencyMap))
    .padding(padding)
    .rotate(rotate)
    .font(fontFamily)
    .fontSize((d) => Math.sqrt(d.size) * fontScale)
    .on("word", ({ size, x, y, rotate, text }) => {
      g.append("text")
        .datum(text)
        .attr("font-size", size)
        .attr("fill", getRandomColor())
        .attr("style", "cursor: pointer")
        .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
        .text(text);
    });

  cloud.start();
  invalidation && invalidation.then(() => cloud.stop());
  return svg.node();
}

export default useWordCloud;
