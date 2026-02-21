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
type ServiceLink = { label: string; url: string };

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

  const { logo, navItems, socialLinks, copyright } = footerData;
  const resourceItems = (footerData as any).resourceItems as NavItem[] | null;
  const serviceLinks = (footerData as any).serviceLinks as ServiceLink[] | null;

  const logoUrl = (logo as Media)?.url;
  const logoAlt = (logo as Media)?.alt || "Ways 2 Spain";
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

  const subtitle = (
    <p className="color-content-secondary-inverse text-base leading-6">
      Допомагаємо віддаленим спеціалістам з родинами жити і працювати в Іспанії з Digital Nomad Visa.
    </p>
  );

  return (
    <footer className="bg-fill-primary-inverse py-16">
      <div className="mx-auto w-full px-4 lg:px-8 lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">

        {/* ── Desktop (lg+): 3-column layout ── */}
        <div className="hidden lg:flex gap-12 xl:gap-10 items-start mb-10">

          {/* Brand column: flex-1 */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Logo */}
            {logoUrl ? (
              <Image src={logoUrl} alt={logoAlt} width={200} height={48} className="h-12 w-auto" />
            ) : (
              <div className="bg-slate-700 h-12 w-[200px] rounded-sm" />
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
          <p className="color-content-tertiary-inverse leading-5">{copyrightText}</p>
          <div className="flex gap-6 items-center color-content-secondary-inverse">
            {serviceLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="leading-5 whitespace-nowrap hover:color-content-primary-inverse transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Tablet (md–lg): logo+desc | socials row, then 2-col nav/resources ── */}
        <div className="hidden md:flex lg:hidden flex-col gap-10">

          {/* Top row: logo+description (flex-1) | social icons */}
          <div className="flex items-start gap-4">
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {logoUrl ? (
                <Image src={logoUrl} alt={logoAlt} width={176} height={40} className="h-10 w-auto" />
              ) : (
                <div className="bg-slate-700 h-10 w-[176px] rounded-sm" />
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
            <div className="flex flex-wrap gap-6 color-content-secondary-inverse">
              {serviceLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="leading-5 hover:color-content-primary-inverse transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="color-content-tertiary-inverse leading-5">{copyrightText}</p>
          </div>
        </div>

        {/* ── Mobile (<md): single column ── */}
        <div className="flex md:hidden flex-col gap-8">

          {/* Brand block */}
          <div className="flex flex-col gap-4">
            {logoUrl ? (
              <Image src={logoUrl} alt={logoAlt} width={176} height={40} className="h-10 w-auto" />
            ) : (
              <div className="bg-slate-700 h-10 w-[176px] rounded-sm" />
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
              {serviceLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="leading-5 hover:color-content-primary-inverse transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="color-content-tertiary-inverse leading-5">{copyrightText}</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
