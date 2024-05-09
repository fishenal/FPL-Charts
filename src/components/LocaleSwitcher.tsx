import Link from "next/link";
import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  );
  const locMap: { [key: string]: string } = {
    en: "gb",
    zh: "cn",
    fr: "fr",
  };

  return (
    <div>
      <ul className="flex gap-2">
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router;
          return (
            <li key={locale}>
              <Link
                href={{ pathname, query }}
                as={asPath}
                locale={locale}
                legacyBehavior
              >
                <div
                  className={`fi fis fi-${locMap[locale] || ""} cursor-pointer`}
                ></div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
