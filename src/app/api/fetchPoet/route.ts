import { NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // URL of the external website
    const url = 'https://ganjoor.net/'; // Replace with the actual URL

    // Fetch the HTML content of the external website
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = load(data);

    // Object to store poets grouped by century
    const poetsByCentury = {};

    // Find all elements with class "century"
    $('.century').each((index, element) => {
      const century = $(element).text().trim(); // Get the century text
      const spacer = $(element).next('.spacer'); // Get the next spacer div

      // Initialize an array for the current century
      poetsByCentury[century] = [];

      // Find all poet elements within the spacer
      spacer.find('.poet').each((i, poetElement) => {
        const poet = {
          name: $(poetElement).find('.caption a').text().trim(), // Poet's name
          link: $(poetElement).find('a').attr('href'), // Poet's link
          image: $(poetElement).find('img').attr('src'), // Poet's image
          title: $(poetElement).find('a').attr('title'), // Poet's title
        };
        poetsByCentury[century].push(poet); // Add the poet to the current century
      });
    });

    // Define the file path where you want to save the data
    const filePath = path.join(process.cwd(), 'poetsByCentury.json');

    // Write the data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(poetsByCentury, null, 2));

    // Return a success response
    return NextResponse.json({ message: 'Data saved to file successfully' });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}