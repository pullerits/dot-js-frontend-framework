

/*example vnode that gets passed to the render(vnode, container) function:
h("div", { className: "container", id: "main", onClick: () => alert("clicked"), disabled: true }, "Hello World", 
    h("button", { className: "btn", onMouseEnter: () => console.log("hover") }, "Click me")
)

const vnode = {
  type: "div",
  props: {
    className: "container",
    id: "main",
    onClick: () => alert("clicked"),
    disabled: true
  },
  children: [
    "Hello World",
    {
      type: "button",
      props: {
        className: "btn",
        onMouseEnter: () => console.log("hover")
      },
      children: ["Click me"]
    }
  ]
}
*/ 

// ...children creates an array of children

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
    for (const key in vnode.props || {}) {
      const value = vnode.props[key];
      
      // Check if this is an event handler
      if (key.startsWith('on') && typeof value === 'function') {
        // Handle event listeners
        const eventName = key.toLowerCase().slice(2);
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
let currentRenderFunction = null; // Store the render function instead of static vnode
let currentContainer = null;

export function mount(renderFunction, container) {
    currentRenderFunction = renderFunction;
    currentContainer = container;
    
    // Clear container and render fresh
    container.innerHTML = '';
    const vnode = typeof renderFunction === 'function' ? renderFunction() : renderFunction;
    render(vnode, container);
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

// Simple routing system
let routes = {};
let currentRoute = '/';

export function addRoute(path, component) {
    routes[path] = component;
}

export function navigate(path) {
    currentRoute = path;
    // Update browser URL without page reload
    window.history.pushState({}, '', path);
    rerender(); // Trigger re-render with new route
}

export function getCurrentRoute() {
    return currentRoute;
}

export function Router() {
    const RouteComponent = routes[currentRoute];
    if (RouteComponent) {
        return typeof RouteComponent === 'function' ? RouteComponent() : RouteComponent;
    }
    // Default 404 component
    return h('div', {}, h('h1', {}, '404 - Page Not Found'));
}

// Initialize router on page load
if (typeof window !== 'undefined') {
    // Set initial route from URL
    currentRoute = window.location.pathname;
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        currentRoute = window.location.pathname;
        rerender();
    });
}
