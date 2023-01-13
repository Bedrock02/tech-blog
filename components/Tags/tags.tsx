import tagsStyles from './tags.styles';

interface Props {
    tags: string[]
}
const Tags = ({ tags }: Props) => (
    <ul className={tagsStyles.tagContainer}>
        {tags.map((tag: string) => (
            <li className={tagsStyles.tag} key={`li-${tag}`}>{tag}</li>
        ))}
    </ul>
)

export default Tags;