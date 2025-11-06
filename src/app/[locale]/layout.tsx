import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/app/[locale]/globals.css";
import "@/index.css";
import { Suspense } from "react";
import { Loading5756 } from "@/components/loading/loading";
import { AuthModalProvider } from "@/providers/AuthModalProvider";
import { AutoScrollToTop } from "@/components/scrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "@/providers/ToastProvider";

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <AuthModalProvider>
              <AutoScrollToTop />
              <Suspense fallback={<Loading5756 />}>
                <ToastProvider />
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="colored"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    borderRadius: "8px",
                    padding: "8px",
                    maxWidth: "90%",
                    margin: "0 auto",
                  }}
                />
                {children}
              </Suspense>
            </AuthModalProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}