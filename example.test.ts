
//断言
import { expect, test, describe, vi, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'
vi.mock('axios')
//新建变量
const mockedAxios = axios as Mocked<typeof axios>
test('test common matcher', () => {
    const name = 'viking'
    expect(name).toBe('viking')
    expect(2 + 2).toBe(4)
    expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})

test('test number', () => {
    expect(4).toBeGreaterThan(3)
    expect(2).toBeLessThan(3)
})
//对象不能用tobe tobe严格比较，值虽然相等但是确实两个对象，要用toEqual
test('test object', () => {
    expect({ name: 'viking' }).toEqual({ name: 'viking' })
})


//测试回调函数是否被调用
//callback test
//mock
describe('functions', () => {
    test('create a mock function', () => {
        const callback = vi.fn()
        testFn(12, callback)
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledWith(12)
    })
    //监控对象上的方法
    test('spy on method', () => {
        const obj = {
            getName: () => 1
        }
        const spy = vi.spyOn(obj, 'getName')
        obj.getName()
        expect(spy).toHaveBeenCalled()
        obj.getName()
        expect(spy).toHaveBeenCalledTimes(2)
    })
    test('mock third party module', async () => {
        //手动写实现
        // mockedAxios.get.mockImplementation(()=> Promise.resolve({data:123}))
        //简写成
        mockedAxios.get.mockResolvedValue({ data: 123 })
        const result = await request()
        expect(result).toBe(123)
    })
})