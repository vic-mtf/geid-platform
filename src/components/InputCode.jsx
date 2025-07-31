import { Stack, OutlinedInput, Box, Zoom, IconButton } from "@mui/material";
import { useRef, useMemo, useState, useCallback, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

export default function InputCode({
  length = 6,
  size = 40,
  values = [],
  type = "alphanumeric",
  onChange = () => null,
  onComplete = () => null,
  backspace = false,
}) {
  const [codes, setCodes] = useState(values.slice(0, length));
  const rootRef = useRef();
  const changing = useMemo(() => ({ value: true }), []);
  const handleChange = useCallback(
    ({ event, index: _index }) => {
      event.preventDefault();
      const values = event.target.value?.trim();
      values.split("").forEach((value, __index) => {
        const index = _index + __index;
        onChange(event, { index, value });
        const inputs = rootRef.current.querySelectorAll("input");
        const nextInput = inputs[index + 1];
        if (index < length) changing.value = true;
        if (verifyType(type, value) || value === "") {
          if (value) {
            event.target?.blur();
            if (nextInput) nextInput.readOnly = false;
            nextInput?.focus();

            setCodes((codes) => [...codes, value].slice(0, length));
          }
        }
      });
    },
    [type, onChange, length, changing]
  );

  const handleDelete = useCallback(
    ({ event, notControlled }) => {
      const inputs = rootRef.current.querySelectorAll("input");
      const previousInput = inputs[codes.length > 0 ? codes.length - 1 : 0];
      if (previousInput) previousInput.readOnly = false;
      if (
        event?.keyCode === 8 ||
        event?.code?.toLowerCase() === "backspace" ||
        notControlled
      ) {
        event.preventDefault();
        event.target?.blur();
        previousInput?.focus();
        setCodes((codes) => codes.slice(0, codes.length - 1));
      }
    },
    [codes]
  );

  const inputs = useMemo(
    () =>
      new Array(length).fill("_").map((_, index) => {
        const value = codes[index] === undefined ? "" : codes[index];
        const readOnly =
          index > 0
            ? value !== "" || codes[index - 1] === undefined
            : value !== "";
        return (
          <OutlinedInput
            key={index}
            size='small'
            placeholder='-'
            readOnly={readOnly}
            onChange={(event) => handleChange({ index, event })}
            onKeyDown={(event) => handleDelete({ index, event })}
            autoFocus={!readOnly && value === ""}
            value={value}
            sx={{
              fontSize: (10 * size) / 25,
              width: size,
              height: size,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              "& input": {
                textAlign: "center",
                lineHeight: "1em",
                p: 0.25,
              },
            }}
          />
        );
      }),
    [codes, length, size, handleChange, handleDelete]
  );

  useLayoutEffect(() => {
    if (codes.length === length && changing.value) {
      setTimeout(() => {
        onComplete(codes);
        changing.value = false;
      });
    }
  }, [codes, length, onComplete, changing]);

  // useEffect(() => {
  //   const input = rootRef.current?.querySelector("input");
  //   if (input) input.focus();
  // }, []);

  return (
    <Box
      display='flex'
      gap={0.5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: {
          xs: length <= 6 ? "rom" : "column",
          md: "row",
        },
      }}>
      <Stack
        direction='row'
        spacing={0.1}
        ref={rootRef}
        display='flex'
        flex={1}>
        {inputs}
      </Stack>
      <Zoom appear={false} in={backspace} unmountOnExit>
        <Box justifyContent='center' alignItems='center' display='flex'>
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              handleDelete({ event, notControlled: true });
            }}
            onMouseDown={(event) => event.preventDefault()}>
            <BackspaceOutlinedIcon />
          </IconButton>
        </Box>
      </Zoom>
    </Box>
  );
}

InputCode.propTypes = {
  length: PropTypes.number,
  size: PropTypes.number,
  values: PropTypes.array,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  type: PropTypes.oneOf(["numeric", "alphanumeric", "alphabetic"]),
  backspace: PropTypes.bool,
};

function verifyType(type, str) {
  let regex;
  switch (type) {
    case "numeric":
      regex = /^[0-9]+$/;
      break;
    case "alphanumeric":
      regex = /^[a-zA-Z0-9]+$/;
      break;
    case "alphabetic":
      regex = /^[a-zA-Z]+$/;
      break;
    default:
      return false;
  }
  return regex.test(str);
}
