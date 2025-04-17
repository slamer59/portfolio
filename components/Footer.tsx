import Link from "next/link";
import Layout from "./Layout";

const Footer = () => {
  return (
    <footer
      className="relative w-full text-lg font-medium border-t-2 border-solid bg-light border-dark dark:text-light dark:border-light sm:text-base"
    >
      <Layout className="flex items-center justify-between py-8 lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; Tous droits réservés.</span>

        <div className="flex items-center lg:py-2">
          Fait avec <span className="px-1 text-2xl text-primary dark:text-primaryDark">😎	</span> par &nbsp;
          <Link
            href="https://www.instagram.com/teepeetlse"
            target="_blank"
            className="underline underline-offset-2"
          >
            Teepeetlse
          </Link>
        </div>
        <div className="flex items-center lg:py-2">

          <Link
            href="https://www.linkedin.com/in/thomaspedot/"
            target="_blank"
            className="underline underline-offset-2"
          >
            Hey !
          </Link>
          👋
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;
