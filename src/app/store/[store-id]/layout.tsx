export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="bg-[#101010] relative w-full md:w-767">{children}</div>
    </main>
  );
}
