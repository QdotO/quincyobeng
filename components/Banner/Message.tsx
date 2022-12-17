import React from 'react'
import styled from 'styled-components'

type Props = {}

const MessageContainer = styled.div`
    font-size: 1.5rem;
    text-align: flex-start;
    width: 85%;
`

const WelcomeMessage = styled.div`
    overflow: hidden;
    white-space: nowrap;

    @media screen AND (min-width: 500px) {
        font-size: 4vw;
    }

    @media screen AND (min-width: 768px) {
        font-size: 4vw;
    }
`

const Description = styled.div`
    color: var(--dark-color);
    font-size: 1rem;
    margin: 1rem auto 1.5rem auto;

    text-align: start;

    @media (prefers-color-scheme: dark) {
        color: var(--light-color);
    }

    @media screen AND (min-width: 1024px) {
        font-size: 2vw;
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

const Message = (props: Props) => {
    const years = new Date().getUTCFullYear() - 2014
    const resumeUrl =
        'https://drive.google.com/uc?export=download&id=1vR0ZK-7SwM_lpSj1c2Yx0XMJnRAugO5g'
    const handleResumeClick = () => {
        window?.open(resumeUrl)
    }
    return (
        <MessageContainer>
            <WelcomeMessage>{`Hi, I'm Quincy Obeng`}</WelcomeMessage>
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
        </MessageContainer>
    )
}

export default Message
