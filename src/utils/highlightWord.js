import React from "react";
import parse from "html-react-parser";
import { escapeRegExp } from "lodash";

export default function highlightWord(_sentence = "", _word = "") {
  const words =
    _sentence.match(
      new RegExp(escapeRegExp(_word).split(/\s/).join("|"), "ig")
    ) || [];

  let sentence = _sentence;
  words.forEach((word) => {
    if (word.trim())
      sentence = sentence
        .toString()
        .replace(
          new RegExp(escapeRegExp(word), "ig"),
          React.createElement("mark", word)
        );
  });
  return parse(sentence);
}
