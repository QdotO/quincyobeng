import React from 'react'
import styled from 'styled-components'
import Platform from '../modules/PersonalSite/components/Platform/Platform'

type Props = {}

const Container = styled.div`
  margin: 0 auto;
  border: 1px solid black;
`

const mywork = (props: Props) => {
  return (
    <Container>
      <h3>{`Things I've worked on in my career`}</h3>
      <Platform />
    </Container>
  )
}

export default mywork
