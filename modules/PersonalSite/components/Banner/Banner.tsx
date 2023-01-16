import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import HeroImg from '../../../../public/heroImage.jpeg'
import Message from './Message'

const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column-reverse;

  @media screen AND (min-width: 500px) {
    flex-direction: row;
    height: 500px;
  }
`
const DividerContainer = styled.div`
  width: 25%;
`

const Divider = styled.hr`
  border: 3px solid var(--primary-color);
  align-self: flex-start;
`

type Props = {}

const Banner = (props: Props) => {
  return (
    <BannerContainer>
      <div>
        <DividerContainer>
          <Divider />
        </DividerContainer>
        <Message />
      </div>
      <Image className='banner-img' src={HeroImg} alt='Quincy Obeng' priority />
    </BannerContainer>
  )
}

export default Banner
