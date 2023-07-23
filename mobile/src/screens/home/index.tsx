import { useState, useCallback } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Container } from './styles';

export function Home() {
    return(
        <Container>
            <Text>Home</Text>
        </Container>
    )
}