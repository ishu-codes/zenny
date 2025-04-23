import { GithubIcon, LinkedInIcon, XIcon } from "@/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full flex items-center justify-between px-8 pb-4">
      <p className="text-muted-foreground text-sm">
        &copy; Copyright Ishu | All Rights Reserved
      </p>
      <div className="flex gap-8 scale-60">
        {[
          {
            title: "GitHub",
            icon: <GithubIcon />,
            url: "https://github.com/ishu-codes/zenny",
          },
          {
            title: "LinkedIn",
            icon: <LinkedInIcon />,
            url: "https://linkedin.com/in/ishu-codes/",
          },
          { title: "X", icon: <XIcon />, url: "https://x.com/ishu_codes/" },
        ].map((link) => (
          <Link
            className="h-full"
            href={link.url}
            target="_blank"
            key={link.title}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
