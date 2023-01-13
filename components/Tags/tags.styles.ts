import { generateTailWindStrings } from "../../lib/utils";

const styles = {
    tagContainer: [
        'flex',
        'flex-row',
        'items-stretch',
        'justify-start',
        'list-none',
        'mt-4',
        'gap-1'
    ],
    tag: [
        'bg-slate-500',
        'px-3',
        'rounded-lg',
        'text-slate-50',
    ]
};

export default generateTailWindStrings(styles);