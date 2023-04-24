type ClassLevelDetails = {
  details: {
    level: number
    proficiencyBonus: number
    features: { text: string }[]
    cantrips: number
    spells: number
    spellSlots: number[]
  }
}

export default ClassLevelDetails
