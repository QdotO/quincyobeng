import React, { ReactNode } from 'react'
import styled from 'styled-components'
import navItems from '../../textContent/Panel/navItems'

const Container = styled.div`
    width: 80%;
    height: 80vh;
    margin: 0 auto 2rem auto;
    border: 1px solid var(--light-color);
    border-radius: var(--rounded-corners);
    --blue-color: #1b4cec;
    --header-height: 68px;
    position: relative;
`

const Header = styled.div`
    width: 100%;
    height: 68px;
    padding: 1rem;
    background: var(--blue-color);
    border-top-left-radius: var(--rounded-corners);
    border-top-right-radius: var(--rounded-corners);
`
const Aside = styled.aside`
    width: 180px;
    position: absolute;
    bottom: 0;
    top: var(--header-height);
    background: var(--light-color);
    display: flex;
    flex-direction: column;
`
const NavItem = styled.div`
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    color: var(--blue-color);
    display: flex;
`

const NavItems = styled.div``

const FlexContainer = styled.div`
    display: flex;
`

type Props = {
    children: ReactNode
}

const Panel = (props: Props) => {
    return (
        <Container>
            <Header>Header</Header>
            <FlexContainer>
                <Aside>
                    <NavItems>
                        {navItems.map((item) => {
                            return <NavItem key={item.id}>{item.text}</NavItem>
                        })}
                    </NavItems>
                </Aside>
                {props.children}
            </FlexContainer>
        </Container>
    )
}

export default Panel
