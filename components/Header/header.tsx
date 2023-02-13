import Link from "next/link";
import headerStyles from "./header.styles";
import { AiFillFileText } from 'react-icons/ai';

const Header = () => (
    <header className={headerStyles.container}>
      <Link className={headerStyles.link} href={'/'}>
        <AiFillFileText />
        <h4>Tech Notes</h4>
      </Link>
      <a href={`https://wepadev.com`} target="_blank" className={headerStyles.link} rel="noreferrer">
        <h4>WepaDev</h4>
      </a>
    </header>
);
export default Header;