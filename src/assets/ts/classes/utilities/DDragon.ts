type ChampionData = {
  id: string // e.g. "Janna"
  key: string // numeric string, e.g. "40"
  name: string // e.g. "Janna"
  [k: string]: any // any extra fields
}

type ChampionJson = {
  data: Record<string, ChampionData>
}

/**
 * Fetches the latest Data Dragon version
 */
export async function getLatestDDragonVersion(): Promise<string> {
  const response = await fetch(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )
  if (!response.ok)
    throw new Error(`Failed to fetch DDragon versions: ${response.status}`)
  const versions: string[] = await response.json()
  return versions[0] // first entry is latest
}

/**
 * Fetches the champion mapping JSON for a given version
 */
export async function getChampionMapping(
  version: string
): Promise<Record<string, ChampionData>> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  )
  if (!res.ok) throw new Error(`Failed to fetch champion JSON: ${res.status}`)
  const data: ChampionJson = await res.json()
  return data.data
}

/**
 * Get the Data Dragon champion icon URL from a numeric champion ID
 * @param championId - numeric champion ID (from LCU or API)
 */
export async function getChampionIconUrlFromId(
  championId: number
): Promise<string> {
  const version = await getLatestDDragonVersion()
  const mapping = await getChampionMapping(version)

  // Find the champion by numeric ID
  const champion = Object.values(mapping).find(
    (c) => Number(c.key) === championId
  )

  if (!champion) throw new Error(`Champion with ID ${championId} not found`)

  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`
}

/**
 * Get the Data Dragon champion skin splash URL from a numeric champion ID
 * @param championId - numeric champion ID (from LCU or API)
 */
export async function getChampionSkinSplashUrlFromId(
  championId: number,
  skinNum: number
): Promise<string> {
  const version = await getLatestDDragonVersion()
  const mapping = await getChampionMapping(version)

  // Find the champion by numeric ID
  const champion = Object.values(mapping).find(
    (c) => Number(c.key) === championId
  )

  if (!champion) throw new Error(`Champion with ID ${championId} not found`)

  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skinNum}.jpg`
}
