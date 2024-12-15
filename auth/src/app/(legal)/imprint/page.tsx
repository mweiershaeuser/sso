import Alert from "@/components/common/alert";
import { Locale } from "@/i18n/models/locale";
import { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.Imprint.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Imprint() {
  const locale = useLocale();
  const t = useTranslations("legal.Imprint");

  return (
    <div className="p-4">
      <h1>{t("h1")}</h1>
      <p>
        Melvin Weiershäuser
        <br />
        <a href="mailto:hello@melvinweiershaeuser.de">
          hello@melvinweiershaeuser.de
        </a>
      </p>
      {(locale as Locale) !== "de" && (
        <Alert type="info">
          <span>{t("langInfoMessage")}</span>
        </Alert>
      )}
      <div lang="de">
        <h2>Disclaimer - rechtliche Hinweise</h2>
        <h3>Auskunfts- und Widerrufsrecht</h3>
        <p>
          Sie haben jederzeit das Recht, sich unentgeltlich und unverzüglich
          über die zu Ihrer Person erhobenen Daten zu erkundigen. Ebenfalls
          können Sie Ihre Zustimmung zur Verwendung Ihrer angegebenen
          persönlichen Daten mit Wirkung für die Zukunft widerrufen. Hierfür
          wenden Sie sich bitte an den im Impressum angegebenen Diensteanbieter.
        </p>
        <h3>Disclaimer (Haftungsausschluss)</h3>
        <h4>1. Haftung für Inhalte</h4>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
          hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
          Inhalte umgehend entfernen.
        </p>
        <h4>2. Haftung für Links</h4>
        <p>
          Diese Website enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte kein Einfluss genommen werden kann. Deshalb kann für diese
          fremden Inhalte auch keine Gewähr übernommen werden. Für die Inhalte
          der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
          der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
          der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend
          von dieser Website auf die rechtsverletzende Site entfernen.
        </p>
        <h4>3. Urheberrecht</h4>
        <p>
          Die durch die Diensteanbieter, deren Mitarbeiter und beauftragte
          Dritte erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
          bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Autors
          bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
          privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte
          auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter
          als solche gekennzeichnet. Sollten Sie trotzdem auf eine
          Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden derartige Inhalte umgehend entfernen.
        </p>
        <p>
          Dieses Impressum wurde mit Hilfe des{" "}
          <a
            className="link link-primary"
            target="_blank"
            href="https://www.hensche.de/impressum-generator.html"
          >
            Impressum-Generators
          </a>{" "}
          von{" "}
          <a
            className="link link-primary"
            target="_blank"
            href="https://www.hensche.de/Rechtsanwalt_Arbeitsrecht_Koeln.html"
          >
            HENSCHE Rechtsanwälte, Kanzlei für Arbeitsrecht
          </a>{" "}
          erstellt.
        </p>
      </div>
    </div>
  );
}
