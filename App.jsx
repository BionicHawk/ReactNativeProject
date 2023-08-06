import react, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

const app = () => {
  const [src, setSrc] = useState("https://picsum.photos/256/256");

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media files is required!");
      return null;
    }
    const image = await ImagePicker.launchImageLibraryAsync();
    if (image.canceled === true) return null;
    return image;
  };

  let openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("This device or platform doesn't support the sharing feature!");
      return null;
    }
    try {
      await Sharing.shareAsync(src);
    } catch (e) {
      alert(`The image you want to share is not in your device!: ${e}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Harry Potter!!!</Text>
      <TouchableOpacity
        onPress={async () => {
          openShareDialog();
        }}
      >
        <Image source={{ uri: src }} style={styles.images} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.styledBtn}
        onPress={() => {
          Alert.alert("Cambiando imagen!...");
          let newHeight = 256 + parseInt(Math.random() * 768);
          let newUrl = `https://picsum.photos/${newHeight}/${newHeight}`;
          setSrc(newUrl);
        }}
      >
        <Text style={styles.styledBtnText}>Pulsame</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.styledBtn, backgroundColor: "blue" }}
        onPress={async () => {
          const image = await openImagePickerAsync();
          if (image != null) {
            setSrc(image.uri);
          }
        }}
      >
        <Text style={styles.styledBtnText}>Subir Imagen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: { fontSize: 30, color: "white" },
  images: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
  styledBtn: {
    color: "white",
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
  styledBtnText: {
    color: "white",
    fontSize: 20,
  },
});

export default app;
