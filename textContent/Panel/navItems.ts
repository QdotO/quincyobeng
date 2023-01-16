type SubItem = {
    id: number
    text: string
}

type NavItem = {
    id: number
    text: string
    subItems?: SubItem[]
}

const navItems: NavItem[] = [
    {
        id: 1,
        text: 'Dashboard',
    },
    {
        id: 2,
        text: 'Buy',
    },
    {
        id: 3,
        text: 'Sell',
    },
]

export default navItems
