'use cache'
import Image from "next/image";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import FetchPoet from "@/app/components/FetchData";

export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-slate-900 items-center justify-items-center justify-center min-h-screen p-5 py-20  font-[family-name:var(--font-vazirmatn)] font-[family-name:var(--font-geist-sans)]">

      <MaxWidthWrapper className="flex flex-col gap-8 row-start-2 items-center justify-center">
        <Image
             width={150}
            height={150}
            src="globe.svg"
            alt="Logo"
            className="rounded-lg shadow-lg object-cover mb-8"
            priority
        />
        <FetchPoet/>
      </MaxWidthWrapper>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
