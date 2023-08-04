import db from "@services/SQLiteDatabse";

import { TipoCartaoDTO } from "@DTOs/TipoCartaoDTO";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tab_tipo_cartao (codigo TEXT PRIMARY KEY, descricao TEXT);"
  );
});

const Create = (tipoCartao : TipoCartaoDTO) => {
  return new Promise((resolve, reject) => {
    RequestByCodigo(tipoCartao.codigo)
        .then( res => { 
          return 
        })

    db.transaction((tx) => {
      tx.executeSql("INSERT INTO tab_tipo_cartao (codigo, descricao) values (?, ?);", [ tipoCartao.codigo, tipoCartao.descricao ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) 
            resolve(insertId);
          else 
            reject("Erro ao Gravar Registro: " + JSON.stringify(tipoCartao));
        },
        (_, error) : boolean => { 
            reject(error);
            return false;
        }
      );
    });
  });
};

const Update = ( tipoCartao : TipoCartaoDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tab_tipo_cartao SET descricao=? WHERE codigo=?;", [ tipoCartao.descricao, tipoCartao.codigo ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) 
            resolve(rowsAffected);
          else 
            reject("Erro ao Alterar o Registro: codigo=" + tipoCartao.codigo);
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
      tx.executeSql("SELECT * FROM tab_tipo_cartao WHERE codigo=?;", [ codigo ],
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
      tx.executeSql("SELECT * FROM tab_tipo_cartao;", [],
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
      tx.executeSql("DELETE FROM tab_tipo_cartao WHERE codigo=?;", [ codigo ],
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