import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--header-height);
    margin: 0 auto;
    border-bottom: 1px solid var(--grey-color);

    @media screen AND (min-width: 500px) {
        margin-bottom: 2rem;
        max-width: var(--max-width);
    }
`

const HeaderLinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const HeaderLink = styled.a`
    font-size: 1.25rem;
    padding: 0 1rem;

    :hover {
        color: var(--tertiary-color);
    }
`

const HeaderText = styled.a`
    font-size: 1.5rem;
    color: var(--primary-color);
`
const Divider = styled.div`
    width: 1px;
    padding: 0.25rem 0;
    border: 1px solid var(--light-color);
`
type Props = {}

const Header = (props: Props) => {
    return (
        <HeaderContainer>
            <HeaderText href='/'>QuincyObeng.com</HeaderText>
            {/* <HeaderLinkContainer>
                <HeaderLink href='/about'>About</HeaderLink>
                <Divider />
                <HeaderLink href='/posts'>Posts</HeaderLink>
                <Divider />
                <HeaderLink href='/contact'>Contact Quincy</HeaderLink>
            </HeaderLinkContainer> */}
        </HeaderContainer>
    )
}

export default Header
