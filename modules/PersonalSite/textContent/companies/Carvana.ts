import Company from '../../types/Company'

const Carvana: Company = {
    name: 'Carvana',
    tenure: {
        start: 'March 2022',
        finish: 'November 2022',
        projects: [
            {
                role: 'Senior Software Engineer',
                section: 'Special Projects',
                tenure: {
                    start: 'March 2021',
                    finish: 'November 2022',
                },
                languages: ['Javascript', 'Typescipt'],
                technology: 'React',
                supportingTechnologies: [
                    'Nextjs',
                    'Azure',
                    'git',
                    'Storybook',
                    'Yarn',
                    'Cypress',
                    'Jest',
                ],
                title: 'Carvana for Partners Platform',
            },
        ],
    },
}

export default Carvana
