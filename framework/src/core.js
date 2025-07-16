

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
    // Input validation
    if (!type || (typeof type !== 'string' && typeof type !== 'function')) {
        throw new Error('h(): type must be a non-empty string or function');
    }
    
    if (props !== null && typeof props !== 'object') {
        throw new Error('h(): props must be an object or null');
    }
    
    return { 
        type, 
        props: props || {}, 
        children 
    };
}

// Function to clean up event listeners from an element
function cleanupEventListeners(element) {
    if (activeEventListeners.has(element)) {
        const listeners = activeEventListeners.get(element);
        listeners.forEach(({ eventName, handler }) => {
            element.removeEventListener(eventName, handler);
        });
        activeEventListeners.delete(element);
    }
    
    // Clean up child elements recursively
    Array.from(element.children).forEach(child => cleanupEventListeners(child));
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
        
        // Track the listener for cleanup
        if (!activeEventListeners.has(el)) {
            activeEventListeners.set(el, []);
        }
        activeEventListeners.get(el).push({ eventName, handler: value });
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
let stateStore = []; // Store all state instances for cleanup
let currentStateIndex = 0; // Track current state index during render
let activeEventListeners = new WeakMap(); // Track event listeners for cleanup

export function mount(renderFunction, container) {
    currentRenderFunction = renderFunction;
    currentContainer = container;
    
    // Clean up existing event listeners before clearing DOM
    cleanupEventListeners(container);
    
    // Clear container and render fresh
    container.innerHTML = '';
    
    // Reset state index for fresh render
    currentStateIndex = 0;
    const vnode = typeof renderFunction === 'function' ? renderFunction() : renderFunction;
    render(vnode, container);
}

export function rerender() {
    if (currentRenderFunction && currentContainer) {
        // Clean up existing event listeners before clearing DOM
        cleanupEventListeners(currentContainer);
        
        // Clear and re-render everything with fresh vnode
        currentContainer.innerHTML = '';
        
        // Reset state index for consistent state access
        currentStateIndex = 0;
        const vnode = typeof currentRenderFunction === 'function' ? currentRenderFunction() : currentRenderFunction;
        render(vnode, currentContainer);
    }
}

// Simple state hook
export function useState(initialValue) {
    const stateIndex = currentStateIndex++;
    
    // Initialize state if it doesn't exist
    if (stateStore[stateIndex] === undefined) {
        stateStore[stateIndex] = initialValue;
    }
    
    const setValue = (newValue) => {
        stateStore[stateIndex] = newValue;
        rerender(); // Trigger full re-render on state change
    };
    
    const getValue = () => stateStore[stateIndex];
    
    return [getValue, setValue];
}

// Simple routing system
let routes = {};
let currentRoute = '/';

export function addRoute(path, component) {
    // Input validation
    if (!path || typeof path !== 'string') {
        throw new Error('addRoute(): path must be a non-empty string');
    }
    
    if (!component || (typeof component !== 'function' && typeof component !== 'object')) {
        throw new Error('addRoute(): component must be a function or object');
    }
    
    routes[path] = component;
}

export function navigate(path) {
    // Input validation
    if (!path || typeof path !== 'string') {
        throw new Error('navigate(): path must be a non-empty string');
    }
    
    // Basic URL validation
    if (!path.startsWith('/')) {
        throw new Error('navigate(): path must start with "/"');
    }
    
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
