import 'reflect-metadata'
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { plainToClass } from 'class-transformer';
import { RootSchema } from './root-schema';
import { validate, ValidationError } from 'class-validator';
const config = require('../config/desktop.json');
const { collection, blockSelector } = config;

function logErrors(errors: ValidationError[], property: string = null) {
    errors.forEach(error => {
        const path = property ? `${property}.${error.property}` : error.property

        if (error.children && error.children.length > 0) {
            logErrors(error.children, path)
        } else {
            console.log('Validation Error:', {
                path,
                constraints: error.constraints
            })
        }
    })
}

async function main() {
    const data = fs.readFileSync('./sample/desktop.html', { encoding: 'utf-8' })
    const rootSchema = plainToClass(RootSchema, config)
    console.time("parser")
    const $ = cheerio.load(data);
    const blocks = $(blockSelector);
    const results = [];
    const typeOrders = {};
    const configErrors = await validate(rootSchema)

    console.log('root schema:', rootSchema.union[0].schema)
    // console.log('config errors:', configErrors)

    logErrors(configErrors)

    blocks.each((index, el) => {
        Object.keys(collection).forEach(key => {
            const currentType = collection[key];
            const typeCheck = $(el).find(currentType.detect.withInnerSelector).length > 0;

            if (!typeCheck) return;

            const schema = currentType.schema;
            const result = {};

            typeOrders[key] = (typeOrders[key] || 0) + 1;

            Object.keys(schema).forEach(field => {
                const isObjectSelector = typeof schema[field] === 'object';
                let selector = schema[field];
                let collectType = "text";           // available: "text" | "html" | "attr" 
                let collectParams = undefined;

                if (isObjectSelector) {
                    selector = schema[field].selector;
                    collectType = schema[field].attr ? "attr" : "text";
                    collectParams =  schema[field].attr;
                }

                result[field] = $(el).find(selector)[collectType](collectParams);
            });

            results.push({
                order: index,
                typeOrder: typeOrders[key],
                type: key,
                ...result,
            })
        })
    });

    // console.log(results);
    console.timeEnd('parser');
}

main().catch(err => {
    console.log('Error:', err);
});
