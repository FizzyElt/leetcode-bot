import { parse } from 'csv-parse';
import fs from 'fs';
import fsAsync from 'fs/promises';
import { ReadonlyArray, pipe, Option } from 'effect';

const createLoadData =
  <T>(convert: (row: unknown[]) => T) =>
  (fileName: string): Promise<ReadonlyArray<T>> => {
    const stream = fs.createReadStream(fileName).pipe(parse({ delimiter: ',' }));

    return new Promise((resolve, reject) => {
      const data: Array<T> = [];
      stream.on('data', (r) => {
        data.push(convert(r));
      });
      stream.on('error', () => {
        console.log(fileName, 'error');
        reject(`${fileName} error`);
      });
      stream.on('end', () => {
        const newData = pipe(
          ReadonlyArray.tail(data),
          Option.getOrElse(() => ReadonlyArray.empty<T>())
        );
        resolve(newData);
      });
    });
  };

const convertRow = (row: unknown[]) => {
  const [id = '0', title = '', difficulty = ''] = row;

  return {
    id: parseInt(id as string),
    title,
    difficulty,
  };
};

const loadData = createLoadData(convertRow);

const run = async () => {
  const csvFileList = await fsAsync.readdir('./data/csv').then((ls) =>
    ls.map((path) => {
      const [name = ''] = path.split('.');
      return name;
    })
  );

  return Promise.all(
    csvFileList.map((name) =>
      loadData(`./data/csv/${name}.csv`)
        .then((data) => {
          return {
            data,
          };
        })
        .then((data) => JSON.stringify(data, null, 2))
        .then((dataString) => {
          fs.writeFileSync(`./data/json/${name}.json`, dataString);
        })
    )
  );
};

run();
