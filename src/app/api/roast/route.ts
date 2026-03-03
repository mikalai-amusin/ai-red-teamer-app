import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { pitch } = await req.json();

        if (!pitch) {
            return NextResponse.json({ error: 'Pitch is required' }, { status: 400 });
        }

        const prompt = `You are a ruthless, highly-experienced Silicon Valley investor and Y-Combinator partner. 
    You do NOT sugarcoat anything. 
    A solo founder has just pitched you the following startup idea:

    "${pitch}"

    Tear it apart. Identify the critical market flaws, why competitors will crush them, and the biggest delusion the founder is currently suffering from.
    Structure your response clearly using markdown with the following sections:
    
    # Reality Check Report
    ## The Delusion (1 sentence summary of why this is a bad idea)
    ## Critical Market Flaws (Bullet points)
    ## The Competitor Threat (Who will crush them and why)
    ## Suggested Pivot (If any, what's a better direction?)
    
    Be concise, brutal, but highly analytical.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return NextResponse.json({
            report: response.text
        });

    } catch (error: any) {
        console.error('Error generating roast:', error);
        return NextResponse.json(
            { error: 'Failed to generate roast.' },
            { status: 500 }
        );
    }
}
