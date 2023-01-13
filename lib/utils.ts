type tailWindCollections = {[key: string]: string[]}
type tailWindStrings = {[key: string]: string}

export const generateTailWindStrings = (styles: tailWindCollections): tailWindStrings => {
    return Object.entries(styles).reduce( (map: tailWindStrings, entry) => {
        const [key, value] = entry;
        map[key] = value.join(' ')
        return map
    }, {})
};

