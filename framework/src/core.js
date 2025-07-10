// hyperscript helper for creating virtual DOM nodes
export function h(type, props = {}, ...children) {
    return { 
        type, 
        props: props || {}, 
        children 
    };
}

// naive renderer for rendering virtual DOM nodes to the DOM
export function render(vnode, container) {
    // text node
    if (typeof vnode === 'string' || typeof vnode === 'number') {
      const text = document.createTextNode(vnode);
      container.appendChild(text);
      return text;
    }
  
    // element node
    const el = document.createElement(vnode.type);
  
    // props / attributes
    for (const [key, value] of Object.entries(vnode.props ?? {})) {
      if (key.startsWith('on') && typeof value === 'function') {
        // Handle event listeners
        const eventName = key.toLowerCase().slice(2); // 'onClick' -> 'click'
        el.addEventListener(eventName, value);
      } else {
        // Handle regular attributes
        el.setAttribute(key, value);
      }
    }
  
    // children
    vnode.children.flat().forEach(child => render(child, el));
  
    container.appendChild(el);
    return el;
}
