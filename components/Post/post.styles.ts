import { generateTailWindStrings } from "lib/utils";

const postStyles = generateTailWindStrings({
    articleContainer: [
        'bg-white',
        'max-w-3xl',
        'mx-auto',
        'px-6',
        'pb-24',
        'prose',
        'prose-headings:text-gray-900',
        'prose-headings:font-bold',
        'prose-p:text-gray-600',
        'prose-p:leading-relaxed',
        'prose-a:text-violet-700',
        'prose-a:no-underline',
        'hover:prose-a:underline',
    ],
    header: [
        'border-b',
        'border-gray-100',
        'flex',
        'flex-col',
        'items-center',
        'mb-10',
        'not-prose',
        'pb-10',
        'pt-16',
        'text-center',
    ],
    metaDesc: [
        'mt-3',
        'text-gray-400',
        'text-base',
        'w-4/5',
    ],
    metaData: [
        'flex',
        'flex-row',
        'gap-5',
        'items-center',
        'justify-center',
        'mt-5',
        'text-violet-700',
        'text-sm',
        'font-medium',
    ],
    metaDataItem: [
        'flex',
        'flex-row',
        'items-center',
        'gap-1',
    ],
    content: [
        'border-t',
        'border-gray-100',
        'pt-10',
    ]
});

export default postStyles;