import { getSiteSettings } from '@/lib/cosmic'
import Link from 'next/link'
import './Footer.css'

export default async function Footer() {
  const siteSettings = await getSiteSettings()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link href="/" className="footer__logo gradient-text">
              CodeX
            </Link>
            <p className="footer__about">
              {siteSettings.metadata.footer_company_about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer__heading">Navigation</h3>
            <ul className="footer__links">
              {[
                { href: '/services', label: 'Services' },
                { href: '/projects', label: 'Projects' },
                { href: '/design', label: 'Design' },
                { href: '/case-studies', label: 'Case Studies' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__links">
              <li>
                <a href={`mailto:${siteSettings.metadata.contact_email}`} className="footer__link">
                  {siteSettings.metadata.contact_email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {siteSettings.metadata.footer_copyright_text}
          </p>
          <p className="footer__slogan">
            {siteSettings.metadata.company_slogan}
          </p>
        </div>
      </div>
    </footer>
  )
}
