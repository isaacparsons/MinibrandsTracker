import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash("1234", 10);
  // await prisma.user.upsert({
  //   where: { email: "isaac.2962@gmail.com" },
  //   update: {},
  //   create: {
  //     email: "isaac.2962@gmail.com",
  //     phoneNumber: "4039908793",
  //     firstName: "isaac",
  //     lastName: "parsons",
  //     passwordHash: hash,
  //     accountCreated: true
  //   }
  // });
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
