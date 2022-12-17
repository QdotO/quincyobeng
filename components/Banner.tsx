import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import HeroImg from '../public/heroImage.jpeg'

const BannerContainer = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    max-width: var(--max-width);
`
const DividerContainer = styled.div`
    width: 25%;
`

const Divider = styled.hr`
    border: 3px solid var(--primary-color);
    align-self: flex-start;
`

const Message = styled.div`
    font-size: 5rem;
    text-align: flex-start;
    width: 100%;
`

const Description = styled.div`
    color: var(--dark-color);
    font-size: 1rem;
    width: 50%;
    text-align: start;

    @media (prefers-color-scheme: dark) {
        color: var(--light-color);
    }
`
const Descriptors = styled.span`
    color: var(--primary-color);
`
const ResumeDownload = styled.button`
    color: var(--dark-color);
    background: var(--primary-color);
    font-size: 1rem;
    padding: 1rem;
    border-radius: var(--rounded-corners);
    border: none;
    font-family: Secular One;

    :hover {
        color: var(--light-color);
        text-decoration: double;
    }

    @media (prefers-color-scheme: dark) {
        color: var(--light-color);
    }
`

type Props = {}

const Banner = (props: Props) => {
    const years = new Date().getUTCFullYear() - 2014
    const resumeUrl =
        'https://drive.google.com/uc?export=download&id=1vR0ZK-7SwM_lpSj1c2Yx0XMJnRAugO5g'
    const handleResumeClick = () => {
        window?.open(resumeUrl)
    }
    return (
        <BannerContainer>
            <div>
                <DividerContainer>
                    <Divider />
                </DividerContainer>
                <Message>
                    {`Hi, I'm Quincy Obeng`}
                    <Description>
                        {`I am a Senior Software Engineer with ${years} years of
                        experience. I'm passionate about user experience and
                        building solutions that are `}
                        <Descriptors>simple</Descriptors>
                        {', '} <Descriptors>easy to use</Descriptors>
                        {', '} <Descriptors>helpful</Descriptors>
                        {'. '} <br /> {`Let's build something!`}
                    </Description>
                    <ResumeDownload type='button' onClick={handleResumeClick}>
                        Download My Resume
                    </ResumeDownload>
                </Message>
            </div>
            <Image
                className='banner-img'
                src={HeroImg}
                alt='Quincy Obeng'
                priority
            />
        </BannerContainer>
    )
}

export default Banner
