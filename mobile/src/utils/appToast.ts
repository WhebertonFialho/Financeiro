import Toast from 'react-native-toast-message';

export function AppToastGravarSucesso() {
    Toast.show({
        type: 'success',
        text1: 'Gravar',
        text2: 'Gravado com sucesso.'
    });
}

export function AppToastGravarErro() {
    Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Falha ao gravar.'
    });
}

export function AppToastSucesso(mensagem : string) {
    Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: mensagem
    });
}

export function AppToastErro(mensagem : string) {
    Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: mensagem
    });
}

export function AppToastInformacao(mensagem : string) {
    Toast.show({
        type: 'info',
        text1: 'Atenção',
        text2: mensagem
    });
}