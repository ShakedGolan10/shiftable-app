export const getDataFromQueryParams = (queryParams: URLSearchParams) => {
    const objectParams = Object.fromEntries(queryParams)
    const convertedParams = {}
    for (const key in objectParams) {
        const element = objectParams[key]
        if (element === 'true' || element === 'false') {
            if (element === 'true') convertedParams[key] = true
            else convertedParams[key] = false
        }
        else if (Number(element)) convertedParams[key] = Number(element)
            else convertedParams[key] = element
    }
    return convertedParams
}