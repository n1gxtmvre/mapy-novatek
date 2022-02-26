import styled from 'styled-components'

export default function Consultant({
  consultant,
  powiat,
  isWojewodztwo,
  label,
  color,
}) {
  if (consultant == null) {
    return (
      <ConsultantWrapper>
        {label && <TopLabel color={color}>{label}</TopLabel>}
        <ConsultantPhoto
          src='https://novatek-landing-mapa.web.app/consultant_photos/placeholder.png'
          alt=''
          color={color}
        />

        <ConsultantPhoneNumber>
          {isWojewodztwo
            ? 'Kliknij na właściwy powiat, aby wyświetlić dane kontaktowe do Doradcy, działającego w Twoim regionie.'
            : 'Wybierz swoje województwo z powyższego menu.'}
        </ConsultantPhoneNumber>
        <Powiat color={color}></Powiat>
      </ConsultantWrapper>
    )
  }
  const { name, email, phoneNumber, photo } = consultant

  return (
    <ConsultantWrapper>
      {label && <TopLabel color={color}>{label}</TopLabel>}
      <ConsultantPhoto
        src={`https://novatek-landing-mapa.web.app/consultant_photos/${photo}`}
        alt=''
        color={color}
      />
      <ConsultantName>{name}</ConsultantName>
      <ConsultantPhoneNumber>{phoneNumber}</ConsultantPhoneNumber>
      <ConsultantEmail href={`mailto:${email}`}>{email}</ConsultantEmail>
      <Powiat color={color}>{powiat.split(' (')[0]}</Powiat>
    </ConsultantWrapper>
  )
}

const ConsultantWrapper = styled.div`
  background: white;
  min-width: 250px;
  color: ${(props) => props.color};
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 20px;
  padding-bottom: 0;
  box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.25);
`

const TopLabel = styled.h1`
  width: 100%;
  color: #fff;
  background-color: ${(props) => props.color};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0.3em 1.5em;
  font-size: 0.8rem;
  margin: 0;
  margin-bottom: 1em;
  text-align: center;
`

const ConsultantPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  top: -50px;
  z-index: 2;
  border: solid 4px ${(props) => props.color};
  margin-bottom: 1rem;
`

const ConsultantName = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
`

const ConsultantPhoneNumber = styled.p`
  color: #7e7e7e;
  text-align: center;
  font-size: 1rem;
  margin: 0;
  max-width: 300px;
`

const ConsultantEmail = styled.a`
  color: #2498da;
  text-align: center;
  font-size: 1rem;
  margin: 0;
`

const Powiat = styled.div`
  font-size: 0.7rem;
  background: ${(props) => props.color};
  color: white;
  padding: 0.2em 0.5em;
  margin: 0.5rem 0 0 0;
  width: 100%;
  padding: 0.5em;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`
