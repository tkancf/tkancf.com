import { FC } from "hono/jsx";
import { globalCSS } from "../lib/style";
import { Head } from "./Head";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout: FC = (props) => {
  return (
    <html class={globalCSS}>
      <Head metadata={props.metadata} />
      <Header {...props} />
      <main>{props.children}</main>
      <Footer />
    </html>
  );
};
