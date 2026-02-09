
import { describe, expect, it } from 'vitest'
import { formatSlug } from './transliterate'

describe('formatSlug', () => {
    it('should transliterate Ukrainian characters to Latin', () => {
        const input = 'Привіт Світ'
        const expected = 'pryvit-svit'
        const result = formatSlug(input)
        expect(result).toBe(expected)
    })

    it('should handle special characters and spaces correctly', () => {
        const input = 'Це - тест!'
        const expected = 'tse-test' // Space becomes hyphen, special chars removed
        const result = formatSlug(input)
        expect(result).toBe(expected)
    })

    // This test is designed to fail intentionally to demonstrate debugging capabilities
    it('should handle empty strings', () => {
        const input = ''
        const result = formatSlug(input)
        expect(result).toBe('')
    })
})
