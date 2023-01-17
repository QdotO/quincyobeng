import React from 'react'
import styles from '../styles/About.module.css'
import CompanySection from '../modules/PersonalSite/components/About/CompanySection'
import textContent from '../modules/PersonalSite/textContent/aboutMeSections'

type Props = {}

const about = (props: Props) => {
  return (
    <div className={styles.container}>
      <h2>About Me</h2>
      <div>{`I'm Quincy Obeng`}</div>
      <p>
        I was born in {textContent.birthplace} on {textContent.birthday}
      </p>
      <p>
        I graduated from {textContent.education.college} with a{' '}
        {textContent.education.degree}
      </p>
      <p>
        I have worked for {textContent.career.companies.length} companies in my
        career
      </p>
      <CompanySection companies={textContent.career.companies} />
    </div>
  )
}

export default about
