import { announcements } from "@/constant";
import { Megaphone } from "lucide-react";

const ClassAnnouncements = () => {
  return (
    <div className="border rounded-xl bg-white dark:bg-[#1f1f1f] shadow-sm p-4 mb-3 overflow-auto ">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Class Announcements
        </h2>
      </div>
      
      {announcements.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No announcements yet.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((item) => (
            <li key={item?.id} className="p-3 rounded-md bg-gray-50 dark:bg-[#2b2b2b] border hover:shadow-md transition">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item?.description}
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {item?.date}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassAnnouncements;