import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PostDetailsModal = ({ isVisible, post, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Render post details here */}
        <Text>Title: hihi</Text>
        <Text>Content: hihi</Text>
        {/* You can render other post details as needed */}
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

export default PostDetailsModal;
