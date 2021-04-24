const fs = require('fs');
const cheerio = require('cheerio');
const config = require('./config/desktop.json');
const { collection, blockSelectors } = config;

fs.readFile('./sample/desktop.html', { encoding: 'utf-8' }, (err, data) => {
    console.time("parser")
    const $ = cheerio.load(data);
    const blocks = $(blockSelectors);
    const results = [];
    const typeOrders = {};

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

    console.log(results);
    console.timeEnd('parser');
});