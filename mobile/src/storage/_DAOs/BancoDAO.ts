import db from "@services/SQLiteDatabse";

import { BancoDTO } from "@storage/_DTOs/BancoDTO";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tab_banco (codigo TEXT PRIMARY KEY, descricao TEXT);"
  );
});

const Create = (banco : BancoDTO) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO tab_banco (codigo, descricao) values (?, ?);", [ banco.codigo, banco.descricao ],
                (_, { rowsAffected, insertId }) => {
                if (rowsAffected > 0) 
                    resolve(insertId);
                else 
                    reject("Erro ao Gravar Registro: " + JSON.stringify(banco));
                },
                (_, error) : boolean => { 
                    reject(error);
                    return false;
                }
            );
        });
    });
};

const Update = ( banco : BancoDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tab_banco SET descricao=? WHERE codigo=?;", [ banco.descricao, banco.codigo ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) 
            resolve(rowsAffected);
          else 
            reject("Erro ao Alterar o Registro: codigo=" + banco.codigo);
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
      tx.executeSql("SELECT * FROM tab_banco WHERE codigo=?;", [ codigo ],
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

const RequestAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM tab_banco;", [],
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
      tx.executeSql("DELETE FROM tab_banco WHERE codigo=?;", [ codigo ],
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