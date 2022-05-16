import React from "react";
import "./overall-list.scss";
import { data } from "../../constants";

const OverallList = () => {
  return (
    <div className="notification-container">
      <ul
        className="overall-list"
        style={{ overflowY: "auto", maxHeight: "300px" }}
      >
        {data.overall.map((item, index) => (
          <li className="overall-list__item" key={`overall-${index}`}>
            <div className="overall-list__item__info">
              <div
                className="title"
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  fontFamily: "monospace",
                  color: "#00006f",
                }}
              >
                🛑 {item.value} 🛑
              </div>
              <br />
              <span>{item.title}</span>
              <span
                style={{ fontStyle: "italic", color: "grey", fontSize: "14px" }}
              >
                {" "}
                - {item.time}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverallList;
