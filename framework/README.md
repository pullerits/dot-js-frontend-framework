# Dot.js - A Minimal Frontend Framework

Dot.js is a lightweight, modern frontend framework built from scratch. **If you know React, you'll feel right at home!** It provides a simple yet powerful way to create reactive user interfaces with JavaScript, featuring virtual DOM, state management, and routing capabilities.

## Coming from React?

Dot.js works very similarly to React, but simpler:
- Components are functions that return virtual DOM (like JSX, but using `h()` instead)
- State works like React hooks with `useState()`
- No JSX compilation needed - pure JavaScript!
- Built-in routing (no need for React Router)

## 🚀 Features

- **Virtual DOM** - Efficient DOM updates with a lightweight virtual DOM implementation
- **Component Architecture** - Reusable, composable components
- **State Management** - Built-in reactive state with automatic re-rendering
- **Routing** - Client-side routing with browser history support
- **Event Handling** - Declarative event handling

## 📦 Installation

No installation required! Dot.js is a single JavaScript file that you can include directly in your project.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Dot.js App</title>
</head>
<body>
    <div id="app"></div>

    <script type="module">
        import { h, mount, useState } from './framework/src/core.js';
        
        function App() {
            // Just like React useState, but the getter is a function
            const [count, setCount] = useState(0);
            
            return h('div', {},
                h('h1', {}, 'Hello Dot.js!'),
                h('p', {}, `Count: ${count()}`), // Call count() to get the value
                h('button', { 
                    onClick: () => setCount(count() + 1) 
                }, 'Increment')
            );
        }

        // Mount your app - like ReactDOM.render() in React
        mount(App, document.getElementById('app'));
    </script>
</body>
</html>
```

### Development Setup

For development, use a local server to avoid CORS issues:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .


### Browser Requirements

- **ES6 Modules** support (Chrome 61+, Firefox 60+, Safari 10.1+)
- **ES6 Features** (arrow functions, destructuring, etc.)
- **History API** (for routing)

*Same requirements as modern React apps!*

## 🏗️ Architecture Overview (For React Developers)

### How Dot.js Compares to React

| React | Dot.js | Why Different? |
|-------|--------|----------------|
| JSX | `h()` function | No build step needed |
| `useState()` returns `[value, setter]` | `useState()` returns `[getter, setter]` | Simpler implementation |
| `ReactDOM.render()` | `mount()` | Same concept, different name |
| React Router | Built-in routing | No extra dependencies |

**Virtual DOM Structure (same as React):**
```javascript
{
    type: 'div',           // HTML tag name
    props: { className: 'container' },  // Attributes and event handlers
    children: [...]        // Child elements
}
```

**State Management (like React hooks):**
```javascript
// Similar to React, but getter is a function
const [count, setCount] = useState(0);
console.log(count()); // Get current value
setCount(5); // Update value (triggers re-render)
```

## 📚 API Reference

### Core Functions

#### `h(type, props, ...children)`
Creates virtual DOM nodes - **this is like JSX in React, but as a function call**.

**Parameters:**
- `type` (string) - HTML tag name (like 'div', 'button', etc.)
- `props` (object) - Element attributes and event handlers
- `...children` - Child elements or text nodes

**Think of it like this:**
```javascript
// In React with JSX:
<div className="container">
    <h1>Title</h1>
    <p>Content</p>
</div>

// In Dot.js with h():
h('div', { className: 'container' },
    h('h1', {}, 'Title'),
    h('p', {}, 'Content')
);
```

#### `render(vnode, container)`
Renders a virtual DOM node to the DOM.

**Parameters:**
- `vnode` - Virtual DOM node to render
- `container` - DOM element to render into

#### `mount(component, container)`
Mounts a component to the DOM and sets up reactive rendering.

**Parameters:**
- `component` - Component function or virtual DOM node
- `container` - DOM element to mount into

### State Management

#### `useState(initialValue)`
Creates reactive state that triggers re-renders when updated. **Almost exactly like React's useState!**

**Parameters:**
- `initialValue` - Initial state value

**Returns:**
- `[getValue, setValue]` - Array containing getter function and setter function

**The only difference from React:**
```javascript
// In React:
const [count, setCount] = useState(0);
console.log(count); // Direct access to value
setCount(count + 1);

