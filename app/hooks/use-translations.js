"use client";
import { useLocale } from "@/app/context/locale-context";

/**
 * useTranslations(namespace?)
 * Returns a t(key) function scoped to an optional namespace.
 *
 * Usage:
 *   const t = useTranslations();          // t("nav.about")
 *   const t = useTranslations("nav");     // t("about")
 */
export function useTranslations(namespace = "") {
  const { t } = useLocale();
  if (!namespace) return t;
  return (key) => t(`${namespace}.${key}`);
}
