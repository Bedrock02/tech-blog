import { generateTailWindStrings } from "lib/utils";

const styles = {
    tagContainer: [
        'flex',
        'flex-row',
        'flex-wrap',
        'items-stretch',
        'justify-start',
        'list-none',
        'mt-4',
        'gap-1'
    ],
    tag: [
        'border',
        'border-violet-300',
        'font-medium',
        'px-3',
        'py-0.5',
        'rounded-full',
        'text-violet-700',
        'text-xs',
        'tracking-wide',
    ]
};

export default generateTailWindStrings(styles);