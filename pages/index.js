import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../modules/PersonalSite/components/Banner/Banner'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>QuincyObeng.com</title>
        <meta name='description' content='Quincy Obeng Personal Site' />
      </Head>

      <main className={styles.main}>
        <Banner />
      </main>

      <footer className={styles.footer}>Copyright 2022</footer>
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
