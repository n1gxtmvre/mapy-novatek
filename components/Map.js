import React, { useRef, useState } from 'react'
import { renderMap, initMap } from '../utils/handleMap'
import Dropdown from './Dropdown'
import { focusData } from '../data/focusData'
import styled from 'styled-components'

export default function Map({
  powiats,
  currPowiat,
  setCurrPowiat,
  currWojewodztwo,
  setCurrWojewodztwo,
}) {
  const mapWrapperRef = useRef()

  React.useEffect(() => {
    async function handleMapLogic() {
      if (currWojewodztwo) {
        await initMap(mapWrapperRef.current, (newPowiat) =>
          setCurrPowiat(newPowiat)
        )
        await renderMap(powiats, currWojewodztwo)
      }
    }
    handleMapLogic()
  }, [currWojewodztwo])

  return (
    <div>
      <TopWrapper>
        <span>Wybierz swoje województwo: </span>
        <Dropdown
          options={Object.keys(focusData)}
          handleChange={(e) => setCurrWojewodztwo(e.target.value)}
        />
      </TopWrapper>
      {currWojewodztwo && (
        <div ref={mapWrapperRef} style={{ width: 500, height: 500 }}></div>
      )}
    </div>
  )
}

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  padding: 1em;
  gap: 1rem;
  span {
    font-weight: bold;
  }
`
