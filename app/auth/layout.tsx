import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iShop",
  description: "welcome to our iShop website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-2 min-h-screen  ">
      <div className="bg-greenAccent-900"></div>
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
}
