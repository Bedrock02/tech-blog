import { generateTailWindStrings } from "lib/utils";

const postStyles = generateTailWindStrings({
    articleContainer: [
        'bg-gray-100',
        'prose',
        'max-w-full',
        'mx-auto',
        'px-6',
    ],
    header: [
        'align-middle',
        'flex',
        'flex-col',
        'items-center',
        'justify-evenly',
        'py-10',
    ],
    metaDesc: [
        'w-3/5',
        'text-center',
        'text-base',
        'text-stone-500',
    ],
    metaData: [
        'flex',
        'flex-col',
        'items-center',
        'justify-around',
        'text-stone-500',
        'w-3/5',
        'text-violet-900',
    ],
    metaDataItem: [
        'flex',
        'flex-row',
        'items-center',
        'gap-1',
    ],
    content: [
        'border-t-2',
        'border-t-stone-500',
        'py-20',
    ]

});

export default postStyles;