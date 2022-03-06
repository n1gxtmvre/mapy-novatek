import Map from '../components/Map'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Consultant from '../components/Consultant'
import styled from 'styled-components'
import { useState } from 'react'

export default function MapaDlaDomu({ powiats, consultants }) {
  const [currPowiat, setCurrPowiat] = useState(null)
  const [currWojewodztwo, setCurrWojewodztwo] = useState('')

  if (!powiats || !consultants) {
    return 'Loading...'
  }
  let currConsultant
  if (currPowiat) {
    currConsultant = {
      name: powiats[currPowiat.split(' ').join('_')]?.consultant,
      ...consultants[powiats[currPowiat.split(' ').join('_')]?.consultant],
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
      <Consultant
        color={'#284d42'}
        isWojewodztwo={!!currWojewodztwo}
        powiat={currPowiat}
        consultant={currConsultant ?? null}
      />
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
  const consultants = (
    await getDoc(doc(db, 'consultants-info', 'consultants'))
  ).data()

  return { props: { powiats, consultants } }
}

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`
