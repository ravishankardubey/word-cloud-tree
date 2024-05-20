import React, { useState, useEffect } from "react";
import "./App.scss";
import WordCloud from "./components/word-cloud/word-cloud";
import JsonExplorer from "./components/JsonExplorer/JsonExplorer";
import json from "./data/data.json";
import useFetch from "./hooks/useFetch";

function App() {
  const { data, globalFreqMap } = useFetch(json);
  const [freqMap, setFreqMap] = useState(globalFreqMap);
  const [treeData, setTreeData] = useState(data);
  const [selectedNode, setSelectedNode] = useState(data);

  useEffect(() => {
    setFreqMap(globalFreqMap);
  }, [globalFreqMap]);

  console.log("globalFreqMap: ", globalFreqMap);

  function onWordClick(word) {
    const { data } = findMatchingNodes(treeData, word);
    setTreeData((treeData) => {
      return { ...treeData, ...data };
    });
  }

  function onNodeClick(node) {
    const updatedData = toggleNode(treeData, node.id);
    setTreeData((treeData) => {
      return { ...treeData, ...updatedData };
    });

    setFreqMap(node.freqMap);
    setSelectedNode(node);
  }

  return (
    <div className="app-container">
      <div className="tree-wrapper">
        <JsonExplorer data={treeData} onNodeClick={onNodeClick} />
      </div>
      <div className="word-cloud-wrapper">
        <WordCloud onWordClick={onWordClick} freqMap={freqMap} />
      </div>
      <div className="json-viewer">
        <pre>{JSON.stringify(selectedNode, null, 2)}</pre>
      </div>
    </div>
  );
}

function toggleNode(data, id) {
  data.expanded = data.id === id ? !data.expanded : data.expanded;
  data.active = data.id === id;

  for (let i = 0; i < data?.children?.length; i++) {
    toggleNode(data?.children[i], id);
  }
  return data;
}

function findMatchingNodes(data, word) {
  const has = data?.freqMap?.has(word);
  let foundInChild = false;

  for (let i = 0; i < data?.children?.length; i++) {
    const { found } = findMatchingNodes(data.children[i], word);

    if (found) {
      foundInChild = true;
    }
  }

  const found = !!has || foundInChild;
  data.active = !!has;
  data.expanded = foundInChild;
  return { found, data };
}

export default App;
