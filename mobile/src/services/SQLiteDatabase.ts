import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("financeiro.db")

export default db