// In Dot.js:
const [count, setCount] = useState(0);
console.log(count()); // Call count() to get the value
setCount(count() + 1);
```

**Why the difference?** It's simpler to implement and still works great!

### Routing

#### `addRoute(path, component)`
Registers a route with a component.

**Parameters:**
- `path` (string) - URL path
- `component` - Component function to render for this route

#### `navigate(path)`
Programmatically navigates to a route.

**Parameters:**
- `path` (string) - URL path to navigate to

#### `Router()`
Component that renders the current route.

#### `getCurrentRoute()`
Returns the current route path.

**Example:**
```javascript
import { addRoute, navigate, Router } from './framework/src/core.js';

function HomePage() {
    return h('div', {}, h('h1', {}, 'Home'));
}

function AboutPage() {
    return h('div', {}, h('h1', {}, 'About'));
}

// Register routes
addRoute('/', HomePage);
addRoute('/about', AboutPage);

// Navigation component
function Navigation() {
    return h('nav', {},
        h('button', { onClick: () => navigate('/') }, 'Home'),
        h('button', { onClick: () => navigate('/about') }, 'About')
    );
}

// App with routing
function App() {
    return h('div', {},
        Navigation(),
        Router()
    );
}
```

## 🧩 Component Architecture

### Creating Components (Just Like React!)

Components are functions that return virtual DOM nodes - **exactly like React functional components**:

```javascript
// This is almost identical to React!
function Greeting(props) {
    return h('div', {},
        h('h1', {}, `Hello, ${props.name}!`),
        h('p', {}, 'Welcome to Dot.js')
    );
}

function App() {
    return h('div', {},
        Greeting({ name: 'World' }) // Pass props as object
    );
}
```

**React comparison:**
```javascript
// React (with JSX):
function Greeting({ name }) {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Welcome to React</p>
        </div>
    );
}

// Dot.js (with h()):
function Greeting(props) {
    return h('div', {},
        h('h1', {}, `Hello, ${props.name}!`),
        h('p', {}, 'Welcome to Dot.js')
    );
}
```

### Component Composition

Components can be composed together:

```javascript
function Header() {
    return h('header', {}, h('h1', {}, 'My App'));
}

function Content() {
    return h('main', {}, h('p', {}, 'Main content'));
}

function Footer() {
    return h('footer', {}, h('p', {}, 'Footer'));
}

function App() {
    return h('div', {},
        Header(),
        Content(),
        Footer()
    );
}
```

## 🎨 Event Handling

### Event Listeners (Same as React!)

Use camelCase event names with `on` prefix - **exactly like React**:

```javascript
function Button() {
    return h('button', {
        onClick: () => alert('Clicked!'),
        onMouseEnter: () => console.log('Mouse entered'),
        onKeyDown: (e) => console.log('Key pressed:', e.key)
    }, 'Click me');
}
```

**This is identical to React:**
```javascript
// React JSX:
<button 
    onClick={() => alert('Clicked!')}
    onMouseEnter={() => console.log('Mouse entered')}
    onKeyDown={(e) => console.log('Key pressed:', e.key)}
>
    Click me
</button>

// Dot.js h():
h('button', {
    onClick: () => alert('Clicked!'),
    onMouseEnter: () => console.log('Mouse entered'),
    onKeyDown: (e) => console.log('Key pressed:', e.key)
}, 'Click me')
```

### Event Handling with State (Like React!)

```javascript
function ToggleButton() {
    const [isVisible, setIsVisible] = useState(true);
    
    return h('div', {},
        h('button', { 
            onClick: () => setIsVisible(!isVisible()) // Remember to call isVisible()
        }, 'Toggle'),
        isVisible() && h('p', {}, 'This content is visible') // Conditional rendering
    );
}
```

**React comparison:**
```javascript
// React:
function ToggleButton() {
    const [isVisible, setIsVisible] = useState(true);
    
    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle
            </button>
            {isVisible && <p>This content is visible</p>}
        </div>
    );
}

