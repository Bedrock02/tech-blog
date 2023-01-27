import { generateTailWindStrings } from "lib/utils";
const styles = {
    container: [
        'align-middle',
        'bg-neutral-800',
        'flex',
        'flex-col',
        'h-16',
        'justify-around',
        'text-stone-300',
        'items-center',
        'py-15'
    ],
};

export default generateTailWindStrings(styles);