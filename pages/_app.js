import styled from 'styled-components'
import '../styles/globals.css'
import Header from '../modules/PersonalSite/components/Header'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'

const BaseContainer = styled.div`
    padding: 0 2rem;
    max-width: var(--max-width);
`

function MyApp({ Component, pageProps }) {
    return (
        <BaseContainer>
            <Header />
            <Component {...pageProps} />
        </BaseContainer>
    )
}

export default MyApp
