'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {Earth, Search, X} from 'lucide-react';
import Link from 'next/link';

export default function FetchPoet() {
  const [originalPoetsByCentury, setOriginalPoetsByCentury] = useState<{ [key: string]: any[] }>({});
  const [filteredPoetsByCentury, setFilteredPoetsByCentury] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const divRefs = useRef<Array<HTMLDivElement | null>>(Array.from({ length: 13 }, () => null));
  const [searchInput, setSearchInput] = useState<string>('');

  // Function to scroll to a specific div
  const scrollToDiv = (index: number) => {
    const div = divRefs.current[index];
    if (div) {
      const divTop = div.getBoundingClientRect().top;
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const headerHeight = 70; // Adjust this value to match your header height
      const newScrollTop = currentScrollTop + divTop - headerHeight;

      window.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    }
  };

  // Fetch data from the JSON file
  useEffect(() => {
    fetch('./poetsByCentury.json')
      .then((response) => response.json())
      .then((data) => {
        setOriginalPoetsByCentury(data); // Store the original data
        setFilteredPoetsByCentury(data); // Initialize filtered data with the original data
      })
      .catch((error) => console.error('Error fetching poet data:', error))
      .finally(() => setLoading(false));
  }, []);

  // Handle search input change
  const handleInputChange = (event: string) => {
    const inputValue = event;
    setSearchInput(inputValue); // Update the search input state

    // Filter the poets based on the search input (only for centuries with index 2 and above)
    const filteredData: { [key: string]: any[] } = {};
    const centuries = Object.keys(originalPoetsByCentury);

    centuries.forEach((century, index) => {
      if (index >= 2) {
        // Apply filtering only to centuries with index 2 and above
        const filteredPoetsForCentury = originalPoetsByCentury[century].filter((poet) =>
          poet.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (filteredPoetsForCentury.length > 0) {
          filteredData[century] = filteredPoetsForCentury;
        }
      } else {
        // Preserve the original data for centuries with index 0 and 1
        filteredData[century] = originalPoetsByCentury[century];
      }
    });

    setFilteredPoetsByCentury(filteredData); // Update the filtered data state
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="max-w-[752px] bg-slate-800 rounded-xl px-4 py-2 mb-12">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        Object.entries(filteredPoetsByCentury).map(([century, poets], index) => (
          <div key={century} className={'flex items-center justify-center'}>
            {century === 'دسته‌بندی بر اساس قرن' ? (
                <div className="flex items-center justify-center flex-col bg-slate-700 mb-4 rounded-2xl">
                  <h2 className="text-2xl text-center font-semibold px-4 py-2 mt-2">
                    {century}
                  </h2>
                  <div className="flex flex-wrap gap-2 p-4 justify-center bg-slate-700">
                    {Array.from({length: 12}, (_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToDiv(i)}
                            className="bg-slate-800 text-white w-[40px] h-[40px] rounded-xl"
                        >
                          {i + 3}
                        </button>
                    ))}
                    <button
                        key={12}
                        onClick={() => scrollToDiv(12)}
                        className="bg-slate-800 text-white w-[40px] h-[40px] mr-1 rounded-xl flex items-center justify-center"
                    >
                      <Image
                          src="./globe.svg"
                          alt="globe"
                          width={20}
                          height={18}
                          className="filter brightness-0 invert h-auto"
                      />
                    </button>
                  </div>
                  <div className={'rounded-b-2xl w-full mb-8 bg-slate-700 flex items-center justify-center'}>
                    <div className="w-[45%] flex items-center justify-center gap-3 bg-slate-800 h-10 mt-3 mb-5 rounded-xl">
                      <button onClick={() => {handleInputChange('')}}><X/></button>
                      <input
                          value={searchInput}
                          onChange={(e) => {handleInputChange(e.target.value)}}
                          placeholder="جستجو سخنور"
                          className="bg-transparent outline-none text-white text-right w-[67%]"
                      />
                      <Search className="text-white"/>
                    </div>
                  </div>
                </div>
            ) : century === 'نقشهٔ خاستگاه سخنوران' ? (
                <div className={'w-2/3 flex items-center justify-center flex-col rounded-2xl bg-slate-700 text-center my-2'}>
                  <h2 className="text-2xl font-semibold px-4 py-3.5">
                    {century}
                  </h2>
                  <Link href={'/map'}>
                    <div className={'flex items-center justify-center w-full mb-6'}>
                      <Earth size={86} />
                    </div>
                  </Link>
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col w-[90%]">
                  <h2 className="text-2xl font-semibold rounded-lg bg-slate-700 px-4 py-2 text-center w-full">
                    {century}
                  </h2>
                  <div className="mt-4 text-center rounded-2xl py-2 w-full">
                    {poets.map((poet, i) => (
                        <div key={i} className="w-[82px] mr-[10px] inline-table">
                        <a
                        href={poet.link}
                        title={poet.title}
                        className="flex flex-col justify-center items-center"
                      >
                        <Image
                          src={poet.image}
                          alt={poet.name}
                          width={40}
                          height={40}
                          className="w-[82px] h-[100px] rounded-[50%] object-cover border-[2px] border-gray-400"
                        />
                        <div className="py-2 min-h-[3rem] flex items-center justify-center">
                          <div className="text-sm font-bold text-slate-300 text-center">{poet.name}</div>
                        </div>
                      </a>
                    </div>
                  ))}
                    <div ref={(el) => {
                      divRefs.current[index - 1] = el;
                    }}/>
                  </div>
                </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}