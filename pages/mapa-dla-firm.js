import Map from '../components/Map'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Consultant from '../components/Consultant'
import styled from 'styled-components'
import { useState } from 'react'

export default function MapaDlaDomu({ powiats, powiatsBig, consultants }) {
  const [currPowiat, setCurrPowiat] = useState(null)
  const [currWojewodztwo, setCurrWojewodztwo] = useState('')

  if (!powiats || !consultants) {
    return 'Loading...'
  }
  let currConsultant, currConsultantBig
  if (currPowiat) {
    currConsultant = {
      name: powiats[currPowiat.split(' ').join('_')]?.consultant,
      ...consultants[powiats[currPowiat.split(' ').join('_')]?.consultant],
    }
    currConsultantBig = {
      name: powiatsBig[currPowiat.split(' ').join('_')]?.consultant,
      ...consultants[powiatsBig[currPowiat.split(' ').join('_')]?.consultant],
    }
  }

  return (
    <MainWrapper>
      <Map
        powiats={powiats}
        currPowiat={currPowiat}
        setCurrPowiat={setCurrPowiat}
        currWojewodztwo={currWojewodztwo}
        setCurrWojewodztwo={setCurrWojewodztwo}
      />
      <ConsultantWrapper>
        <Consultant
          color={'#2a7d2e'}
          isWojewodztwo={!!currWojewodztwo}
          powiat={currPowiat}
          consultant={currConsultant ?? null}
          label={'LPG dla firm z mocą poniżej 350kW'}
        />
        <Consultant
          color={'#0f4f9e'}
          isWojewodztwo={!!currWojewodztwo}
          powiat={currPowiat}
          consultant={currConsultantBig ?? null}
          label={'LPG/LNG dla firm z mocą powyżej 350kW'}
        />
      </ConsultantWrapper>
    </MainWrapper>
  )
}

export async function getServerSideProps() {
  const app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  })
  const db = getFirestore(app)

  const powiats = (await getDoc(doc(db, 'powiats', 'powiats-data'))).data()
  const powiatsBig = (
    await getDoc(doc(db, 'powiats', 'powiats-data-big-company'))
  ).data()
  const consultants = (
    await getDoc(doc(db, 'consultants-info', 'consultants'))
  ).data()

  return { props: { powiats, powiatsBig, consultants } }
}

const MainWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  height: 100vh;
`

const ConsultantWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
