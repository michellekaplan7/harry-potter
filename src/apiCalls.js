
export const getRandomHouse = async () => {
    const response = await fetch('https://www.potterapi.com/v1/sortingHat')
    const houseData = await response.json()
    return houseData
}


// export const getAdvice = async (setError, setIsLoading, setAdvice) => {
//     const url = 'https://api.adviceslip.com/advice'
//     setError('')
//     setIsLoading(true)
//     try {
//       const response = await fetch(url)
//       const advice = await response.json()
//       setAdvice(advice.slip.advice)
//     } catch(error) {
//       setError(error.message)
//     }
//     setIsLoading(false)
//   }


  export const getAdvice = async () => {
    const url = 'https://api.adviceslip.com/advice'
    //   setError('')
        
      try {
        const response = await fetch(url, {
          cache: "no-cache"
        })
        const advice = await response.json()
        return advice
        // setAdvice(advice.slip.advice)
      } catch(error) {
        // setError(error.message)
      }
    //   setIsLoading(false)
    }


    export const getSpells = async () => {
        const url = 'https://www.potterapi.com/v1/spells?key=$2a$10$qrr46GleJRJDlrmt/wH4lubKz67jvDjOwTjpDGqCcXoV8MX9i5qNC'
            
          try {
            const response = await fetch(url)
            const spellsData = await response.json()
            return spellsData
          } catch(error) {
            console.log(error.message)
          }
        }

    