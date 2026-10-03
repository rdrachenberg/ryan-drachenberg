import { NextResponse, NextRequest } from 'next/server';
import { sendEmail } from '../../../lib/nodemailer';

// Donation notifications only. Recipient, sender and wording are fixed here so the
// route can't be used to send arbitrary mail; the client supplies just the tx.
const TO = 'ryandrachenberg@gmail.com';
const FROM = 'tssinvestments@gmail.com';

const EXPLORERS: Record<number, string> = {
    1: 'https://etherscan.io/tx/',
    56: 'https://bscscan.com/tx/',
    11155111: 'https://sepolia.etherscan.io/tx/',
    97: 'https://testnet.bscscan.com/tx/',
};

const TX_HASH = /^0x[0-9a-fA-F]{64}$/;

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);
    const hash = body?.hash;
    const explorer = EXPLORERS[Number(body?.chainId)];

    if (typeof hash !== 'string' || !TX_HASH.test(hash) || !explorer) {
        return NextResponse.json({ success: false }, { status: 400 });
    }

    try {
        await sendEmail(
            TO,
            FROM,
            'You received a donation',
            `You received a donation! \nHere is a link to the transaction: ${explorer}${hash}`
        );
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Donation email failed', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