// Dot.js: Almost identical, just call isVisible() instead of using isVisible directly
```

## 🔄 Reactive Rendering (Just Like React!)

Dot.js automatically re-renders components when state changes - **exactly like React**:

```javascript
function ReactiveApp() {
    const [name, setName] = useState('World');
    const [count, setCount] = useState(0);
    
    return h('div', {},
        h('h1', {}, `Hello, ${name()}!`),
        h('p', {}, `Count: ${count()}`),
        h('input', {
            value: name(),
            onInput: (e) => setName(e.target.value) // Controlled input
        }),
        h('button', { 
            onClick: () => setCount(count() + 1) 
        }, 'Increment')
    );
}
```

**In React, this would be:**
```javascript
function ReactiveApp() {
    const [name, setName] = useState('World');
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Count: {count}</p>
            <input 
                value={name}
                onInput={(e) => setName(e.target.value)}
            />
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

## 🛣️ Advanced Routing

### Simple Routing Example

```javascript
// Define your page components
function HomePage() {
    return h('div', {},
        h('h1', {}, 'Welcome to the Home Page!'),
        h('p', {}, 'This is the main page of our app.')
    );
}

function AboutPage() {
    return h('div', {},
        h('h1', {}, 'About Us'),
        h('p', {}, 'Learn more about our company.')
    );
}

// Navigation component
function Navigation() {
    return h('nav', { style: { marginBottom: '20px' } },
        h('button', { 
            onClick: () => navigate('/'),
            style: { marginRight: '10px' }
        }, 'Home'),
        h('button', { 
            onClick: () => navigate('/about')
        }, 'About')
    );
}

// Main app with routing
function App() {
    return h('div', {},
        Navigation(),
        Router() // This renders the current page
    );
}

// Set up routes
addRoute('/', HomePage);
addRoute('/about', AboutPage);

// Mount the app
mount(App, document.getElementById('app'));
```

**This is like React Router, but built-in!**

### Form Handling Example (Like React!)

```javascript
function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { 
            name: name(), 
            email: email(), 
            message: message() 
        });
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
    };
    
    return h('form', { onSubmit: handleSubmit },
        h('h2', {}, 'Contact Form'),
        h('div', {},
            h('input', {
                type: 'text',
                placeholder: 'Your Name',
                value: name(),
                onInput: (e) => setName(e.target.value)
            })
        ),
        h('div', {},
            h('input', {
                type: 'email',
                placeholder: 'Your Email',
                value: email(),
                onInput: (e) => setEmail(e.target.value)
            })
        ),
        h('div', {},
            h('textarea', {
                placeholder: 'Your Message',
                value: message(),
                onInput: (e) => setMessage(e.target.value)
            })
        ),
        h('button', { type: 'submit' }, 'Send Message')
    );
}
```

**React equivalent:**
```javascript
function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { name, email, message });
        setName('');
        setEmail('');
        setMessage('');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Contact Form</h2>
            <div>
                <input 
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input 
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <textarea 
                    placeholder="Your Message"
                    value={message}
                    onInput={(e) => setMessage(e.target.value)}
                />
            </div>
            <button type="submit">Send Message</button>
        </form>
    );
}
```

## 🎯 Best Practices (Similar to React!)

### 1. Component Organization

- Keep components small and focused *(same as React)*
- Use descriptive names for components *(same as React)*
- Separate concerns (UI, logic, state) *(same as React)*

```javascript
// Good: Small, focused components (just like React!)
function UserCard({ user }) {
    return h('div', { className: 'user-card' },
        h('h3', {}, user.name),
        h('p', {}, user.email)
    );
}

function UserList({ users }) {
    return h('div', { className: 'user-list' },
        users.map(user => UserCard({ user })) // Pass props as object
    );
}
```

**React equivalent:**
```javascript
function UserCard({ user }) {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>
    );
}

function UserList({ users }) {
    return (
        <div className="user-list">
            {users.map(user => <UserCard user={user} />)}
        </div>
    );
}
```

### 2. State Management (Same Rules as React!)

- Keep state as local as possible *(same as React)*
- Use descriptive state names *(same as React)*
- Avoid deeply nested state *(same as React)*

```javascript
// Good: Local state (same as React)
function Counter() {
    const [count, setCount] = useState(0);
    
    return h('div', {},
        h('p', {}, `Count: ${count()}`), // Remember: count() not count
        h('button', { 
            onClick: () => setCount(count() + 1) 
        }, 'Increment')
    );
}

// Avoid: Global state for everything (same as React)
const [globalCount, setGlobalCount] = useState(0); // Don't do this
```

### 3. Event Handling

- Use descriptive event handler names
- Keep event handlers simple
- Extract complex logic into separate functions

```javascript
// Good: Simple, focused event handlers
function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission
}

function Form() {
    return h('form', { onSubmit: handleSubmit },
        h('input', { type: 'text' }),
        h('button', { type: 'submit' }, 'Submit')
    );
}
```

### 4. Performance (Same as React!)

- Avoid creating functions inside render *(same as React)*
- Use conditional rendering for dynamic content *(same as React)*
- Keep virtual DOM trees shallow when possible *(same as React)*

```javascript
// Good: Conditional rendering (same as React)
function ConditionalContent({ isVisible }) {
    return h('div', {},
        isVisible && h('p', {}, 'This content is visible')
    );
}

// Better: Define functions outside render (same as React)
function GoodExample() {
    const handleClick = () => console.log('clicked');
    
    return h('button', { 
        onClick: handleClick // Reuse the same function
    }, 'Click me');
}

// Avoid: Creating functions in render (same problem as React)
function BadExample() {
    return h('button', { 
        onClick: () => console.log('clicked') // New function every render
    }, 'Click me');
}
```

## 🚀 Examples

### Todo App (Compare with React!)

```javascript
function TodoApp() {
    // State management - just like React hooks!
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    
    // Helper functions - same as you'd write in React
    function addTodo() {
        if (newTodo().trim()) {
            setTodos([...todos(), { 
                id: Date.now(), 
                text: newTodo(), 
                completed: false 
            }]);
            setNewTodo('');
        }
    }
    
    function toggleTodo(id) {
        setTodos(todos().map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }
    
    // Render function - think of this as your JSX
    return h('div', {},
        h('h1', {}, 'Todo App'),
        h('div', {},
            h('input', {
                value: newTodo(),
                onInput: (e) => setNewTodo(e.target.value),
                onKeyPress: (e) => e.key === 'Enter' && addTodo(),
                placeholder: 'Add a new todo...'
            }),
            h('button', { onClick: addTodo }, 'Add Todo')
        ),
        h('ul', {},
            todos().map(todo => 
                h('li', {
                    style: { 
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        cursor: 'pointer'
                    },
                    onClick: () => toggleTodo(todo.id)
                }, todo.text)
            )
        )
    );
}
```

**In React, this would be:**
```javascript
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    
    function addTodo() {
        if (newTodo.trim()) { // Direct access, no ()
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    }
    
    function toggleTodo(id) {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }
    
    return (
        <div>
            <h1>Todo App</h1>
            <div>
                <input 
                    value={newTodo}
                    onInput={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Add a new todo..."
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map(todo => 
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => toggleTodo(todo.id)}
                    >
                        {todo.text}
                    </li>
                )}
            </ul>
        </div>
    );
}
```

### Simple Counter App (Great for Beginners!)

```javascript
function Counter() {
    // State - just like React!
    const [count, setCount] = useState(0);
    
    // Event handlers - same as React
    const increment = () => setCount(count() + 1);
    const decrement = () => setCount(count() - 1);
    const reset = () => setCount(0);
    
    return h('div', { style: { textAlign: 'center', padding: '20px' } },
        h('h1', {}, 'Counter App'),
        h('p', { style: { fontSize: '24px' } }, `Count: ${count()}`),
        h('div', {},
            h('button', { onClick: decrement }, '-'),
            h('button', { onClick: reset, style: { margin: '0 10px' } }, 'Reset'),
            h('button', { onClick: increment }, '+')
        )
    );
}

// Mount the app
mount(Counter, document.getElementById('app'));
```

**React equivalent:**
```javascript
function Counter() {
    const [count, setCount] = useState(0);
    
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);
    
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Counter App</h1>
            <p style={{ fontSize: '24px' }}>Count: {count}</p>
            <div>
                <button onClick={decrement}>-</button>
                <button onClick={reset} style={{ margin: '0 10px' }}>Reset</button>
                <button onClick={increment}>+</button>
            </div>
        </div>
    );
}

// ReactDOM.render(<Counter />, document.getElementById('app'));
```

## 🔧 Troubleshooting

### Common Issues

**1. CORS Errors**
```
Access to script at 'file://...' from origin 'null' has been blocked by CORS policy
```
**Solution:** Use a local development server instead of opening the file directly.

**2. Module Not Found**
```
Failed to load module script: Expected a JavaScript module script
```
**Solution:** Make sure you're using `type="module"` in your script tag.

**3. Import Errors**
```
Cannot resolve module './core.js'
```
**Solution:** Check the file path is correct relative to your HTML file.

**4. State Updates Not Working**
```
Component not re-rendering after state change
```
**Solution:** Make sure you're calling the state getter as a function: `count()` not `count`.

**5. Props Not Working**
```
Component props are undefined
```
**Solution:** Pass props as an object: `MyComponent({ name: 'John' })` not `MyComponent(name)`.

## 🚀 Next Steps

Now that you understand Dot.js, here are some things you can try:

1. **Build a simple app** - Start with a counter or todo list
2. **Add routing** - Create a multi-page app with navigation
3. **Experiment with components** - Break your app into smaller pieces
4. **Compare with React** - Notice the similarities and differences
5. **Read the source code** - It's only ~150 lines in `core.js`!

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Improve documentation
- Add examples

## 📄 License

MIT License - feel free to use this framework for learning and building your own projects!

---

**Built with ❤️ for learning frontend framework development**

*Perfect for React developers who want to understand how frameworks work under the hood!* 