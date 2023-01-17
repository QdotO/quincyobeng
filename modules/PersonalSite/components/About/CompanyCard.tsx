import React from 'react'
import Company from '../../types/Company'
import styles from '../../../../styles/CompanyCard.module.css'

type Props = {
  company: Company
}

const CompanyCard = ({ company }: Props) => {
  return (
    <div className={styles.companyCard}>
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
                      {supportingTechnologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </details>
            )
          }
        )}
      </div>
    </div>
  )
}

export default CompanyCard
