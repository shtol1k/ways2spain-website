import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Send, Instagram, Facebook, Twitter, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Media, Page } from "@/payload-types";

// Helper to get icon component based on platform name
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'facebook': return <Facebook className="w-5 h-5" />;
    case 'instagram': return <Instagram className="w-5 h-5" />;
    case 'twitter': return <Twitter className="w-5 h-5" />;
    case 'linkedin': return <Linkedin className="w-5 h-5" />;
    case 'youtube': return <Youtube className="w-5 h-5" />;
    case 'telegram': return <Send className="w-5 h-5" />;
    case 'tiktok': return <span className="font-bold text-xs">TK</span>; // Custom simple fallback or import specialized icon
    default: return <ExternalLink className="w-5 h-5" />;
  }
};

const PayloadFooter = async () => {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch footer data
  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 1, // Only need 1 level deep to get media URL
  });

  const { enabled, logo, navItems, socialLinks, copyright } = footerData;

  if (!enabled) {
    return null;
  }

  const logoUrl = (logo as Media)?.url;
  const logoAlt = (logo as Media)?.alt || "Ways 2 Spain Logo";

  return (
    <footer className="bg-slate-900 text-slate-100 py-16 border-t-4 border-accent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              {logoUrl ? (
                <Image 
                  src={logoUrl} 
                  alt={logoAlt} 
                  width={140}
                  height={56}
                  className="h-14 w-auto drop-shadow-lg"
                />
              ) : (
                <span className="text-2xl font-bold">Ways 2 Spain</span>
              )}
            </div>
            
            <div className="mb-8">
               <h5 className="text-slate-400 font-semibold mb-3 uppercase text-sm tracking-wider">Socials</h5>
               <div className="flex flex-wrap gap-4">
                 {socialLinks?.map((social, index) => (
                   <a
                     key={index}
                     href={social.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-slate-800 p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                     title={social.platform}
                   >
                     {getSocialIcon(social.platform)}
                   </a>
                 ))}
               </div>
            </div>

            {/* Static Contact Info - could also be moved to CMS later */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <a href="mailto:ways2spain@gmail.com" className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>ways2spain@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Валенсія, Іспанія</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Navigation from CMS */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-6 text-xl text-white border-b border-slate-700 pb-2 inline-block">Навігація (CMS)</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {navItems?.map((item, index) => {
                // Determine the correct link path
                let href = "#";
                if (item.link && typeof item.link !== 'string') {
                   // Internal Page Link
                   const pageSlug = (item.link as Page).slug;
                   href = pageSlug === 'home' ? '/' : `/${pageSlug}`;
                } else if (item.externalLink) {
                   // Fallback to external link if provided
                   href = item.externalLink;
                }

                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className="text-slate-300 hover:text-accent hover:translate-x-1 inline-block transition-transform duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>{copyright || `© ${new Date().getFullYear()} Ways 2 Spain. (CMS Preview)`}</p>
          <p className="text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700">Payload Footer Preview</p>
        </div>
      </div>
    </footer>
  );
};

export default PayloadFooter;
