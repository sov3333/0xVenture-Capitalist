import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';

interface Params extends Request {
    nextUrl: any
}

export async function GET(request: Params, { params }: { params: { userId: string }}) {

    const userId = params.userId
    const { searchParams } = request.nextUrl;
    const upgradeId = searchParams.get("upgradeId");
    const price = Number(searchParams.get("price"));
    const businessName = searchParams.get("businessName");
    const upgradeDescription = searchParams.get("upgradeDescription");

    // console.log(userId, upgradeId, price, userCoins, businessName)



    // RESEARCH: rate limiter


    
    // get `purchased` from Upgrade db instead of from searchParams to make check more secure
    const upgrade = await prisma.upgrade.findUnique({
        where: {
            id: upgradeId
        }
    });

    // if upgrade is already purchased, return error
    if (upgrade?.purchased === true) return NextResponse.json({ error: "Already purchased upgrade" })
    
    // get userCoins from db instead of from searchParams to make check more secure
    const player = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    // if user doesn't have enough coins, return error
    if (player && player?.coins < price) return NextResponse.json({ error: "Not enough coins" })
    
    // if all checks pass, continue to purchase upgrade
    try {
        // use userId to update player's coins
        const player = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                coins: {
                    decrement: price
                }
            }
        });

        if (!player) return NextResponse.json({ error: "Error deducting coins." })

        // use userId to update Upgrade purchased to true
        const upgrade = await prisma.upgrade.update({
            where: {
                id: upgradeId
            },
            data: {
                purchased: true
            }
            
        });

        if (!upgrade) return NextResponse.json({ error: "Error updating upgrade.purchased to true." })

        if (businessName === "All Businesses") {
            // update all business with userId=userId to update profits x3
            const business = await prisma.business.updateMany({
                where: {
                    userId: userId
                },
                data: {
                    revenue: { multiply: 3 }
                }
            })

            if (business && player && upgrade) {
                // refresh the page
                // return NextResponse.redirect(`/game`);
                return NextResponse.json({ success: `${upgradeDescription} upgrade purchased!` })    
            }
        }
        else {
            // use one business that has userId=userId and name=businessName to update profits x3
            const business = await prisma.business.updateMany({
                where: {
                    
                    AND: [
                        { name: { equals: businessName} },
                        { userId: { equals: userId} },
                    ],
                },
                data: {
                    revenue: { multiply: 3 }
                }
            });

            if (business && player && upgrade) {
                // refresh the page
                // return NextResponse.redirect(`/game`);
                return NextResponse.json({ success: `${upgradeDescription} upgrade purchased!` })    
            }

        }    

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" })
    }

}