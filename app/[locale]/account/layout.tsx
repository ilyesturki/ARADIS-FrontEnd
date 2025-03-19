import AccountHeader from "@/components/Account/AccountHeader";
import Header from "@/components/Header/Header";
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
    <div className="flex flex-col gap-3 bg-grayscale-200 pb-3">
      <Header />

      <div className="container">
        <div className="container flex flex-col gap-5 rounded-xl bg-grayscale-100 py-6 px-3 md:px-7 shadow-[0_0_2px] shadow-grayscale-400">
          <AccountHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
