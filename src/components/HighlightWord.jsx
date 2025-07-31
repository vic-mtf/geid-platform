import PropTypes from "prop-types";
import { Box } from "@mui/material";

const HighlightWord = ({ text = "", word = "" }) => {
  const safeText = String(text);
  const safeWord = String(word).trim();

  if (!safeWord) {
    return (
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}>
        {safeText}
      </span>
    );
  }

  const keywords = [...new Set([safeWord, ...safeWord.split(/\s+/)])];
  const escapedWords = keywords.map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");
  const parts = safeText.split(regex);

  return (
    <span
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
      }}>
      {parts.map((part, index) =>
        keywords.some((k) => part.toLowerCase() === k.toLowerCase()) ? (
          <Box
            component='b'
            sx={{
              color: "text.primary",
              fontWeight: 900,
              display: "inline",
            }}
            key={index}>
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </span>
  );
};

HighlightWord.propTypes = {
  text: PropTypes.string,
  word: PropTypes.string,
};

export default HighlightWord;
