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
    <div className="  min-h-[500px] relative ">
      <div className="container flex justify-center items-center py-10">
        <div className="w-fit">{children}</div>
      </div>
    </div>
  );
}
