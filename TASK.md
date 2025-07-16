dot-js frontend-framework
Create your very own front-end framework, which allows you to describe user interfaces with JavaScript.

The situation
It seems that there is a brand new JavaScript framework every week. Keeping up with these is known as JavaScript fatigue.

You grow tired of reading documentation to discover if some new major version will break your product, and decide to make your own, so that you know precisely how it works.

You don't need to recreate React, Angular or Vue. It doesn't need to have all the bells and whistles, it just needs to do the basics.

Functional requirements
It's a framework, not a library
What's the difference? Okay, you already know.

You'll need to implement it from scratch, without the use of any other frontend frameworks and libraries like React, Vue, Angular, Svelte etc.

You have the freedom to choose the backend language of your preference.

Documentation
You'll share your framework with others, and they'll need to be able to get their heads around how to implement their own projects with it.

They'll need comprehensive documentation to ensure that it is useable without requiring psychic powers.

The documentation will need clear explanations of each feature, with practical examples and guidelines. It should cover:

An overview of the framework's architecture and design principles.
Installation instructions.
A "Getting Started" guide.
A detailed explanation of each feature with code examples.
Best practices and guidelines for building applications with the framework.
Obviously, you'll write it in markdown.

State
Create mechanisms for managing the state of applications, ensuring consistency and responsiveness across different elements and pages. Your state management solution should support:

Storing and updating application state
Reacting to state changes and triggering UI updates
Sharing state between elements and pages and managing component dependencies
Routing
You'll need to provide a way to control the state of the application based on the URL, and provide a way to programmatically change the value of the URL based on user interactions or other events.

Event Handling
Implement a robust event handling mechanism to facilitate user interactions and enhance the flexibility of the framework. Your event handling solution should support:

Registering event listeners for various DOM events
Delegating event handling to parent elements
Preventing default browser behavior and bubbling
You can't just copy the exact functionality of addEventListener. You generally wouldn't see this in React, you'd normally provide a listener when the element is initially rendered. You'll need to do something similar.

DOM Manipulation
No need for getElementById here. Implement methods to abstract the manipulation of the Document Object Model (DOM), allowing developers to create and manage HTML elements dynamically. It must provide an easy way to:

Create elements
Nest elements
Add event listeners to DOM elements
Manipulate attributes and styles
Handle user input and form submissions
You'll need to implement a reusable component architecture. It must be possible for a developer to describe a component, and reuse it with little code.