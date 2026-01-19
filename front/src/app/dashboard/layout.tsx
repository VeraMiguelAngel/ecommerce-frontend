import Link from "next/link"

export default function Dasboardlayout ({
    children,

} : {
    children: React.ReactNode
}) {
    return (
        <section>
            <div>
                <Link href='/dashboard'>Mi perfil</Link>                
            </div>
            <div>
                <Link href='/dashboard/orders'>Mis compras</Link>
            </div>
            {children}
        </section>
    )
}
