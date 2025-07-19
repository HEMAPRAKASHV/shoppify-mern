import { ReactNode } from "react";
import NavBar from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
    children?: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    return (
        <div className="overflow-auto flex flex-col m-0 min-w-screen min-h-screen bg-no-repeat bg-cover items-center justify-center " >
            <NavBar />
            {children || <Outlet />}
            <Footer />
        </div>
    )
}

export default MainLayout;