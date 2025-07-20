import BackgroundImage from "@/components/cos/BackgroundImage";
import BottomBar from "@/components/cos-bottombar/BottomBar";
import ContextMenuOs from "@/components/cos/ContextMenuOs";
import FullscreenToggle from "@/components/cos/FullscreenToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundImage />
      <div className="absolute top-0 left-0 w-full h-screen">
        <div className="w-full h-full bg-gradient-to-r from-black/35 via-black/20 to-black/10"></div>
      </div>
      <div className="relative">{children}</div>
      <ContextMenuOs />
      <FullscreenToggle />
      <BottomBar />
    </>
  );
}
