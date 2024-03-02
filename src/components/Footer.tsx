import { FC } from "hono/jsx";
import { css } from "hono/css";
import { siteName } from "../lib/constants";

export const Footer: FC = () => {
  return (
    <footer
      class={css`
        div {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          margin-bottom: 20px;
        }
      `}
    >
      <div>© 2024 {siteName}</div>
    </footer>
  );
};
