# Vuex

In order to keep a standard implementation of Vuex across our applications, we should follow these recommendations:

## Modules

We should avoid declaring variables in the root state of our Vuex store. Instead, we should organize our data in modules.

* Inside the **store/modules** folder, every module should have its own folder

* Inside the **store/modules/module-name** folder the *actions*, *getters*, and *mutations* should be saved in separate files and exported from an **index.js** file

* The modules should then be imported in the **store/index.js** file and included in the **createStore** function

```js
import Vuex from 'vuex';
import hydrate from './hydrate';
import featureFlags from './modules/feature-flags';
import productSearch from './modules/product-search';
import shippingOptions from './modules/shipping-options';
export default function createStore(Vue, options = {}) {
 const initialState = options.initialState || {};

 Vue.use(Vuex);
 return new Vuex.Store({
   modules: hydrate(initialState, {
     featureFlags,
     productSearch,
     shippingOptions,
   }),
 });
}
```

## Initial data

⚠ We should avoid saving data in the global scope, such as **window.App.payload**

You'll notice that the **createStore** function mentioned before uses a **hydrate** function when declaring the modules. This function is used to combine two possible sources of initial data for the state (blade and js files) into a single state object for each module.

If you want to pass initial data to your module from the blade files, you should pass a config object with the **correct name for each module to the AppName.start function,** as follows:

```html
  @section('scripts-app')
   <script src="{{ elixir_cdn('main.js') }}"></script>
   <script type="text/javascript">
     OberloMerchant.start({
       shippingOptions: {
         country: {!! json_encode($shippingCountry) !!},
       },
       productSearch: {
         featuredCategories: {!! json_encode($featuredCategories) !!},
         filters: {!! json_encode($searchFilters) !!},
       },
     });
   </script>
@stop
```

## Testing

The **createStore** function can also be used in tests, to pass the data the component needs isolatedly:

```js
mount(SomeComponent, {
 store: createStore(localVue, {
   someModule: {...}
 }),
 localVue,
});
```