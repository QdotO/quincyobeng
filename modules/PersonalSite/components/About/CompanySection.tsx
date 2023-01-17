import React from 'react'
import styles from '../../../../styles/CompanySection.module.css'
import Company from '../../types/Company'
import CompanyCard from './CompanyCard'

type Props = {
  companies: Company[]
}

const CompanySection = ({ companies }: Props) => {
  return (
    <div className={styles.companiesContainer}>
      {companies.map((company) => {
        return <CompanyCard key={company.name} company={company} />
      })}
    </div>
  )
}

export default CompanySection
