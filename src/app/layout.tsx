import ClientNavbarWrapper from "@/components/ClientNavbarWrapper";

export const metadata = {
  title: "FursatKeAlfaz",
  description: "Poetry Sharing Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientNavbarWrapper>
        
            {children}
          
        </ClientNavbarWrapper>
      </body>
    </html>
  );
}
