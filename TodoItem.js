import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodoItem = ({ todo }) => {
  return (
    <View style={styles.container}>
      <Text>{todo.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TodoItem;
