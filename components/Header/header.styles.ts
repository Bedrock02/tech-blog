import { generateTailWindStrings } from "../../lib/utils";
const styles = {
    container: [
        'align-middle',
        'bg-violet-900',
        'flex',
        'flex-row',
        'h-16',
        'justify-around',
        'text-stone-300',
    ],
    link: [ 'my-auto', 'font-mono', 'text-2xl', ],
}

export default generateTailWindStrings(styles);