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

// Simple state management and re-render approach
let currentRenderFunction = null; // App - Store the render function instead of static vnode
let currentContainer = null;

export function mount(renderFunction, container) {
    currentRenderFunction = renderFunction; // App
    currentContainer = container;
    
    // Clear container and render fresh
    container.innerHTML = '';
    //if the render function is a function, call it to get the vnode
    const vnode = typeof renderFunction === 'function' ? renderFunction() : renderFunction;
    render(vnode, container);  //vnode = h('div', {}, 'Hello World') 
}

export function rerender() {
    if (currentRenderFunction && currentContainer) {
        // Clear and re-render everything with fresh vnode
        currentContainer.innerHTML = '';
        const vnode = typeof currentRenderFunction === 'function' ? currentRenderFunction() : currentRenderFunction;
        render(vnode, currentContainer);
    }
}

// Simple state hook
export function useState(initialValue) {
    let value = initialValue;
    
    const setValue = (newValue) => {
        value = newValue;
        rerender(); // Trigger full re-render on state change
    };
    
    const getValue = () => value;
    
    return [getValue, setValue];
}
