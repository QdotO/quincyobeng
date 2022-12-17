import React from 'react'
import styled from 'styled-components'
import Company from '../../types/Company'
import CompanyCard from './CompanyCard'

type Props = {
    companies: Company[]
}

const CompaniesContainer = styled.div`
    display: flex;
    gap: 1.5rem;
`

const CompanySection = ({ companies }: Props) => {
    return (
        <CompaniesContainer>
            {companies.map((company) => {
                return <CompanyCard key={company.name} company={company} />
            })}
        </CompaniesContainer>
    )
}

export default CompanySection
