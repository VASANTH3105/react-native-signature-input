import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const SignatureInput = forwardRef(
  (
    {
      color = "black",
      strokeWidth = 3,
      height = 200,
      width = "100%",
      backgroundColor = "#f5f5f5",
      style,
      onEnd,
      onChange,
    },
    ref
  ) => {
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const currentPathRef = useRef(""); // Ref to track current stroke without lag

    useImperativeHandle(
      ref,
      () => ({
        clear: () => {
          setPaths([]);
          setCurrentPath("");
          currentPathRef.current = "";
          if (onChange) onChange([]);
        },
        getPaths: () => paths,
        isEmpty: () => paths.length === 0 && currentPathRef.current === "",

        getSVG: () => {
          // Ensure we use the latest 'paths' from state
          const bgRect =
            backgroundColor !== "transparent"
              ? `<rect width="100%" height="100%" fill="${backgroundColor}" />`
              : "";

          const pathElements = paths
            .map(
              (p) =>
                `<path d="${p}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
            )
            .join("");

          return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
${bgRect}
${pathElements}
</svg>`;
        },
      }),
      [paths, backgroundColor, color, strokeWidth, height, width]
    );

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          // Start a new path "Move To"
          const startPath = `M${locationX.toFixed(1)},${locationY.toFixed(1)}`;

          currentPathRef.current = startPath;
          setCurrentPath(startPath);
        },

        onPanResponderMove: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          // Add "Line To"
          const newPoint = `L${locationX.toFixed(1)},${locationY.toFixed(1)}`;

          currentPathRef.current += newPoint;
          setCurrentPath(currentPathRef.current);
        },

        onPanResponderRelease: () => {
          // 1. CAPTURE the full string into a local variable FIRST
          const finishedPath = currentPathRef.current;

          if (finishedPath) {
            // 2. Use the local variable to update state (Safe from resets)
            setPaths((prev) => {
              const newPaths = [...prev, finishedPath];
              if (onChange) onChange(newPaths);
              return newPaths;
            });

            // 3. NOW it is safe to reset
            currentPathRef.current = "";
            setCurrentPath("");
            if (onEnd) onEnd();
          }
        },
      })
    ).current;

    return (
      <View
        style={[styles.container, style, { height, width, backgroundColor }]}
      >
        <View style={styles.touchArea} {...panResponder.panHandlers}>
          <Svg style={styles.svgContainer}>
            {/* Render Saved Paths */}
            {paths.map((p, i) => (
              <Path
                key={i}
                d={p}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {/* Render Current Stroke being drawn */}
            {currentPath ? (
              <Path
                d={currentPath}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
          </Svg>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 8,
  },
  touchArea: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  svgContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default SignatureInput;
