import Company from '../../types/Company'

const USAA: Company = {
    name: 'USAA',
    tenure: {
        start: 'May 2014',
        finish: 'March 2021',
        projects: [
            {
                role: 'Software Developer & Integrator III',
                section: 'Revolutionary Development / Innovation',
                tenure: {
                    start: 'May 2014',
                    finish: 'August 2015',
                },
                languages: ['Java'],
                technology: 'Java 8',
                title: 'Mobile DDOS Protection',
            },
            {
                role: 'Software Developer & Integrator II',
                section: 'Android Mobile',
                tenure: {
                    start: 'August 2015',
                    finish: 'April 2016',
                },
                languages: ['Java'],
                technology: 'Android',
                title: 'Document Capture & Upload',
            },
            {
                role: 'Software Developer & Integrator II',
                section: 'Mobile - Emerging Tech',
                tenure: {
                    start: 'April 2016',
                    finish: 'April 2017',
                },
                languages: ['Java'],
                technology: 'Android',
                title: 'Mobile Wallet',
            },
            {
                role: 'Software Developer & Integrator I',
                section: 'Cloud - Emerging Tech',
                tenure: {
                    start: 'April 2017',
                    finish: 'November 2019',
                },
                languages: ['Javascript'],
                technology: 'NodeJs',
                supportingTechnologies: [
                    'AWS',
                    'Azure',
                    'OpenShift',
                    'Docker',
                    'Kubernetes',
                    'Redis',
                    'Google Assistant',
                    'Amazon Alexa',
                    'Facebook Messenger',
                    'NLP',
                    'Clink',
                    'Jest',
                    'Sinon',
                    'Istanbul',
                    'Java',
                ],
                title: 'Conversational Enablement',
            },
            {
                role: 'Senior Software Engineer',
                section: 'JOIN USAA',
                tenure: {
                    start: 'November 2019',
                    finish: 'March 2021',
                },
                languages: ['Javascript'],
                technology: 'React',
                supportingTechnologies: ['Redux', 'Java', 'Jest'],
                title: 'Onboarding',
            },
        ],
    },
}

export default USAA
