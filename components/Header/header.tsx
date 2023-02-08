import Link from "next/link";
import headerStyles from "./header.styles";
import { AiFillFileText } from 'react-icons/ai';

const Header = () => (
    <header className={headerStyles.container}>
      <Link className={headerStyles.link} href={'/'}>
        <AiFillFileText />
        <h3>Tech Notes</h3>
      </Link>
      <a href={`https://wepadev.com`} target="_blank" className={headerStyles.link} rel="noreferrer">
        <h3>WepaDev</h3>
      </a>
    </header>
);
export default Header;