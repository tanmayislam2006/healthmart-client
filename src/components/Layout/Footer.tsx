import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/health-mart.png"
                alt="Health Mart Logo"
                width={40}
                height={40}
                priority
              />
              <span className="text-xl font-bold tracking-tight">
                Health Mart
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Your trusted online pharmacy delivering quality medicines and
              healthcare products right to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "All Medicines", href: "/medicines" },
                { label: "Categories", href: "/categories" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Track Order", href: "/orders" },
                { label: "FAQs", href: "/faq" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@healthmart.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  123 Health Street
                  <br />
                  Medical District, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Health Mart. All rights reserved.
          </p>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/terms">Terms</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
