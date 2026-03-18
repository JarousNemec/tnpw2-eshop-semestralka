/**
 *
 *
 * @param {string} tag
 * @param {Object} props
 * @param {...(HTMLElement|string)} children
 * @returns {HTMLElement}
 */
export function createElement(tag, props = {}, ...children) {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(props)) {
        if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            for (const [dataKey, dataValue] of Object.entries(value)) {
                element.dataset[dataKey] = dataValue;
            }
        } else {
            element.setAttribute(key, value);
        }
    }

    for (const child of children) {
        if (child === null || child === undefined || typeof child === 'boolean') {
            continue;
        }

        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof HTMLElement || child instanceof DocumentFragment) {
            element.appendChild(child);
        } else if (Array.isArray(child)) {
            child.forEach(c => {
                if (c instanceof HTMLElement) {
                    element.appendChild(c);
                } else {
                    element.appendChild(document.createTextNode(String(c)));
                }
            });
        }
    }

    return element;
}

export const h = createElement; // h jako hyperscript
