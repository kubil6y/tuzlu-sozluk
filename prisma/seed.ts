import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const channels = [
    "general",
    "sports",
    "pol",
    "economics",
    "fun",
    "photogoraphy",
];

function deleteChannels() {
    return prisma.channel.deleteMany();
}

async function createChannels() {
    for (const channel of channels) {
        await prisma.channel.create({
            data: {
                name: channel,
            },
        });
    }
}

async function main() {
    await deleteChannels();
    await createChannels();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
