import React from 'react'
import styled from 'styled-components'
import Header from '../modules/PersonalSite/components/Header'

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  font-size: 2rem;
  @media screen AND (min-width: 500px) {
    align-items: flex-start;
  }
`
const ContactCard = styled.div`
  box-shadow: var(--box-shadow);
  border-radius: var(--rounded-corners);
  padding: var(--basic-padding);
  min-height: 400px;
  min-width: 290px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen AND (min-width: 500px) {
    flex-direction: row;
    gap: 2rem;
    min-height: unset;
    min-width: unset;
    width: fit-content;
  }
`

const Detail = styled.div`
  color: var(--tertiary-color);
`

type Props = {}

const Contact = (props: Props) => {
  return (
    <Container>
      <div>
        <h2>My Contact Details</h2>
        <ContactCard>
          <div>
            <label>Email</label>
            <Detail>Quincyobeng@gmail.com</Detail>
          </div>
          <div>
            <label>Phone Number</label>
            <Detail>832 420-8236</Detail>
          </div>
          <div>
            <label>Twitter</label>
            <Detail>@QuincyTheEngineer</Detail>
          </div>
        </ContactCard>
      </div>
    </Container>
  )
}

export default Contact
