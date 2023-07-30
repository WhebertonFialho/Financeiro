import { Container } from './styles';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';

export function Home() {
    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
        </Container>
    )
}