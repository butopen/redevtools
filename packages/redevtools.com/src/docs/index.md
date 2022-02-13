---
title: Getting Started in 5s - How to use ReDevTools from the console
description: use ReDevTools from the devtools console without installing anything  
permalink: /docs/
layout: layouts/doc
---

# Getting started
    
ReDevTools is a simple script maintained by the open source ButOpen community.

It is built from `index.ts` at [https://github.com/redevtools/redevtools](https://github.com/redevtools/redevtools) 
Feel free to inspect it at [r8s](https://r8s) and the source 
is available at [https://github.com/butopen/redevtools](https://github.com/butopen/redevtools) 

## Use it from the console

Open the devtool and type the following code into the console: 

```javascript
import("//r8s.io")
```

and you're done.


## Available plugins
Extends the browser devtools with custom plugins directly from your localhost.

#### json2ts - Transform an object to a TypeScript interface

```javascript
re.json2ts(temp1)
```


#### jwtDecode - decoding a JWT token

```javascript
re.jwtDecode(localStorage.TOKEN)
```




## (Optional) Add it to your project

You can add it to your project (for example only when you're on localhost).

Add it to your main file:

```javascript
import("//r8s.io")
```

And if you use typescript:

```typescript
import("//r8s.io")
```
