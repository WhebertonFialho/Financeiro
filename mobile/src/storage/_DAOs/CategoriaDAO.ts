import db from "@services/SQLiteDatabase";

import { CategoriaDTO } from "@storage/_DTOs/CategoriaDTO";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS cad_categoria (codigo TEXT PRIMARY KEY, descricao TEXT, usuario TEXT);"
  );
});

const Create = (categoria : CategoriaDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO cad_categoria (codigo, descricao, usuario) values (?, ?, ?);", [ categoria.codigo, categoria.descricao, categoria.usuario ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) 
            resolve(insertId);
          else 
            reject("Erro ao Gravar Registro: " + JSON.stringify(categoria));
          },
        (_, error) : boolean => { 
          reject(error);
          return false;
        }
      );
    });
  });
};

const Update = ( categoria : CategoriaDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE cad_categoria SET descricao=? usuario=? WHERE codigo=?;", [ categoria.descricao, categoria.usuario, categoria.codigo ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) 
            resolve(rowsAffected);
          else 
            reject("Erro ao Alterar o Registro: codigo=" + categoria.codigo);
        },
        (_, error) : boolean =>  { 
            reject(error);
            return false;
        }
      );
    });
  });
};

const RequestByCodigo = (codigo : string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM cad_categoria WHERE codigo=?;", [ codigo ],
        (_, { rows }) => {
          if (rows.length > 0) 
            resolve(rows._array[0]);
          else 
            reject("Erro ao Buscar o Registro: codigo=" + codigo);
        },
        (_, error) : boolean => { 
            reject(error);
            return false;
        }
      );
    });
  });
};

const RequestAll = (usuario : string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM cad_categoria WHERE usuario=?;", [ usuario ],
        (_, { rows }) => { 
          resolve(rows._array);
        },
        (_, error) => { 
          reject(error);
          return false;
        }
      );
    });
  });
};

const Remove = (codigo : string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM cad_categoria WHERE codigo=?;", [ codigo ],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => { 
            reject(error) 
            return false;
        }
      );
    });
  });
};

export default { Create, Update, RequestByCodigo, RequestAll, Remove };