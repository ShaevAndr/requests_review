import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 1;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


export function generatePassword(length: number = 8): string {
    return generator.generate({
        length: length,
        numbers: true,
        symbols: false,
        uppercase: true,
        lowercase: true,
        strict: false
    });
}