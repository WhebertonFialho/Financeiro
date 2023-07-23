import { useState, useCallback } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { ScreenHeader } from '@components/ScreenHeader';
import { Container } from './styles';
import { ScreenTitulo } from '@components/ScreenTitulo';

export function Home() {
    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
        </Container>
    )
}