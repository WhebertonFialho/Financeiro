import db from "@services/SQLiteDatabse";

import { TipoLancamentoDTO } from "@DTOs/TipoLancamentoDTO";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tab_tipo_lancamento (codigo TEXT PRIMARY KEY, descricao TEXT);"
  );
});

const Create = (tipoLancamento : TipoLancamentoDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO tab_tipo_lancamento (codigo, descricao) values (?, ?);", [ tipoLancamento.codigo, tipoLancamento.descricao ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) 
            resolve(insertId);
          else 
            reject("Erro ao Gravar Registro: " + JSON.stringify(tipoLancamento));
        },
        (_, error) : boolean => { 
            reject(error);
            return false;
        }
      );
    });
  });
};

const Update = ( tipoLancamento : TipoLancamentoDTO) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tab_tipo_lancamento SET descricao=? WHERE codigo=?;", [ tipoLancamento.descricao, tipoLancamento.codigo ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) 
            resolve(rowsAffected);
          else 
            reject("Erro ao Alterar o Registro: codigo=" + tipoLancamento.codigo);
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
      tx.executeSql("SELECT * FROM tab_tipo_lancamento WHERE codigo=?;", [ codigo ],
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
      tx.executeSql("SELECT * FROM tab_tipo_lancamento;", [],
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
      tx.executeSql("DELETE FROM tab_tipo_lancamento WHERE codigo=?;", [ codigo ],
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