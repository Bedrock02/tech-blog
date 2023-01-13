import { generateTailWindStrings } from '../../lib/utils';

const styles = {
    container: [
        'bg-stone-200',
        'border-2',
        'content-center',
        'drop-shadow-lg',
        'flex',
        'flex-col',
        'h-50',
        'lg:w-1/3',
        'md:full',
        'md:h-30',
        'mx-1',
        'my-4',
        'px-10',
        'py-5',
        'rounded-md',
    ],
    title: [
        'font-semibold',
        'mt-4',
        'py-3',
        'text-3xl',
    ],
    date: [
        'text-gray-600',
        'text-sm'
    ],
    metaData: [
        'border-black',
        'border-t-2',
        'py-3'
    ],
    readMore: [
        'flex',
        'flex-row',
        'items-center',
        'gap-1',
    ]
}

export default generateTailWindStrings(styles);