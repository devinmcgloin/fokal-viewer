import { extractColor, extractTags } from './search';

it('extract colors', () => {
    expect(extractColor('cafe in paris')).toEqual(['cafe in paris', null]);
    expect(extractColor('cafe in paris #ededed')).toEqual(['cafe in paris', '#ededed']);
    expect(extractColor('cafe in paris rgb(234,123, 55)')).toEqual(['cafe in paris', '#EA7B37']);
    expect(extractColor('cafe in paris hsl(334,23, 55)')).toEqual(['cafe in paris', '#A77289']);
});

it('extract tags', () => {
    expect(extractTags('no tags')).toEqual(['no tags', [], []]);
    expect(extractTags('no tags +scuba')).toEqual(['no tags', ['scuba'], []]);
    expect(extractTags('no tags -scuba')).toEqual(['no tags', [], ['scuba']]);
    expect(extractTags('no tags +sun -winter')).toEqual(['no tags', ['sun'], ['winter']]);
});
