import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/#features' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Dev',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'GitHub', href: 'https://github.com/yourusername/boardscape' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername' },
  { icon: Twitter, href: 'https://twitter.com/yourusername' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="BoardScape Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="text-xl font-bold">BoardScape</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              Collaborate in real-time on infinite whiteboards. Create, share, and
              bring your ideas to life with our powerful collaborative tools.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:text-blue-600"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.icon.name}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>© {currentYear} BoardScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;