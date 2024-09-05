import prisma from "./lib/prisma";

/**
 * query all the item table and include user, company and category table
 * it should return a array of Item[] 
 */
export async function getAllItems() {
    return await prisma.item.findMany({
        include: {
            user: {
                select: {
                    _count: true,
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            company: true,
            category: true
        },
    });
}