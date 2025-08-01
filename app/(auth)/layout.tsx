export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bgPrimary w-full h-screen grid grid-cols-2 items-center justify-center">
      <div className="flex items-center justify-center col-span-1 h-full">
        {children}
      </div>
      <div className="flex items-center justify-center w-full h-full ">hi</div>
    </div>
  );
}
