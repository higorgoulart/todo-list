import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TodoList from './TodoList';
import { createTable, insertTodo, getAllTodos } from './DatabaseHelper';

const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    createTable()
      .then(() => {
        loadTodos();
      })
      .catch((error) => console.error(error));
  }, []);

  const loadTodos = () => {
    getAllTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => console.error(error));
  };

  const addTodo = () => {
    if (text.trim() !== '') {
      insertTodo(text)
        .then(() => {
          loadTodos();
          setText('');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setText(value)}
        value={text}
        placeholder="Escreva o item"
      />
      <Button title="Adicionar" onPress={addTodo} />
      <TodoList todos={todos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
