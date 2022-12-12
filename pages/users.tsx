import {KeyboardEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {
    fetchAllUsersNoPagination,
    navigatePagination,
    resetFilter,
    selectAuthUser,
    selectFilter,
    selectPage,
    selectUsers,
    updateNameEndsWith,
    updateNameStartsWith,
    UsersState,
} from "../store/redux/userSlice";
import {useRouter} from "next/router";
import {IconAdjustmentsHorizontal} from "@tabler/icons";
import Heading from "../components/Heading";
import Metadata from "../components/Metadata";

export default function Users() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const authUser = useAppSelector(selectAuthUser);
    const filter = useAppSelector(selectFilter);
    const users = useAppSelector(selectUsers);
    const page = useAppSelector(selectPage);

    useEffect(() => {
        if (authUser.name === '') {
            router.push('/login');
        }

        dispatch(fetchAllUsersNoPagination());
    }, [router, authUser]);

    // useEffect(() => {
    //     dispatch(fetchAllUsers(filter));
    // }, [filter, filter.nameStartsWith, filter.nameEndsWith, filter.page])

    const handleUpdateNameStartsWith = (e: KeyboardEvent<HTMLInputElement>) => {
        dispatch(updateNameStartsWith(e.target.value))
    }

    const handleUpdateNameEndsWith = (e: KeyboardEvent<HTMLInputElement>) => {
        dispatch(updateNameEndsWith(e.target.value))
    }

    // if (authUser?.name === '') {
    //     return <div>You have to be authenticated to access this page</div>
    // }

    return users && (
        <>
            <Metadata
                title={'All Users'}
                description={'All users page'}
                image={'/img/4.png'}
                url={router.asPath}
            />

            <div className={'card'}>
                <Heading title={'All Users'}/>

                <div className={'filter-card'}>
                    <div className="flex items-center justify-between">
                        <div className={'inline-flex items-center'}>
                            <IconAdjustmentsHorizontal
                                size={16}
                                className={'mr-2 stroke-gray-800 dark:stroke-gray-400'}
                            />

                            <h2 className={'font-semibold text-lg text-gray-800 dark:text-gray-400'}>
                                Filter
                            </h2>
                        </div>

                        <button className={'primary-btn'} onClick={() => dispatch(resetFilter())}>
                            Reset
                        </button>
                    </div>

                    <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4'}>
                        <label htmlFor="starts-with">
                        <span className={'input-label'}>
                            Name Starts With
                        </span>

                            <input
                                type="text"
                                id={'starts-with'}
                                className={'input-text'}
                                placeholder={'Starts with'}
                                value={filter.nameStartsWith}
                                onChange={handleUpdateNameStartsWith}
                                autoComplete={'off'}
                            />
                        </label>

                        <label htmlFor="end-with">
                        <span className={'input-label'}>
                            Or Ends With
                        </span>

                            <input
                                type="text"
                                id={'end-with'}
                                className={'input-text'}
                                placeholder={'Ends with'}
                                value={filter.nameEndsWith}
                                onChange={handleUpdateNameEndsWith}
                                autoComplete={'off'}
                            />
                        </label>
                    </div>
                </div>

                {(users.length ? (
                        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 w-full'}>
                            {(users.map((user: UsersState) => (
                                <div key={user.id} className={'user-card'}>
                                    <img
                                        className={'rounded-full w-[60px] h-auto'}
                                        src={user.avatar}
                                        alt={user.first_name + ' ' + user.last_name + ' poster'}
                                    />

                                    <div className={'w-full ml-4 text-gray-800 dark:text-gray-400'}>
                                        <p>
                                            {user.first_name} {user.last_name}
                                        </p>

                                        <p className={'badge'}>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            )))}
                        </div>
                    ) : (
                        <article className={'content-card prose dark:prose-invert'}>
                            There are currently no results for the selected first name and last name filter on the
                            current page
                        </article>
                    )
                )}

                <div className="grid grid-cols-2 gap-6 mt-8 w-full">
                    <button
                        className={'primary-btn w-full disabled:opacity-50'}
                        onClick={() => dispatch(navigatePagination(filter.page - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>

                    <button
                        className={'primary-btn w-full disabled:opacity-50'}
                        onClick={() => dispatch(navigatePagination(filter.page + 1))}
                        disabled={page == 2}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}