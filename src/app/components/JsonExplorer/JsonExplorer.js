import React, { useState, useEffect, useRef } from "react";
import "./JsonExplorer.scss";

const JsonExplorer = (props) => {
  let [treeData, setTreeData] = useState(props.data);

  useEffect(() => {
    setTreeData(props.data);
  }, [props.data]);

  function onNodeClick(node) {
    props.onNodeClick(node);
  }

  return (
    <div className="json-explorer-container">
      <ul className={"list " + (treeData?.expanded ? "opened" : "closed")}>
        <List data={treeData} onNodeClick={onNodeClick}></List>
      </ul>
    </div>
  );
};

const List = ({ data, onNodeClick }) => {
  return (
    <li
      className={
        "item " +
        (data?.children?.length > 0
          ? data?.expanded
            ? "opened"
            : "closed"
          : "no-type")
      }
    >
      {/* <div className="beak"></div> */}
      <Node node={data} onNodeClick={onNodeClick}></Node>

      {data?.expanded && data?.children?.length > 0 && (
        <ul className="list opened">
          {data.children.map((child) => (
            <List data={child} onNodeClick={onNodeClick} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Node = ({ node, onNodeClick }) => {
  return (
    <div
      className={"node " + (node?.active ? "active" : "")}
      onClick={() => onNodeClick(node)}
    >
      <span className="key">name: </span>
      <span className="value">{node.name}</span>
    </div>
  );
};

export default JsonExplorer;
