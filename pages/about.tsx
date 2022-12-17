import React from 'react'
import styled from 'styled-components'
import CompanySection from '../components/About/CompanySection'
import textContent from '../textContent/aboutMeSections'

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    margin: 0 0 5rem 0;
`

type Props = {}

const about = (props: Props) => {
    return (
        <Container>
            <h2>About Me</h2>
            <div>{`I'm Quincy Obeng`}</div>
            <p>
                I was born in {textContent.birthplace} on {textContent.birthday}
            </p>
            <p>
                I graduated from {textContent.education.college} with a{' '}
                {textContent.education.degree}
            </p>
            <p>
                I have worked for {textContent.career.companies.length}{' '}
                companies in my career
            </p>
            <CompanySection companies={textContent.career.companies} />
        </Container>
    )
}

export default about
