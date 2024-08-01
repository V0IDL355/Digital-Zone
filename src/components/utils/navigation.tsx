import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Gamepad2, Home, Lock, Menu, Users } from "lucide-react";
import React from "react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const links = [
  {
    name: "CS.RIN.RU",
    href: "https://cs.rin.ru/forum/",
    icon: <Check className="mr-2 h-4 w-4" />,
  },
  { name: "DMCA", href: "dmca", icon: <Lock className="mr-2 h-4 w-4" /> },
  {
    name: "Discord",
    href: "https://discord.gg/F7juJ4RryJ",
    icon: <SiDiscord className="mr-2 h-4 w-4" />,
  },
  { name: "Home", href: "/", icon: <Home className="mr-2 h-4 w-4" /> },
  {
    name: "Games",
    href: "games",
    icon: <Gamepad2 className="mr-2 h-4 w-4" />,
  },
  {
    name: "Collabs",
    href: "collabs",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
];

function NormalNav() {
  return (
    <div>
      {links.map((link) => (
        <Link key={link.name} href={link.href} passHref>
          <Button variant="outline" style={{ margin: 5 }}>
            {link.icon} {link.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}

function SmallNav() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">
            <Menu className="mr-2 h-4 w-4" /> Navigation
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle style={{ textAlign: "center" }}>
              Navigation
            </DrawerTitle>
            <DrawerDescription
              style={{
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {NormalNav()}
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default function navigation() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean>(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    setIsSmallScreen(window.innerWidth < 925);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 925);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isSmallScreen ? SmallNav() : NormalNav();
}
