const getAmountMessage = (amount: number) => {
 if (amount > 80) return 'maybe too much?'
 if (amount > 50) return 'a lot'
 if (amount > 25) return 'quite a bit'
 if (amount >= 0) return 'a lil'
}

export default getAmountMessage