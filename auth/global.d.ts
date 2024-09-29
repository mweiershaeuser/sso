import de from "./messages/de.json";
import en from "./messages/en.json";

type Messages = typeof de & typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
