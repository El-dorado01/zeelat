import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Zeelat Computer Academy';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : `${appName}`),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.{tsx,jsx}', { eager: false });
        return resolvePageComponent(`./pages/${name}.tsx`, pages).catch(() => resolvePageComponent(`./pages/${name}.jsx`, pages));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        // color: '#4B5563',
        color: '#6BB8B8',
    },
});

// This will set light / dark mode on load...
initializeTheme();
