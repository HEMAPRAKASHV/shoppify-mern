const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "INR", style:"currency"
})

export function formatCurrency(number: number){
    return CURRENCY_FORMATTER.format(number)
}