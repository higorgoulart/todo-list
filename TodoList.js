import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TodoList;
