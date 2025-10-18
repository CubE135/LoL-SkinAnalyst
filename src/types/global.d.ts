declare global {
  type CurrentSummonerType = {
    accountId: number
    displayName: string
    gameName: string
    internalName: string
    nameChangeFlag: boolean
    percentCompleteForNextLevel: number
    privacy: string
    profileIconId: number
    puuid: string
    rerollPoints: {
      currentPoints: number
      maxRolls: number
      numberOfRolls: number
      pointsCostToRoll: number
      pointsToReroll: number
    }
    summonerId: number
    summonerLevel: number
    tagLine: string
    unnamed: boolean
    xpSinceLastLevel: number
    xpUntilNextLevel: number
  }

  type ChampionType = {
    active: boolean
    alias: string
    banVoPath: string
    baseLoadScreenPath: string
    baseSplashPath: string
    botEnabled: boolean
    chooseVoPath: string
    disabledQueues: []
    freeToPlay: boolean
    id: number
    isVisibleInClient: boolean
    name: string
    ownership: {
      loyaltyReward: boolean
      owned: boolean
      rental: {
        endDate: number
        purchaseDate: number
        rented: boolean
        winCountRemaining: number
      }
      xboxGPReward: boolean
    }
    passive: {
      description: string
      name: string
    }
    purchased: number
    rankedPlayEnabled: boolean
    roles: string[]
    skins: SkinType[]
    spells: []
    squarePortraitPath: string
    stingerSfxPath: string
    tacticalInfo: {
      damageType: string
      difficulty: number
      style: number
    }
    title: string
  }

  type SkinType = {
    id: number
    isBase: boolean
    name: string
    tilePath: string
    ownership: {
      owned: boolean
    }
    skinType: string
  }

  type LootType = {
    asset: string
    count: number
    disenchantLootName: string
    disenchantRecipeName: string
    disenchantValue: number
    displayCategories: string
    expiryTime: number
    isNew: boolean
    isRental: boolean
    itemDesc: string
    itemStatus: string
    localizedDescription: string
    localizedName: string
    localizedRecipeSubtitle: string
    localizedRecipeTitle: string
    lootId: string
    lootName: string
    parentItemStatus: string
    parentStoreItemId: number
    rarity: string
    redeemableStatus: string
    refId: string
    rentalGames: number
    rentalSeconds: number
    shadowPath: string
    splashPath: string
    storeItemId: number
    tags: string
    tilePath: string
    type: string
    upgradeEssenceName: string
    upgradeEssenceValue: number
    upgradeLootName: string
    value: number
  }

  type StoreCatalogType = {
    active: boolean
    bundled: null
    iconUrl: string
    inactiveDate: null
    inventoryType: string
    itemId: number
    itemInstanceId: string
    itemRequirements: null
    localizations: {
      [locale: string]: {
        description: string
        language: string
        name: string
      }
    }
    maxQuantity: number
    metadata: null
    offerId: string
    prices: []
    releaseDate: string
    sale: null
    subInventoryType: null
    tags: null
  }

  type StatStoneType = {
    championId: number
    milestonesPassed: number
    sets: {
      milestonesPassed: number
      name: string
      stonesAvailable: number
      stonesIlluminated: number
      stonesOwned: number
    }[]
    stonesAvailable: number
    stonesIlluminated: number
    stonesOwned: number
  }
}

export {} // 👈 Required to make this a module
