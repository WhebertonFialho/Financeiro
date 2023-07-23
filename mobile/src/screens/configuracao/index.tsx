import { useState, useCallback } from 'react';
import { Alert, View, Text } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Container } from './styles';

export function Configuracao() {
    return(
        <Container>
            <Text>Configuração</Text>
        </Container>
    )
}