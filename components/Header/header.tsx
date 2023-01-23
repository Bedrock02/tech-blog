import Link from "next/link";
import headerStyles from "./header.styles";
import { AiFillFileText } from 'react-icons/ai';

const Header = () => (
    <div className={headerStyles.container}>
        <Link className={headerStyles.link} href={'/'}>
          <AiFillFileText />
          <h1>Tech Notes</h1>
        </Link>
        <a href={`https://wepadev.com`} target="_blank" className={headerStyles.link} rel="noreferrer">
          <h1>WepaDev</h1>
        </a>
      </div>
);
export default Header;