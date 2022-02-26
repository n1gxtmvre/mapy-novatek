import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Mapy Novatek</h1>
      <ul>
        <li>
          <Link href='/mapa-dla-domu'>
            <span
              style={{
                color: '#2498da',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Mapa dla domu
            </span>
          </Link>
        </li>
        <li>
          <Link href='/mapa-dla-firm'>
            <span
              style={{
                color: '#2498da',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Mapa dla firm
            </span>
          </Link>
        </li>
      </ul>
    </main>
  )
}
