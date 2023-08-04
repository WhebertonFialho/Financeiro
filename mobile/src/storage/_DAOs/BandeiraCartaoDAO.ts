import db from "@services/SQLiteDatabse";

import { BandeiraCartaoDTO } from "@DTOs/BandeiraCartaoDTO";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tab_bandeira_cartao (codigo TEXT PRIMARY KEY, descricao TEXT);"
  );
});

const Create = (bandeiraCartao : BandeiraCartaoDTO) => {
  return new Promise((resolve, reject) => {
    RequestByCodigo(bandeiraCartao.codigo)
        .then( res => { 
          return 
        })

    db.transaction((tx) => {
      tx.executeSql("INSERT INTO tab_bandeira_cartao (codigo, descricao) values (?, ?);", [ bandeiraCartao.codigo, bandeiraCartao.descricao ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) 
            resolve(insertId);
          else 
            reject("Erro ao Gravar Registro: " + JSON.stringify(bandeiraCartao));
        },
        (_, error) : boolean => { 
            reject(error);
            return false;
        }
      );
    });
  });
};

const Update = ( bandeiraCartao : BandeiraCartaoDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tab_bandeira_cartao SET descricao=? WHERE codigo=?;", [ bandeiraCartao.descricao, bandeiraCartao.codigo ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) 
            resolve(rowsAffected);
          else 
            reject("Erro ao Alterar o Registro: codigo=" + bandeiraCartao.codigo);
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
      tx.executeSql("SELECT * FROM tab_bandeira_cartao WHERE codigo=?;", [ codigo ],
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
      tx.executeSql("SELECT * FROM tab_bandeira_cartao;", [],
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
      tx.executeSql("DELETE FROM tab_bandeira_cartao WHERE codigo=?;", [ codigo ],
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