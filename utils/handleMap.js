import { Loader } from 'google-maps'
import { focusData } from '../data/focusData'

function loadPowiats(map, powiats, currWojewodztwo) {
  for (const powiat in powiats) {
    if (powiats[powiat].wojewodztwo === currWojewodztwo) {
      map.data.loadGeoJson(
        `https://novatek-landing-mapa.web.app/powiaty_geojson/${powiat}.geojson`
      )
    }
  }
}

let map
let isMapLocked = false

function clearMap() {
  isMapLocked = false
  map.data.forEach((feature) => {
    map.data.remove(feature)
  })
}

export async function initMap(wrapper, updatePowiat) {
  const loader = new Loader(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  const google = await loader.load()

  map = new google.maps.Map(wrapper, {
    center: new google.maps.LatLng(52.22, 19.373),
    zoom: window.innerWidth <= 500 ? 5.5 : 6,
    mapTypeId: 'terrain',
    disableDefaultUI: true,
    zoomControl: true,
  })

  addMapListeners(updatePowiat)
}

export async function renderMap(powiats, wojewodztwo) {
  if (!map) {
    return
  }
  clearMap()

  if (wojewodztwo) {
    loadPowiats(map, powiats, wojewodztwo)

    map.setCenter(focusData[wojewodztwo].coords)
    map.setZoom(focusData[wojewodztwo].zoom)
  } else {
    map.setCenter({ lat: 52.22, lng: 19.373 })
    map.setZoom(6)
  }

  map.data.setStyle({
    fillColor: '#007DB5',
    fillOpacity: 0.15,
    strokeWeight: 0.5,
    strokeColor: '#777777',
  })
}

function addMapListeners(updatePowiat) {
  map.data.addListener('mouseover', (event) => {
    if (!isMapLocked) {
      updatePowiat(event.feature.j.name)
      map.data.revertStyle()
      map.data.overrideStyle(event.feature, {
        strokeWeight: 1,
        fillColor: '#284d42',
        fillOpacity: 0.7,
        strokeColor: '#000',
      })
    }
  })

  map.data.addListener('click', (event) => {
    map.data.revertStyle()
    isMapLocked = !isMapLocked

    if (isMapLocked) {
      map.data.overrideStyle(event.feature, {
        strokeWeight: 1,
        fillColor: '#ff0000',
        fillOpacity: 0.7,
        strokeColor: '#000',
      })
    }
  })

  map.data.addListener('mouseout', () => {
    if (!isMapLocked) {
      updatePowiat('')
      map.data.revertStyle()
    }
  })
}
