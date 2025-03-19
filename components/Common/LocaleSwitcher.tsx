import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { SupportedLocale } from "@/config/locales";

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as SupportedLocale;

  return (
    <div className={className}>
      <LocaleSwitcherSelect defaultValue={locale} />
    </div>
  );
}
