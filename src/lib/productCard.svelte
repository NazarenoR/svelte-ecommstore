 <script lang="ts">
    import { get } from "svelte/store";
    import { cartItems, addToCart, removeFromCart } from "../cart";
    
    export let product : Product = {
        id: "",
        name: "",
        price: 0,
    };

    let cart = get(cartItems);
    
    let cartItemIndex = cart.findIndex((item) => { return item.id === product.id});
    let cartProduct = cart[cartItemIndex];
    cartItems.subscribe((newCartValue) => {
        cart = newCartValue;
        cartItemIndex = cart.findIndex((item) => { return item.id === product.id});
        cartProduct = cart[cartItemIndex];
    });

    //console.log(product);
 </script> 


<div class="card"> 
    <header class="card-header"><h2>{product.name}</h2></header>
    {#if cartProduct !== undefined}
        <div class="card-body px-4">
            Quantity: <strong>{cartProduct.quantity}</strong>
        </div>
    {/if}
    <div class="card-body px-4">
        Price: ${product.price}
    </div>    
    <footer class="card-footer">
        <button class="p-2  variant-glass-primary" on:click={() => addToCart(product.id)} >Add to Cart</button>
        <button class="p-2  variant-glass-error" on:click={() => removeFromCart(product.id)}>X Remove</button>
    </footer>
</div>