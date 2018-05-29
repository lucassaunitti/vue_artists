import config from './config'

const API_KEY = config.apiKey;
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:location&api_key=${API_KEY}&format=json`

export default function getArtists(location) {
  const url = URL.replace(':location', location)
  return fetch(url)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}
