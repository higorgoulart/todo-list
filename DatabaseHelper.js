import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const databaseName = 'TodoList.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'Todo List Database';
const databaseSize = 200000;

const db = SQLite.openDatabase({
  name: databaseName,
  version: databaseVersion,
  displayName: databaseDisplayName,
  size: databaseSize,
});

const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT
        );`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const insertTodo = (text) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO todos (text) VALUES (?);',
        [text],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            resolve(insertId);
          } else {
            reject(new Error('Insertion failed'));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM todos;',
        [],
        (_, { rows }) => {
          const todos = [];
          for (let i = 0; i < rows.length; i++) {
            todos.push(rows.item(i));
          }
          resolve(todos);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export { createTable, insertTodo, getAllTodos };
