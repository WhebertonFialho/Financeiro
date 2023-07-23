import Toast from 'react-native-toast-message';

export function AppToastSucesso() {
    Toast.show({
        type: 'success',
        text1: 'Gravar',
        text2: 'Gravado com sucesso.'
    });
}

export function AppToastErro() {
    Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Falha ao gravar.'
    });
}

export function AppToastInformacao(mensagem : string) {
    Toast.show({
        type: 'info',
        text1: 'Atenção',
        text2: mensagem
    });
}