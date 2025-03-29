// app/[slug]/page.tsx
'use server'

import Image from "next/image";
import axios from "axios";
import * as cheerio from 'cheerio';
import { Key } from "react";
import GradientButton from "@/app/components/GradientButton";

async function getNthTagWithHtml(url: string, n = 1, tag = 'p') {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const paragraph = $(tag).eq(Number(n));

  return paragraph.text().trim()
}

async function findElementsByClass(url: string, className: string, tagName = '*') {
  try {
    // Fetch the HTML content
    const response = await axios.get(url);

    // Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // Select elements with the specified class
    const selector = `${tagName}[class*="${className}"]`;
    const elements = $(selector);

    // Process and return results
    return elements.map((index, element) => {
      const $element = $(element);
      if (!('tagName' in element)) {
        return null; // or handle text nodes differently
      }
      return {
        tagName: element.tagName.toLowerCase(),
        text: $element.text().trim(),
        html: $element.html(),
        class: $element.attr('class'),
        attributes: element.attribs,
        index: index
      };
    }).get(); // Convert Cheerio object to array

  } catch (error) {
    // @ts-ignore
    console.error('Error:', error.message);
    // @ts-ignore
    throw new Error(`Failed to fetch elements: ${error.message}`);
  }
}

type Params = Promise<{ slug: string[] }>;

export default async function Page({ params }: { params: Params }) {
  // Remove the async keyword since we're not using await here
  const {slug} = await params;
  const decodedSlug = decodeURIComponent(slug);
  const link = `https://ganjoor.net/${decodedSlug}`
  const getBooks = await findElementsByClass(link, 'part-title-block', 'div')
  const books = JSON.parse(JSON.stringify(getBooks));

  return (
    <div
      className="bg-slate-900 flex justify-center min-h-screen p-5 py-20 mt16 font-[family-name:var(--font-vazirmatn)] font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center flex-col max-w-[752px] bg-slate-800 rounded-xl px-4 py-2 mb-12">
        <Image
          src={`https://api.ganjoor.net/api/ganjoor/poet/image/${decodedSlug}.gif`}
          alt={decodedSlug}
          width={40}
          height={40}
          className="w-[82px] h-[100px] rounded-[50%] object-cover border-[2px] border-gray-400 mb-2"
        />
        <h1 className={'font-bold text-slate-300'}>{await getNthTagWithHtml(link, 1, 'h2')}</h1>
        <p dir="rtl" className={'text-[#b6bbc1] mt-5'}>{await getNthTagWithHtml(link)}</p>
        <div className={'flex items-center flex-col mt-5'}>
          {books.map((book: any, i: Key | null | undefined) => (
            <div key={i}>
              <GradientButton className={'min-w-[150px] mb-2'}>{book.text}</GradientButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}