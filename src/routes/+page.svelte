<script lang=ts>
	import ProductCard from "$lib/productCard.svelte";
	import { get } from "svelte/store";
	import { cartItems } from '../cart';

	const products : Product[] = [
		{
			id: "price_1NyNVJDs1fvwFoNofj7lUtas",
			name: "E-Scooter",
			price: 150,
		},
		{
			id: "price_1NyNVZDs1fvwFoNoIjF7WKlV",
			name: "Bike",
			price: 50,
		},
		{
			id: "price_1NyNVmDs1fvwFoNoa2lyGbq1",
			name: "Hoverboard",
			price: 100,
		}
	]

	async function checkout() {
		await fetch("api/stripeCheckout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{ items: get(cartItems)}
				)
		}).then((data) => {
			return data.json();
		}) .then((data) => {
			data.url
			window.location.replace(data.url);
		})
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		
		<div class="col-span-3">
			<h1>SvelteKit 1.0 Store</h1>
		</div>
		{#each products as product}
			<ProductCard product={product}/>
		{/each}
		<div class="col-span-3">	
			<button class="btn variant-filled-primary" on:click={() => checkout()}>Checkout with Stripe API</button>
		</div>
	</div>
</div>
