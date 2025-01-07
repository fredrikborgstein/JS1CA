import Header from './Header.js';
import Footer from './Footer.js';

export function AppLayout({ view }) {
    const header = Header();
    const footer = Footer();

    return {
        render: () => `
            ${header.render()}
            <main>${view.render()}</main>
            ${footer.render()}
        `,
        onMount: (dependencies) => {
            if (header.onMount) header.onMount(dependencies);
            if (view.onMount) view.onMount(dependencies);
            if (footer.onMount) footer.onMount(dependencies);
        },
        onDismount: () => {
            if (view.onDismount) view.onDismount();
        },
    };
}
