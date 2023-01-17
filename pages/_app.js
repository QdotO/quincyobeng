import '../styles/globals.css'
import Header from '../modules/PersonalSite/components/Header'
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='baseContainer'>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
