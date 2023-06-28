```js
 import {Css} from '@sib61/react-classnames'
 import styles from './index.module.css'

 export function MyComponent(){
   return <Css module={styles}>
     {
      //your jsx goes here
      //write your module css classnames as normal string like global css classnames 
     }
  </Css>
 }
```


```js
 import {Css} from '@sib61/react-classnames'
 import styles from './index.module.css'

 export function MyComponent({children}){
   return <Css module={styles} ignore={[children]}>
     {
      //your jsx goes here
      //write your module css classnames as normal string like global css classnames 
     }
   </Css>
 }
```
