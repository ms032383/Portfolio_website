
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const audioDir = path.join(process.cwd(), 'public', 'audio');

    try {
        if (!fs.existsSync(audioDir)) {
            return NextResponse.json({ files: [] });
        }

        const files = fs.readdirSync(audioDir)
            .filter(file => /\.(mp3|wav|ogg|m4a)$/i.test(file))
            .map(file => ({
                name: file,
                url: `/audio/${file}`,
            }));

        return NextResponse.json({ files });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read audio directory' }, { status: 500 });
    }
}
