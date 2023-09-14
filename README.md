
## Simple toolkit to boost your Bun Server development.

![osprey-logo](https://user-images.githubusercontent.com/40692433/225003754-c7f980ab-6e5f-489d-986f-476fd3225a68.png)

## So simple So familiar!

 - [x] Clean architecture. This package does not add something new to Bun, it just adds syntax sugar;
 - [x] Number of Decorators to create Controllers, Endpoints and Action Filters (like Nest.JS);
 - [x] Blazing fast router is faster than any you can find;
 - [ ] Work with WebSockets as with API (in progress);
 - [ ] Supports Swagger (in progress);
 - [x] Built-in logger;

Try it right now `bun i osprey-js`, `pnpm i osprey-js`.

---

**Let's check it out!**

**Dependencies.** Bun has a lot of built-in functions and this allows to exclude all dependencies from the package. It protects your projects from slow development of packages that you can't change. Each line of code is implemented just with Bun and TypeScript. The only dependency is router. Let's read about it next.

**Router.** For now npm has 3 fast routers: [httprouter](https://github.com/julienschmidt/httprouter), [koa-tree-router](https://github.com/steambap/koa-tree-router) and [road-runner](https://github.com/parisholley/road-runner). They all pretty fast, but **koa-tree-router** works only with koa and **httprouter** is implemented for Go. That's why I chose the **road-runner**. It has simplicity of **koa-tree-router** and speed of **httprouter**.

Here are the benchmark results:
![benchmark results](https://raw.githubusercontent.com/parisholley/router-benchmark/master/results.png)

For the insane speed of the bun, we need an insane fast router, right?

**Supported Path Syntax:**
-   /foo
-   /:foo
-   /*
-   /foo/:bar
-   /foo/*
-   /foo/:bar/baz
-   /foo/*/baz
-   /foo/:bar/baz/:bum
-   /foo/*/baz/*
-   /foo/:bar/baz/*
-   /foo/*/baz/:bum

**Syntax sugar.** 
To get started, you need to know how it works. Decorators have a lot of power in terms of route handling and parameters processing. But one huge disadvantage is their behaviour. Decorators runs once and developer need to figure out how to store some date to use it in root method. For this purpose a lot of packages use [reflect-metadata](https://github.com/rbuckton/reflect-metadata) package. That's ok for data storage but this solution has drawback: **reflect** is used in runtime and your code spends unnecessary memory and amount of time just to obtain some data from **reflect**. **Osprey** solves this problem. It updates decorated methods and even can edit it a bit. As a result, in runtime **Osprey** only calls methods that you wrote yourself!

## Methods description and Examples

Decorators are divided into several groups.

 -  `@Controller`
 -  Methods: `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`, 
 - Action Filters: `CreateAuthorisationFilter`, `CreateResourceFilter`, `CreateBeforeFilter`, `CreateAfterFilter`, `CreateExceptionFilter`
 - Request parameters: `@Body`, `@Param`, `@Params`, `@Query`, `@FormData`, `@Request`
