// import AppLogoIcon from './app-logo-icon';
import { AppLogoIcon } from './page/Images';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md border-2 border-gray-300 h-9 w-10">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <AppLogoIcon />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Zeelat Academy</span>
            </div>
        </>
    );
}
