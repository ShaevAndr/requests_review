import * as generator from 'generate-password';
export function generateSessionId(length: number = 15): string {
    return generator.generate({
        length: length,
        numbers: true,
        symbols: false,
        uppercase: true,
        lowercase: true,
        strict: false
    });
}