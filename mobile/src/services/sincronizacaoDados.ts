import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

import { AppError } from "@utils/AppError";
import { AppToastErro } from "@utils/appToast";

import BancoDAO from "@storage/_DAOs/BancoDAO";
import BandeiraCartaoDAO from "@storage/_DAOs/BandeiraCartaoDAO";
import TipoCartaoDAO from "@storage/_DAOs/TipoCartaoDAO";
import TipoLancamentoDAO from "@storage/_DAOs/TipoLancamentoDAO";

import { BancoDTO } from "@storage/_DTOs/BancoDTO";
import { BandeiraCartaoDTO } from "@storage/_DTOs/BandeiraCartaoDTO";
import { TipoCartaoDTO } from "@storage/_DTOs/TipoCartaoDTO";
import { TipoLancamentoDTO } from "@storage/_DTOs/TipoLancamentoDTO";

export async function SincronizacaoDados(){
    try {
        await api.get('banco')
                .then(response => { 
                    response.data.map((banco : BancoDTO) => {
                        BancoDAO.Create(banco)
                            .then( codigo => console.log('Banco criado com o código: ' + codigo) ) 
                            .catch( err => console.log(err) );
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
                        BandeiraCartaoDAO.Create(bandeiraCartao)
                            .then( codigo => console.log('Bandeira do Cartão criado com o código: ' + codigo) )
                            .catch( err => console.log(err) ); 
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
                        TipoCartaoDAO.Create(tipoCartao)
                            .then( codigo => console.log('Tipo do Cartão criado com o código: ' + codigo) )
                            .catch( err => console.log(err) ); 
                    });
                }).catch(err => {
                    if(err instanceof AppError)
                        return AppToastErro(err.menssagem);
                    
                    AppToastErro(err);
                });

        await api.get('tipo_lancamento')
                .then(response => { 
                    response.data.map((tipoLancamento : TipoLancamentoDTO) => {
                        TipoLancamentoDAO.Create(tipoLancamento)
                            .then( codigo => console.log('Tipo de Lancamento criado com o código: ' + codigo) )
                            .catch( err => console.log(err) ); 
                    });
                }).catch(err => {
                    if(err instanceof AppError)
                        return AppToastErro(err.menssagem);
                
                    AppToastErro(err); 
                });

    } catch (error) {
        if(error instanceof AppError)
            return AppToastErro(error.menssagem);
        
        console.log('vish')
    }
}