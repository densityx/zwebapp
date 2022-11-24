import {IconMenu2} from "@tabler/icons";
import {useRouter} from "next/router";
import {useState} from "react";
import Link from "next/link";
import Logo from "./Logo";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {logoutUser, selectAuthUser} from "../store/redux/userSlice";
import {MenuLink, selectHeaderMenus} from "../store/redux/commonSlice";

export default function Header() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    const authUser = useAppSelector(selectAuthUser);
    const menus = useAppSelector(selectHeaderMenus);

    const handleLogout = () => {
        dispatch(logoutUser());

        router.push('/login');
    }

    return (
        <header className={'header'}>
            <div className={'container mx-auto'}>
                <div className={'lg:xp-0 flex flex-row items-center justify-between px-5 w-full lg:w-auto'}>
                    <Logo/>

                    <div className={'flex space-x-8 lg:hidden'}>
                        <button onClick={() => setMobileMenu(!mobileMenu)}>
                            <IconMenu2 className={'stroke-gray-800 dark:stroke-gray-400'}/>
                        </button>
                    </div>

                    <nav className={'ml-[50px] hidden space-x-10 lg:block'}>
                        {menus.map((menu: MenuLink) => (
                            <Link
                                href={menu.slug}
                                key={menu.id}
                                className={`nav-link ${router.pathname === menu.slug ? 'nav-link--active' : null}`}
                            >
                                {menu.name}
                            </Link>
                        ))}

                        {!authUser.name ? (
                            <Link
                                href={'/login'}
                                className={`nav-link ${router.pathname === '/login' ? 'nav-link--active' : null}`}
                            >
                                Login
                            </Link>
                        ) : (
                            <p
                                className={`nav-link cursor-pointer`}
                                onClick={handleLogout}
                            >
                                Logout
                            </p>
                        )}
                    </nav>
                </div>
                <div
                    className={`mobile-menu ${!mobileMenu ? 'hidden' : null}`}
                >
                    <div className={'flex flex-col lg:ml-10 lg:space-x-10'}>
                        {menus.map((menu: MenuLink) => (
                            <Link
                                href={menu.slug}
                                key={menu.id}
                                className="mobile-link"
                                onClick={() => setMobileMenu(false)}
                            >
                                {menu.name}
                            </Link>
                        ))}

                        {!authUser.name ? (
                            <Link
                                href={'/login'}
                                className={'mobile-link'}
                                onClick={() => setMobileMenu(false)}
                            >
                                Login
                            </Link>
                        ) : (
                            <p
                                className={'mobile-link cursor-pointer'}
                                onClick={() => {
                                    setMobileMenu(false);
                                    handleLogout()
                                }}
                            >
                                Logout
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}