import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Send, Instagram, Facebook, Twitter, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { headers } from "next/headers";
import { Media, Page } from "@/payload-types";

// Helper to get icon component based on platform name
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return <Facebook className="w-4 h-4" />;
    case 'instagram': return <Instagram className="w-4 h-4" />;
    case 'twitter': return <Twitter className="w-4 h-4" />;
    case 'linkedin': return <Linkedin className="w-4 h-4" />;
    case 'youtube': return <Youtube className="w-4 h-4" />;
    case 'telegram': return <Send className="w-4 h-4" />;
    case 'tiktok': return <span className="font-bold text-xs">TK</span>;
    default: return <ExternalLink className="w-4 h-4" />;
  }
};

const CURRENT_YEAR = new Date().getFullYear();

const Footer = async () => {
  const payload = await getPayload({ config: configPromise });
  const headersList = await headers();
  const { user } = await payload.auth({ headers: headersList });
  
  // Fetch footer data
  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  });

  const { logo, navItems, socialLinks, copyright } = footerData;

  const logoUrl = (logo as Media)?.url;
  const logoAlt = (logo as Media)?.alt || "Ways 2 Spain Logo";

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {logoUrl ? (
                <Image 
                  src={logoUrl} 
                  alt={logoAlt} 
                  width={120}
                  height={48}
                  className="h-12 w-auto"
                />
              ) : (
                <div className="flex items-center space-x-2">
                      <Image 
                        src="/logo.png" 
                        alt="Ways 2 Spain Logo" 
                        width={120}
                        height={48}
                        className="h-12 w-auto"
                      />
                </div>
              )}
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Допомагаємо віддаленим спеціалістам з родинами жити і працювати в Іспанії з Digital Nomad Visa.
            </p>
            
              {/* Socials & Contact */}
              <div className="space-y-4">
                  <div className="flex gap-4">
                    {socialLinks?.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary-foreground/10 p-2 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                          title={social.platform}
                        >
                          {getSocialIcon(social.platform)}
                        </a>
                      ))}
                  </div>

                <div className="space-y-2 pt-2">
                    <a href="mailto:ways2spain@gmail.com" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-secondary transition-smooth">
                    <Mail className="w-4 h-4" />
                    <span>ways2spain@gmail.com</span>
                    </a>
                    <div className="flex items-center space-x-2 text-primary-foreground/80">
                    <MapPin className="w-4 h-4" />
                    <span>Валенсія, Іспанія</span>
                    </div>
                </div>
              </div>
          </div>

          {/* Dynamic Navigation */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold mb-4 text-lg">Навігація</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems?.map((item, index) => {
                if (item.link && typeof item.link !== 'string') {
                    const page = item.link as any; // Using any for published check
                    
                    // Filter unpublished pages for non-auth users
                    if (!user && page.published === false) {
                        return null;
                    }

                    const href = page.slug === 'home' ? '/' : `/${page.slug}`;
                    return (
                        <li key={index}>
                        <Link
                            href={href}
                            className="text-primary-foreground/80 hover:text-secondary transition-smooth"
                        >
                            {item.label}
                        </Link>
                        </li>
                    )
                } else if (item.externalLink) {
                    return (
                        <li key={index}>
                            <a
                                href={item.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-foreground/80 hover:text-secondary transition-smooth"
                            >
                                {item.label}
                            </a>
                        </li>
                    )
                }
                return null;
              })}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm">
          <p>{copyright || `© ${CURRENT_YEAR} Ways 2 Spain. Всі права захищені.`}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
