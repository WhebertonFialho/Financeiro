import db from "@services/SQLiteDatabase";

import { ContaBancariaDTO } from "@storage/_DTOs/ContaBancariaDTO";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS cad_conta_bancaria (codigo TEXT PRIMARY KEY, descricao TEXT, agencia TEXT, nro_conta TEXT, valor_inicial TEXT, banco TEXT, usuario TEXT);"
  );
});

const Create = (contaBancaria : ContaBancariaDTO) => {
  return new Promise((resolve, reject) => {
    RequestByCodigo(contaBancaria.codigo)
      .then( res => { 
        resolve(contaBancaria.codigo); 
      })
      .catch(err => {
        db.transaction((tx) => {
          tx.executeSql("INSERT INTO cad_conta_bancaria (codigo, descricao, agencia, nro_conta, valor_inicial, banco, usuario) values (?, ?, ?, ?, ?, ?, ?);", 
            [ contaBancaria.codigo, contaBancaria.descricao, contaBancaria.agencia, contaBancaria.nro_conta, contaBancaria.valor_inicial, contaBancaria.banco, contaBancaria.usuario ],
            (_, { rowsAffected, insertId }) => {
              if (rowsAffected > 0) 
                resolve(insertId);
              else 
                reject("Erro ao Gravar Registro: " + JSON.stringify(contaBancaria.descricao));
            },
            (_, error) : boolean => { 
              reject(error);
              return false;
            }
          );
        });
      })
  });
};

const Update = ( contaBancaria : ContaBancariaDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE cad_conta_bancaria SET descricao=?, agencia=?, nro_conta=?, valor_inicial=?, banco=?, usuario=? WHERE codigo=?;", 
      [ contaBancaria.descricao, contaBancaria.agencia, contaBancaria.nro_conta, contaBancaria.valor_inicial, contaBancaria.banco, contaBancaria.usuario, contaBancaria.codigo ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) 
            resolve(rowsAffected);
          else 
            reject("Erro ao Alterar o Registro: codigo=" + contaBancaria.descricao);
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
      tx.executeSql("SELECT * FROM cad_conta_bancaria WHERE codigo=?;", [ codigo ],
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
      tx.executeSql("SELECT * FROM cad_conta_bancaria;", [],
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
      tx.executeSql("DELETE FROM cad_conta_bancaria WHERE codigo=?;", [ codigo ],
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