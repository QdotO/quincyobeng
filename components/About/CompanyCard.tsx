import React from 'react'
import styled from 'styled-components'
import Company from '../../types/Company'

type Props = {
    company: Company
}

const Card = styled.div`
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
        width: 30%;
    }
`

const CompanyCard = ({ company }: Props) => {
    return (
        <Card>
            <div>
                <p>{company.name}</p>
                <p>Start Date - {company.tenure.start}</p>
                <p>End Date - {company.tenure.finish}</p>
                <p>Projects</p>

                {company.tenure.projects.map(
                    ({ title, technology, supportingTechnologies }) => {
                        return (
                            <details key={title}>
                                <summary>{title}</summary>
                                <div>
                                    <p>Primary Technology</p>
                                    <p>{technology}</p>
                                </div>
                                {!!supportingTechnologies && (
                                    <div>
                                        <p>Supporting Technologies</p>
                                        <ul>
                                            {supportingTechnologies.map(
                                                (tech) => (
                                                    <li key={tech}>{tech}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </details>
                        )
                    }
                )}
            </div>
        </Card>
    )
}

export default CompanyCard
