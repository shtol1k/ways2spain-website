import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import { Media } from "@/payload-types";
import { Icon } from "@/components/ui/icons";
import { IconName } from "@/components/ui/icons/types";

const CURRENT_YEAR = new Date().getFullYear();

// Map CMS platform values to icon registry names
const socialIconMap: Record<string, IconName | undefined> = {
  telegram: "telegram",
  instagram: "instagram",
  facebook: "facebook",
  xTwitter: "xTwitter",
  twitter: "xTwitter", // legacy fallback
  linkedin: "linkedin",
};

// Left-to-right underline animation — white underline on dark footer background
const footerLinkClass = [
  "relative inline-block pb-1",
  "color-content-secondary-inverse hover:color-content-primary-inverse",
  "text-base leading-6",
  "after:content-[''] after:absolute after:bottom-0 after:left-0",
  "after:w-full after:h-0.5 after:bg-white",
  "after:origin-left after:transition-transform after:duration-300",
  "after:scale-x-0 hover:after:scale-x-100",
  "transition-colors duration-300",
].join(" ");

type NavItem = { label: string; link?: unknown; externalLink?: string | null };
type ServiceLink = { label: string; link?: unknown; externalLink?: string | null; url?: string | null };

function resolveHref(item: { link?: unknown; externalLink?: string | null; url?: string | null }) {
  const page =
    item.link && typeof item.link !== "string"
      ? (item.link as { slug?: string })
      : null;
  if (page) return page.slug === "home" ? "/" : `/${page.slug}`;
  return item.externalLink || item.url || "#";
}

function renderServiceLink(
  item: ServiceLink,
  index: number,
  className: string,
) {
  const href = resolveHref(item);
  const isInternal = !!(item.link && typeof item.link !== "string");
  return isInternal ? (
    <Link key={index} href={href} className={className}>
      {item.label}
    </Link>
  ) : (
    <a key={index} href={href} className={className}>
      {item.label}
    </a>
  );
}

function renderNavItem(item: NavItem, index: number, user: unknown) {
  const page =
    item.link && typeof item.link !== "string"
      ? (item.link as { slug?: string; published?: boolean })
      : null;

  if (page && !user && page.published === false) return null;

  const href = page
    ? page.slug === "home"
      ? "/"
      : `/${page.slug}`
    : item.externalLink || "#";

  return (
    <li key={index} className="pb-1">
      {!page ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>
          {item.label}
        </a>
      ) : (
        <Link href={href} className={footerLinkClass}>
          {item.label}
        </Link>
      )}
    </li>
  );
}

