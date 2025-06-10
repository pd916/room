import Header from "@/components/sidebar/Header"
import Sidebar from "@/components/sidebar/Sidebar"


const mainLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="h-full">
            <Header/>
            <div className="hidden md:flex h-full w-64 border z-30 flex-col fixed inset-y-0">
                <Sidebar/>
            </div>
            <div className="md:pl-64 h-full">
            {children}
            </div>
        </div>
    )
}

export default mainLayout