# Trekkie implementation

We're currently moving towards using [Shopify's Trekkie](https://github.com/Shopify/trekkie) as our main tool for analytics. Trekkie is already implemented on Oberlo Merchant, and we intend to implement it on Oberlo Supply as well.  You can find Trekkie's documentation [here](https://trekkie-docs.shopifycloud.com/).

## Data-trekkie attributes

In order to allow PMs to use the [Clickstream Chrome extension](https://chrome.google.com/webstore/detail/trekkie-clickstream-query/dklbnkakpfajdoclepjbeoiebknikmca) we are using data-trekkie attributes on clickable elements:

## General recommendations:

* If the element has multiple states, use a custom data-trekkie attribute and bind the state to it. This is specially useful for checkboxes, expanding panels and toggles.
 **e.g.  ***:data-trekkie-is-expanded="isExpanded"*

## On Style Guide Components:

* Elements should have a  **trekkieId prop**, with a default value that can be overridden where the component is imported.

* Trekkie ids should be kebab-cased. If context is necessary on the ids, context level should be separated by colon.
```html
product-collection-carousel:arrow-right
```

## On  the Merchant or Supply apps:

* When overriding Trekkie ids, the same naming convention should be kept.
```html
fast-shipping:product-collection-carousel:arrow-right
```

* If the component is not from the Styleguide, you can use the attributes directly, without the use of props.

```html
<button data-trekkie-id="some-button"></button>
```

