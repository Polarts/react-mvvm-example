# The Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the typescript template. It uses `mobx` and `mobx-react` in order to implement the MVVM design pattern.

## Key Concepts

1. OOP: This app demonstrates Object-Oriented capabilities using the `class` syntax, as well as inheritence from base classes and usage of inherited properties. i.e. the inheritance from PromiseAwareViewModelBase, where all of its properties and functions are passed down and used in inheritors.

2. MVVM: This app implements the Model-View-ViewModel design pattern, where each reactive component (a mobx `observer`) has its own ViewModel responsible for exposing `observable` properties and wrapping server functionality. i.e: TodoItemViewModel, TodoListViewModel

3. Singleton: This app implements the Singleton pattern to create a single instance of an object that shouldn't be created more than once to save on resources. i.e: TodoService

4. Dependency Injection (DI): In this app, each ViewModel (except for the base one) implements dependency injection by taking an instance of TodoService as a mandatory argument in its constructor. This is done in order to allow the testability of the ViewModel layer by implementing a mock-TodoService when needed.