const Footer = async () => {
  const payload = await getPayload({ config: configPromise });
  const headersList = await headers();
  const { user } = await payload.auth({ headers: headersList });

  const footerData = await payload.findGlobal({ slug: "footer", depth: 1 });

  const { navItems, socialLinks, copyright } = footerData;
  const logoLarge = (footerData as any).logoLarge as Media | null;
  const logoMedium = (footerData as any).logoMedium as Media | null;
  const slogan = (footerData as any).slogan as string | null;
  const resourceItems = (footerData as any).resourceItems as NavItem[] | null;
  const serviceLinks = (footerData as any).serviceLinks as ServiceLink[] | null;

  const logoLargeUrl = logoLarge?.url;
  const logoMediumUrl = logoMedium?.url;
  const logoAlt = logoLarge?.alt || logoMedium?.alt || "Ways 2 Spain";
  const copyrightText = copyright || `© ${CURRENT_YEAR} Ways 2 Spain. Всі права захищені.`;

  // Social icons row (reused across breakpoints)
  const socialRow = (
    <div className="flex gap-4 items-start">
      {socialLinks?.map((social, index) => {
        const iconName = socialIconMap[social.platform];
        if (!iconName) return null;
        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.platform}
            className="color-content-secondary-inverse hover:color-content-primary-inverse transition-colors duration-300"
          >
            <Icon name={iconName} size="xl" />
          </a>
        );
      })}
    </div>
  );

  const subtitle = slogan ? (
    <span className="text-body-base color-content-secondary-inverse block 2xl:max-w-[460px]">{slogan}</span>
  ) : null;

  return (
    <footer className="bg-fill-primary-inverse py-16">
      <div className="mx-auto w-full px-4 md:max-w-[768px] lg:px-8 lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">

        {/* ── Desktop (lg+): 3-column layout ── */}
        <div className="hidden lg:flex gap-12 xl:gap-10 items-start mb-10">

          {/* Brand column: flex-1 */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Logo large — LG+ (240×48) */}
            {logoLargeUrl ? (
              <Image src={logoLargeUrl} alt={logoAlt} width={240} height={48} className="h-12 w-auto self-start" />
            ) : (
              <div className="bg-slate-700 h-12 w-[240px] rounded-sm" />
            )}
            {subtitle}
            {socialRow}
          </div>

          {/* Navigation column: 200px on lg, 320px on xl+ */}
          <div className="flex flex-col gap-4 shrink-0 lg:w-[200px] xl:w-[320px]">
            <h4 className="color-content-primary-inverse text-xl font-bold tracking-tight leading-[1.4]">
              Навігація
            </h4>
            <ul className="flex flex-col gap-1">
              {(navItems as NavItem[])?.map((item, i) => renderNavItem(item, i, user))}
            </ul>
          </div>

          {/* Resources column: 200px on lg, 320px on xl+ */}
          <div className="flex flex-col gap-4 shrink-0 lg:w-[200px] xl:w-[320px]">
            <h4 className="color-content-primary-inverse text-xl font-bold tracking-tight leading-[1.4]">
              Ресурси
            </h4>
            <ul className="flex flex-col gap-2">
              {resourceItems?.map((item, i) => renderNavItem(item, i, null))}
            </ul>
          </div>
        </div>

        {/* Desktop bottom bar */}
        <div className="hidden lg:flex items-center justify-between border-t border-white/10 pt-10 text-sm">
          <span className="text-body-small color-content-tertiary-inverse">{copyrightText}</span>
          <div className="flex gap-6 items-center color-content-secondary-inverse">
            {serviceLinks?.map((link, index) =>
              renderServiceLink(link, index, "leading-5 whitespace-nowrap color-content-secondary-inverse hover:underline hover:color-content-primary-inverse transition-colors duration-300")
            )}
          </div>
        </div>

        {/* ── Tablet (md–lg): logo+desc | socials row, then 2-col nav/resources ── */}
        <div className="hidden md:flex lg:hidden flex-col gap-10">

          {/* Top row: logo+description (flex-1) | social icons */}
          <div className="flex items-start gap-4">
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {/* Logo medium — MD (170×40) */}
              {logoMediumUrl ? (
                <Image src={logoMediumUrl} alt={logoAlt} width={170} height={40} className="h-10 w-auto self-start" />
              ) : (
                <div className="bg-slate-700 h-10 w-[170px] rounded-sm" />
              )}
              {subtitle}
            </div>
            {socialRow}
          </div>

          <hr className="border-t border-white/10" />

          {/* 2 columns: nav | resources */}
          <div className="flex gap-10 items-start">
            <div className="flex-1 flex flex-col gap-4">
              <h4 className="color-content-primary-inverse text-xl font-bold tracking-tight leading-[1.4]">
                Навігація
              </h4>
              <ul className="flex flex-col gap-1">
                {(navItems as NavItem[])?.map((item, i) => renderNavItem(item, i, user))}
              </ul>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <h4 className="color-content-primary-inverse text-xl font-bold tracking-tight leading-[1.4]">
                Ресурси
              </h4>
              <ul className="flex flex-col gap-2">
                {resourceItems?.map((item, i) => renderNavItem(item, i, null))}
              </ul>
            </div>
          </div>

          <hr className="border-t border-white/10" />

          {/* Service links then copyright (stacked at tablet) */}
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-6 items-center color-content-secondary-inverse">
              {serviceLinks?.map((link, index) =>
                renderServiceLink(link, index, "leading-5 color-content-secondary-inverse hover:underline hover:color-content-primary-inverse transition-colors duration-300")
              )}
            </div>
            <span className="text-body-small color-content-tertiary-inverse">{copyrightText}</span>
          </div>
        </div>

        {/* ── Mobile (<md): single column ── */}
        <div className="flex md:hidden flex-col gap-8">

          {/* Brand block */}
          <div className="flex flex-col gap-4">
            {/* Logo medium — SM (170×40) */}
            {logoMediumUrl ? (
              <Image src={logoMediumUrl} alt={logoAlt} width={170} height={40} className="h-10 w-auto self-start" />
            ) : (
              <div className="bg-slate-700 h-10 w-[170px] rounded-sm" />
            )}
            {subtitle}
            {socialRow}
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="color-content-primary-inverse text-xl font-bold tracking-tight leading-[1.4]">
              Навігація
            </h4>
            <ul className="flex flex-col gap-1">
              {(navItems as NavItem[])?.map((item, i) => renderNavItem(item, i, user))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="color-content-primary-inverse text-xl font-bold tracking-tight leading-[1.4]">
              Ресурси
            </h4>
            <ul className="flex flex-col gap-2">
              {resourceItems?.map((item, i) => renderNavItem(item, i, null))}
            </ul>
          </div>

          <hr className="border-t border-white/10" />

          {/* Service links + copyright */}
          <div className="flex flex-col gap-6 text-sm">
            <div className="flex flex-col gap-6 color-content-secondary-inverse">
              {serviceLinks?.map((link, index) =>
                renderServiceLink(link, index, "leading-5 color-content-secondary-inverse hover:underline hover:color-content-primary-inverse transition-colors duration-300")
              )}
            </div>
            <span className="text-body-small color-content-tertiary-inverse">{copyrightText}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
