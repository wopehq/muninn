import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { ConfigType } from './config';
const config: ConfigType = require('../config/desktop.json');

type TypeOrder = { [key: string]: number };

const { collection, selector } = config;

async function main() {
    const data = fs.readFileSync('./sample/desktop.html', { encoding: 'utf-8' });

    console.time("parser");

    const $ = cheerio.load(data);
    const blocks = $(selector);
    const results: Object[] = [];
    const typeOrders: TypeOrder = {};

    blocks.each((index, el) => {
        Object.keys(collection).forEach(key => {
            const currentType = collection[key];
            const typeCheck = $(el).find(currentType.detect.withInnerSelector).length > 0;

            if (!typeCheck) return;

            const schema = currentType.schema;
            const result = {};

            typeOrders[key] = (typeOrders[key] || 0) + 1;

            Object.keys(schema).forEach(field => {
                const { selector, html, attr } = schema[field];
                const method = html ? 'html' : attr ? 'attr' : 'text';
                const params = attr;

                result[field] = $(el).find(selector)[method](params);
            });

            results.push({
                order: index,
                typeOrder: typeOrders[key],
                type: key,
                ...result,
            })
        })
    });

    console.log(results);
    console.timeEnd('parser');
}

main().catch(err => {
    console.log('Error:', err);
});
