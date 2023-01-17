import Company from '../../types/Company'

const Endeavor: Company = {
    name: 'Endeavor',
    tenure: {
        start: 'March 2021',
        finish: 'March 2022',
        projects: [
            {
                role: 'Senior Software Engineer',
                section: 'Endeavor Digital',
                tenure: {
                    start: 'March 2021',
                    finish: 'December 2022',
                },
                languages: ['Javascript', 'Typescipt'],
                technology: 'React',
                supportingTechnologies: [
                    'Nextjs',
                    'AWS',
                    'Jenkins',
                    'Apollo',
                    'GraphQL',
                ],
                title: 'OnLocationLive',
            },
            {
                role: 'Senior Software Engineer',
                section: 'OnLocation',
                tenure: {
                    start: 'December 2022',
                    finish: 'March 2022',
                },
                technology: 'React',
                languages: ['Javascript', 'Typescipt'],
                title: 'Olympics 2024',
            },
        ],
    },
}

export default Endeavor
