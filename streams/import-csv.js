import { parse } from 'csv-parse'
import fs from 'node:fs';

const filePath = new URL('./tasks.csv', import.meta.url)

const readStream = fs.createReadStream(filePath);

const parser = parse({
  delimiter: ',', // set the delimiter to comma
  skip_empty_lines: true,
  fromLine: 2
});

(async () => {
  const linesParse = readStream.pipe(parser);

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
}
})();
