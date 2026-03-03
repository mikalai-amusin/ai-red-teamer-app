import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
    try {
        const { pitch } = await req.json();

        if (!pitch) {
            return NextResponse.json({ error: 'Pitch is required' }, { status: 400 });
        }

        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

        const prompt = `You are a cynical, ruthless venture capitalist and Y-Combinator partner. 
    Your goal is to perform a 'Red-Team' analysis on a startup pitch. You do NOT sugarcoat. 
    You are looking for reasons to say NO.
    
    A founder has just pitched you:
    "${pitch}"

    Tear it apart. Expose the structural flaws, the competitive threats, and the founder's biggest delusion.
    Structure your response using these markdown headers:
    
    # Reality Check Report
    ## The Delusion (Brutal 1-sentence summary)
    ## Critical Market Flaws (The deep structural issues)
    ## The Competitor Threat (Who will eat your lunch?)
    ## Suggested Pivot (The only way you survive)
    
    Be analytical, aggressive, and concise.`;

        // Using pattern confirmed by diagnostic scripts
        const response = await genAI.models.generateContent({
            model: "models/gemini-2.5-flash",
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
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
