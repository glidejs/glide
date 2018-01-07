Comes with a rich collection of events that you can listen in order to run a custom logic at specific moments of action. Use `.on(event, handler)` method to assign your custom listeners.

```js
let glide = new Glide('.glide')

glide.on('mount.before', () => {
  console.log('Fires before Glide is mounted')
})

glide.mount()
```

## Reference

#### `mount.before`



---

#### `mount.after`



---