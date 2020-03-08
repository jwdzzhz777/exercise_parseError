import { parseError } from '../src'

const result = {
    message: 'Error raised',
    stack: [
        {
            line: 2,
            column: 9,
            filename: 'http://192.168.31.8:8000/c.js'
        },
        {
            line: 4,
            column: 15,
            filename: 'http://192.168.31.8:8000/b.js'
        },
        {
            line: 4,
            column: 3,
            filename: 'http://192.168.31.8:8000/a.js'
        }
    ]
}

test('parseError chrome', () => {
    const err = {
        name: 'TypeError',
        message: 'Error raised',
        stack: `TypeError: Error raised
            at bar http://192.168.31.8:8000/c.js:2:9
            at foo http://192.168.31.8:8000/b.js:4:15
            at calc http://192.168.31.8:8000/a.js:4:3
            at <anonymous>:1:11
            at http://192.168.31.8:8000/a.js:22:3
        `
    }
    expect(parseError(err)).toEqual(result)
})

test('parseError Firefox', () => {
    const err = {
        name: 'TypeError',
        message: 'Error raised',
        stack: `
            bar@http://192.168.31.8:8000/c.js:2:9
            foo@http://192.168.31.8:8000/b.js:4:15
            calc@http://192.168.31.8:8000/a.js:4:3
            <anonymous>:1:11
            http://192.168.31.8:8000/a.js:22:3
        `
    }
    expect(parseError(err)).toEqual(result)
})

test('parseError ignore', () => {
    const err = {
        name: 'TypeError',
        message: 'Error raised',
        stack: `
            <anonymous>:1:11
            <anonymous>:2:22
            <anonymous>:3:33
            @http://192.168.31.8:8000/a.js:4:3
            bar http://192.168.31.8:8000/c.js:2:9
        `
    }
    expect(parseError(err)).toEqual({
        message: 'Error raised',
        stack: []
    })
})
