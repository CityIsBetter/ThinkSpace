import { Toaster } from "@/components/ui/sonner";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <ConvexClientProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </ConvexClientProvider>
    </Suspense>
  );
}
