# react-native-signature-input ✍️

A lightweight, **pure JavaScript** signature pad for React Native.  
Built on top of **react-native-svg** for smooth, vector-based drawing without the performance cost or complexity of WebViews.

---

## ✨ Features

- 🚀 **Pure JS** – No native linking required (except `react-native-svg`)
- ⚡ **High Performance** – Uses `PanResponder` for smooth, lag-free drawing
- 📐 **Vector Output** – Returns SVG XML strings or raw coordinate paths
- 🎨 **Customizable** – Control stroke color, width, and background
- 📱 **Scroll Compatible** – Handles gestures correctly inside `ScrollView`

---

## 📦 Installation

### Install the package
```bash
npm install react-native-signature-input
```

### Install peer dependency
```bash
npm install react-native-svg
```

> If you are using **bare React Native**, run:
```bash
cd ios && pod install && cd ..
```

---

## 💻 Usage

```tsx
import React, { useRef } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import SignatureInput from 'react-native-signature-input';

export default function App() {
  const signatureRef = useRef(null);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      Alert.alert('Error', 'Please sign first!');
      return;
    }

    const svgString = signatureRef.current.getSVG();
    console.log(svgString);
    Alert.alert('Success', 'SVG captured! Check console.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.signatureContainer}>
        <SignatureInput
          ref={signatureRef}
          height={200}
          color="#000080"
          strokeWidth={4}
          backgroundColor="#fff"
          onEnd={() => console.log('Stroke finished')}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Clear" onPress={handleClear} color="red" />
        <Button title="Save SVG" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  signatureContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
```

---

## 📖 API Documentation

### Props

| Prop | Type | Default | Description |
|-----|-----|---------|-------------|
| ref | React.Ref | `null` | Required to access methods |
| height | number | `200` | Height of drawing area |
| color | string | `"black"` | Ink color |
| strokeWidth | number | `3` | Thickness of line |
| backgroundColor | string | `"#f5f5f5"` | Background color |
| onEnd | function | `undefined` | Called when stroke ends |
| onChange | function | `undefined` | Called with `(paths[])` on update |

---

### Methods (via Ref)

| Method | Returns | Description |
|------|--------|-------------|
| `getSVG()` | `string` | Full SVG XML string |
| `getPaths()` | `string[]` | Array of SVG path strings |
| `clear()` | `void` | Clears the canvas |
| `isEmpty()` | `boolean` | Returns true if no strokes |

---

## 🤝 Contributing

Pull requests are welcome!

---

## 📄 License

MIT

---

**Author:** Vasanth
