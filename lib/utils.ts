type tailWindCollections = {[key: string]: string[]}
type tailWindStrings = {[key: string]: string}

export const generateTailWindStrings = (styles: tailWindCollections): tailWindStrings => {
    return Object.entries(styles).reduce( (map: tailWindStrings, entry) => {
        const [key, value] = entry;
        map[key] = value.join(' ');
        return map;
    }, {});
};

/**
 * Code taken from https://bvgsoftware.com/blog/read-time-feature-for-react-markdown-blog/
 * @param content 
 * @returns 
 */
export const readTime = (content: string) => {
    const WPS = 275 / 60;
  
    var images = 0;
    const regex = /\w/;
  
    let words = content.split(' ').filter((word: string) => {
      if (word.includes('<img')) {
        images += 1;
      }
      return regex.test(word);
    }).length;
  
    var imageAdjust = images * 4;
    var imageSecs = 0;
    var imageFactor = 12;
  
    while (images) {
      imageSecs += imageFactor;
      if (imageFactor > 3) {
        imageFactor -= 1;
      }
      images -= 1;
    }
  
    const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);
  
    return minutes;
};
