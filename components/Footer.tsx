import {IconMoon, IconSun} from "@tabler/icons";
import {useLocalStorage} from '@mantine/hooks';
import {useEffect} from "react";
import {ColorScheme} from "@mantine/core";
import {useAppSelector} from "../store/hooks";
import {MenuLink, selectFooterMenus} from "../store/redux/commonSlice";
import Link from "next/link";

export default function Footer() {
    const menus = useAppSelector(selectFooterMenus);
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'theme',
        defaultValue: 'light',
    });
    const toggleColorScheme = () => setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

    /** determine the theme preference by checking current existing theme selected by user or fallback to OS specific settings */
    useEffect(() => {
        if (colorScheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [colorScheme]);

    return (
        <footer className={'footer-container'}>
            <nav className={'container mx-auto flex justify-center space-x-6'}>
                {(menus.map((menu: MenuLink) => (
                    <Link
                        className="footer-link"
                        key={menu.id}
                        href={menu.slug}
                        target={menu.id === 1 || menu.id === 2 ? '_blank' : undefined}
                        rel={menu.id === 1 || menu.id === 2 ? 'noreferrer' : undefined}
                    >
                        {menu.name}
                    </Link>
                )))}

                <button onClick={toggleColorScheme}>
                    {colorScheme === 'dark'
                        ? <IconSun size={18} className={'stroke-gray-800 dark:stroke-gray-400'}/>
                        : <IconMoon size={18} className={'stroke-gray-800 dark:stroke-gray-400'}/>
                    }
                </button>
            </nav>
        </footer>
    )
}