"use client"
import { getClasses } from "@/action/getClasses"
import { useProfileStore } from "@/hooks/use-modal-store"
import { useEffect, useState } from "react"
import ClassItem from "../_component/ClassItems"
import { Loader2 } from "lucide-react"

const Settings = () => {
    const {profile} = useProfileStore()
    const [classes, setClasses] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchClasses = async () => {
      if (profile?.newUser?._id) {
      setIsLoading(true); // Start loading
      try {
        const result = await getClasses({ profileId: profile.newUser._id });
        setClasses(result);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false); // Always stop loading
      }
      }
    };

    fetchClasses();
  }, [profile]); // <-- re-run when profile is loaded
    return (
      <div className="pl-16 flex items-center gap-2 w-full h-full">
        {isLoading && <Loader2 className="h-6 w-6 text-muted-foreground animate-spin"/>}
        {classes?.map((item) => (
          <ClassItem
          key={item?.id}
          initialData={item}
          />
        ))}  
       </div>
    )
}

export default Settings