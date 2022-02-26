import styled from 'styled-components'

export default function Dropdown({ options, handleChange }) {
  return (
    <DropdownWrapper>
      <Select onChange={handleChange}>
        <option value=''>Wybierz wojewodztwo</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
      <CustomArrow>
        <img src='/img/Arrow-down.svg' alt='' />
      </CustomArrow>
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
  position: relative;
  width: 220px;
`

const Select = styled.select`
  appearance: none;
  cursor: pointer;
  outline: none;
  border: 2px solid #222;
  padding: 1em;
  width: 100%;
  border-radius: 10px;

  option {
    padding: 1em;
    font-size: 1rem;
  }
`

const CustomArrow = styled.div`
  display: grid;
  place-items: center;

  width: 3rem;
  height: 80%;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  background: transparent;
  position: absolute;
  pointer-events: none;

  img {
    width: 100%;
    max-width: 20px;
  }
`
