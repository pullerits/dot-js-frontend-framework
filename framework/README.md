# Dot.js - A Minimal Frontend Framework

Dot.js is a lightweight, modern frontend framework built from scratch. It provides a simple yet powerful way to create reactive user interfaces with JavaScript, featuring virtual DOM, state management, and routing capabilities.

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
            const [count, setCount] = useState(0);
            return h('div', {},
                h('h1', {}, 'Hello Dot.js!'),
                h('p', {}, `Count: ${count()}`),
                h('button', { onClick: () => setCount(count() + 1) }, 'Increment')
            );
        }

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

## 🏗️ Architecture Overview

### Core Architecture

**Virtual DOM Structure:**
```javascript
{
    type: 'div',           // HTML tag or component
    props: { class: 'container' },  // Attributes and event handlers
    children: [...]        // Child nodes
}
```

**Rendering Pipeline:**
1. Component Function → Returns virtual DOM tree
2. Virtual DOM → Lightweight representation of UI
3. DOM Update → Full re-render approach (simple but effective)

**State Management:**
```javascript
// State lifecycle
useState(initialValue) → [getter, setter]
setter(newValue) → trigger rerender() → call component function → update DOM
```

## 📚 API Reference

### Core Functions

#### `h(type, props, ...children)`
Creates virtual DOM nodes (similar to React's createElement).

**Parameters:**
- `type` (string) - HTML tag name or component
- `props` (object) - Element attributes and event handlers
- `...children` - Child elements or text nodes

**Example:**
```javascript
const element = h('div', { class: 'container' },
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
Creates reactive state that triggers re-renders when updated. Just like React.

**Parameters:**
- `initialValue` - Initial state value

**Returns:**
- `[getValue, setValue]` - Array containing getter and setter functions

**Example:**
```javascript
const [count, setCount] = useState(0);

// Get current value
console.log(count()); // 0

// Update value (triggers re-render)
setCount(5);
```

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

### Creating Components

Components are functions that return virtual DOM nodes:

```javascript
function Greeting(props) {
    return h('div', {},
        h('h1', {}, `Hello, ${props.name}!`),
        h('p', {}, 'Welcome to Dot.js')
    );
}

function App() {
    return h('div', {},
        Greeting({ name: 'World' })
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

### Event Listeners

Use camelCase event names with `on` prefix:

```javascript
function Button() {
    return h('button', {
        onClick: () => alert('Clicked!'),
        onMouseEnter: () => console.log('Mouse entered'),
        onKeyDown: (e) => console.log('Key pressed:', e.key)
    }, 'Click me');
}
```

### Event Handling with State

```javascript
const [isVisible, setIsVisible] = useState(true);

function ToggleButton() {
    return h('div', {},
        h('button', { 
            onClick: () => setIsVisible(!isVisible()) 
        }, 'Toggle'),
        isVisible() && h('p', {}, 'This content is visible')
    );
}
```

## 🔄 Reactive Rendering

Dot.js automatically re-renders components when state changes:

```javascript
const [name, setName] = useState('World');
const [count, setCount] = useState(0);

function ReactiveApp() {
    return h('div', {},
        h('h1', {}, `Hello, ${name()}!`),
        h('p', {}, `Count: ${count()}`),
        h('input', {
            value: name(),
            onInput: (e) => setName(e.target.value)
        }),
        h('button', { onClick: () => setCount(count() + 1) }, 'Increment')
    );
}
```

## 🛣️ Advanced Routing

### Route Parameters

```javascript
function UserPage() {
    const userId = getCurrentRoute().split('/')[2]; // /user/123 -> 123
    return h('div', {},
        h('h1', {}, `User ${userId}`)
    );
}

addRoute('/user/:id', UserPage);
```

### Nested Routes

```javascript
function Dashboard() {
    return h('div', {},
        h('h1', {}, 'Dashboard'),
        h('nav', {},
            h('button', { onClick: () => navigate('/dashboard/profile') }, 'Profile'),
            h('button', { onClick: () => navigate('/dashboard/settings') }, 'Settings')
        ),
        Router() // Render nested routes
    );
}

addRoute('/dashboard', Dashboard);
addRoute('/dashboard/profile', ProfilePage);
addRoute('/dashboard/settings', SettingsPage);
```

## 🎯 Best Practices

### 1. Component Organization

- Keep components small and focused
- Use descriptive names for components
- Separate concerns (UI, logic, state)

```javascript
// Good: Small, focused components
function UserCard({ user }) {
    return h('div', { class: 'user-card' },
        h('h3', {}, user.name),
        h('p', {}, user.email)
    );
}

function UserList({ users }) {
    return h('div', { class: 'user-list' },
        users.map(user => UserCard({ user }))
    );
}
```

### 2. State Management

- Keep state as local as possible
- Use descriptive state names
- Avoid deeply nested state

```javascript
// Good: Local state
function Counter() {
    const [count, setCount] = useState(0);
    return h('div', {},
        h('p', {}, `Count: ${count()}`),
        h('button', { onClick: () => setCount(count() + 1) }, 'Increment')
    );
}

// Avoid: Global state for everything
const [globalCount, setGlobalCount] = useState(0);
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

### 4. Performance

- Avoid creating functions inside render
- Use conditional rendering for dynamic content
- Keep virtual DOM trees shallow when possible

```javascript
// Good: Conditional rendering
function ConditionalContent({ isVisible }) {
    return h('div', {},
        isVisible && h('p', {}, 'This content is visible')
    );
}

// Avoid: Creating functions in render
function BadExample() {
    return h('button', { 
        onClick: () => console.log('clicked') // Function created on every render
    }, 'Click me');
}
```

## 🚀 Examples

### Todo App

```javascript
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState('');

function addTodo() {
    if (newTodo().trim()) {
        setTodos([...todos(), { id: Date.now(), text: newTodo(), completed: false }]);
        setNewTodo('');
    }
}

function toggleTodo(id) {
    setTodos(todos().map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
}

function TodoApp() {
    return h('div', {},
        h('h1', {}, 'Todo App'),
        h('div', {},
            h('input', {
                value: newTodo(),
                onInput: (e) => setNewTodo(e.target.value),
                onKeyPress: (e) => e.key === 'Enter' && addTodo()
            }),
            h('button', { onClick: addTodo }, 'Add Todo')
        ),
        h('ul', {},
            todos().map(todo => 
                h('li', {
                    key: todo.id,
                    style: { textDecoration: todo.completed ? 'line-through' : 'none' },
                    onClick: () => toggleTodo(todo.id)
                }, todo.text)
            )
        )
    );
}
```

### Blog with Routing

```javascript
const posts = [
    { id: 1, title: 'Getting Started', content: 'Welcome to Dot.js...' },
    { id: 2, title: 'Components', content: 'Learn about components...' }
];

function BlogList() {
    return h('div', {},
        h('h1', {}, 'Blog Posts'),
        h('ul', {},
            posts.map(post => 
                h('li', {},
                    h('a', { 
                        href: '#',
                        onClick: (e) => {
                            e.preventDefault();
                            navigate(`/post/${post.id}`);
                        }
                    }, post.title)
                )
            )
        )
    );
}

function BlogPost() {
    const postId = parseInt(getCurrentRoute().split('/')[2]);
    const post = posts.find(p => p.id === postId);
    
    if (!post) return h('div', {}, h('h1', {}, 'Post not found'));
    
    return h('div', {},
        h('h1', {}, post.title),
        h('p', {}, post.content),
        h('button', { onClick: () => navigate('/') }, 'Back to Posts')
    );
}

addRoute('/', BlogList);
addRoute('/post/:id', BlogPost);
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