import { api } from "./api";

import { AppError } from "@utils/AppError";
import { AppToastErro } from "@utils/appToast";

import { BancoDTO } from "@DTOs/BancoDTO";
import { BandeiraCartaoDTO } from "@DTOs/BandeiraCartaoDTO";
import { TipoCartaoDTO } from "@DTOs/TipoCartaoDTO";
import { TipoLancamentoDTO } from "@DTOs/TipoLancamentoDTO";

import { BancoGravar } from "@storage/banco/bancoGravar";
import { BandeiraCartaoGravar } from "@storage/bandeiraCartao/bandeiraCartaoGravar";
import { TipoCartaoGravar } from "@storage/tipoCartao/tipoCartaoGravar";
import { TipoLancamentoGravar } from "@storage/tipoLancamento/tipoLancamentoGravar";

export async function SincronizacaoDados(){
    try {
        await api.get('banco')
                .then(response => { 
                    response.data.map((banco : BancoDTO) => {
                        BancoGravar(banco);
                    });
                 })
                .catch(err => {
                    if(err instanceof AppError)
                        return AppToastErro(err.menssagem);
                    
                    AppToastErro(err);
                });
        
        await api.get('bandeira_cartao')
                .then(response => { 
                    response.data.map((bandeiraCartao : BandeiraCartaoDTO) => {
                        BandeiraCartaoGravar(bandeiraCartao);
                    })
                 })
                .catch(err => {
                    if(err instanceof AppError)
                        return AppToastErro(err.menssagem);
                    
                    AppToastErro(err);
                });

        await api.get('tipo_cartao')
                .then(response => { 
                    response.data.map((tipoCartao : TipoCartaoDTO) => {
                        TipoCartaoGravar(tipoCartao);
                    });
                }).catch(err => {
                    if(err instanceof AppError)
                        return AppToastErro(err.menssagem);
                    
                    AppToastErro(err);
                });

        await api.get('tipo_lancamento')
                .then(response => { 
                    response.data.map((tipoLancamento : TipoLancamentoDTO) => {
                        TipoLancamentoGravar(tipoLancamento);
                    });
                }).catch(err => {
                    if(err instanceof AppError)
                        return AppToastErro(err.menssagem);
                
                    AppToastErro(err); 
                });

    } catch (error) {
        if(error instanceof AppError)
            return AppToastErro(error.menssagem);
    }
}