import { generateTailWindStrings } from "../../lib/utils"

const styles = {
    articleContainer: [
        'bg-stone-200',
        'prose',
        'max-w-full',
        'mx-auto',
        'px-6',
    ]
}

export default generateTailWindStrings(styles);