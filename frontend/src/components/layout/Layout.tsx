interface LayoutProps{
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) =>{
    return(
        <div className="min-h-screen flex flex-col">
            <header className="bg-gradient-primary text-white">
                {'TODO header content'}
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="bg-gray-800 text-white">
                {'TODO footer content'}
            </footer>
        </div>
    )
}

export default Layout;