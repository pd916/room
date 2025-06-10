import { db } from "@/lib/db";


async function main() {
    try {
        await db.classEnrollment.create({
            data: {
                classId: "0bacd3dd-269b-4a67-8564-7d46301f0b2f",
                profileId: "25ed550b-924c-40e2-ac37-317efab2a1e1"
            }
        })
        console.log("Success");
    } catch (error) {
    console.error("❌ Error seeding the class enrollment:", error);
  } finally {
    await db.$disconnect();
  }
}

main()